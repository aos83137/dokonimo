import React , {Component,useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, ScrollView, Alert, Dimensions, ActivityIndicator,TouchableHighlight,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

let {width, height} = Dimensions.get('window')
const url='my-project-9710670624.df.r.appspot.com';
//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const Reservation = (props)=>{   
    const checkIn = props.route.params?.checkIn;
    const checkOut = props.route.params?.checkOut;
    const bagCnt = props.route.params?.bagCnt;
    const carrCnt = props.route.params?.carrCnt;
    const whereScreen = props.route.params?.whereScreen ? props.route.params?.whereScreen : true;
    const keeper_id = props.route.params?.keeper_id
    const data = props.route.params?.data ? props.route.params?.data : '없디'; // 가게정보 받음
    const state = props.route.params?.state;
    const [isLoading, setIsLoading] = useState(true);
    const [reservation, setReservation] = useState(props.route.params?.reservation); //예약정보 받음
    const [value, onChangeText] = useState('xxxx-xxxx-xxxx-xxxx');
    const [delivery, setDelivery]=useState();
    let ddd;
    const coord = props.route.params?.coord;
    console.log('여기는 reservation');
    // console.log('data',data);
    // console.log('reservation',reservation.reservation_id);

    useEffect(()=>{
        fetch('http://'+url+'/deliverys',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        }).then((res)=>res.json())
        .then((resJson)=>{
            console.log('delilvery info :',resJson[0]);
            
            setDelivery(resJson[0]);
            setIsLoading(false);
        }).catch((error)=>{
            console.error(error);
        });
    },[props]);

    if(isLoading){
        return(
            <View>
                <ActivityIndicator/>
            </View>
        )
    }

    let r_id;
    const getFormatDate = date=>{
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let hour = date.getHours();                 //h
        let ampm = '오전';
        if(hour>=12){
            hour= hour -12;
            ampm = '오후';
        }
        let min = date.getMinutes();                //m
        if(min<10) min = '0' + min;
        return  '' + month + '.' + day + '. ' + ampm + ' ' + hour+':'+min;
    }
    const getFormatDate2 = (date)=>{
        const ymd = date.split(' ')[0];
        const time =date.split(' ')[1];        

        const md = ymd.split('-')[1]+'.'+ymd.split('-')[2]+'. ';
        let appm;
        if(Number(time.split(':')[0]>12)){
            appm = Number(time.split(':')[0])-12;
            if(appm<10){
                appm = '0'+appm;
            }
            appm = '오후 '+appm;
        }else{
            appm = '오전 '+ Number(time.split(':')[0]);
        }
        
        const apmtime = appm+':'+time.split(':')[1];
        return md+apmtime;
    }
    const getFromatDateTime = date=>{
        let year = date.getFullYear()
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let hour = date.getHours();                 //h
        hour = hour >= 10? hour: '0' + hour;
        let min = date.getMinutes();                //m
        if(min<10) min = '0' + min;
        return  ''+year +'-'+ month + '-' + day + ' ' + hour+':'+min+':'+'00';
    }
    const getDays2 = (d1, d2)=>{
        ddd = d2.getDate()-d1.getDate()+1;
        return ddd; 
    }
    const getDays = (d1,d2)=>{
        let checkIn = (''+d1).split(' ')[0].split('-');
        let checkOut = (''+d2).split(' ')[0].split('-');

        let month = checkOut[1]-checkIn[1];
        let day = checkOut[2] -checkIn[2];
        
        if (month<1){
            ddd = day+1;
            return ddd;
        }else{
            ddd=month*30 + day
            return ddd;
        }
    }

    const payEnd= async()=>{
        const userId = await AsyncStorage.getItem('userToken');

        fetch('http://'+url+'/reservations',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                keeper_store_id:keeper_id,
                tourist_id:1,
                check_in:getFromatDateTime(checkIn),
                check_out:getFromatDateTime(checkOut),
                bag_cnt:bagCnt,
                car_cnt:carrCnt,
                reservation_status:'keeper_reservation',
            })
        }).then((response)=>{
            return response.json()
        }).then((responseJson)=>{
            console.log(responseJson);
            fetch('http://'+url+'/reservations',{
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            }).then((response)=>{
                return response.json()
            }).then((responseJson)=>{
                console.log('reservation',responseJson.reverse()[0]);
                
                Alert.alert(
                    //Header
                    '결제 감사합니다.',
                    //title
                    '예약이 완료 되었습니다.\n딜리버리 서비스를 사용 하시겠습니까?',
                    //footer button
                    [
                        {
                            text:'당일에 사용할께요.',
                            style: 'cancel',
                            onPress:()=>{
                                //딜리버리 스테이트를 바꿔야함
                                props.navigation.navigate('Info',{
                                    stateTest:'change',
                                });
                            }
                        },
                        {
                            text:'네. 사용할래요.',
                            onPress: ()=>{
                                props.navigation.navigate('DeliveryInfo',{
                                    reservation:responseJson[0],
                                    data,
                                    userId,
                                });
                            }
                        }
                    ]
                );
            })
            .catch((e)=>{
                console.error(e);
            })
        }).catch((error)=>{
            console.error(error);
        })

        try{
            await AsyncStorage.setItem('status','endKeeper')
            console.log('스테이터스 저장 완료');
        }catch(e){
            console.error(e);
        }

    }
    // const deliveryEx=()=>{
    //     Alert.alert("키퍼 예약을 끝내신 후 배달을 원하시는 고객님께서는 '예약하기'를 눌러 완료하신 뒤 예약페이지에서 딜리버리를 예약할 수 있습니다!");
    // }
    const goDelivery = async()=>{
        fetch('http://'+url+'/reservations',{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            return response.json()
        }).then((responseJson)=>{
            r_id = responseJson.reverse()[0].reservation_id;
            AsyncStorage.setItem('reservation_id', ''+r_id )
        })
        .catch((e)=>{
            console.error(e);
        })


        try{
            await AsyncStorage.setItem('status','endKeeper')
            console.log('스테이터스 저장 완료');
        }catch(e){
            console.error(e);
        }
        props.navigation.navigate('DeliveryInfo',{
            reservation,
            data
        }
        );
    }
    const goDeliveryFindScreen = async()=>{
        const userId = await AsyncStorage.getItem('userToken');
        // await console.log('userId',userId);
        
        props.navigation.navigate('DeliveryRealtime',{
            userId,
            reservation,
            data,
        });
    }
    let imageCard;
    let headerText;
    let checkInOut;
    let total;
    let footer;
    //예약하기로 넘어 왔을 경우    
    if(whereScreen === 'reservation'){
        imageCard=
        <View style={styles.ImageWrap}>
            <Image style={styles.keeperImg} source={{ uri:data.keeper_store_imgurl }}></Image>
            <Text style={styles.keeperText}>{data.keeper_store_name}</Text>
        </View>
        headerText = <Text style={styles.headerText}>예약하기</Text>
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>비용</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>가방</Text>
                    <Text>캐리어</Text>
                    <Text>합계</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>개수</Text>
                    <Text>{bagCnt}</Text>    
                    <Text>{carrCnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>기간</Text>
                    <Text>{getDays2(checkIn,checkOut)}</Text>
                    <Text>{getDays2(checkIn,checkOut)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>비용</Text>
                    <Text>¥{bagCnt*400*ddd}</Text>
                    <Text>¥{carrCnt*700*ddd}</Text>
                    <Text>¥{bagCnt*400*ddd+carrCnt*700*ddd}</Text>
                </View>
            </View>
        </View>;
        checkInOut=
            <View>
                <View style={styles.inWrapView}>
                    <View>
                        <Text style={styles.subFont}>체크인</Text>
                    </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(checkIn)}</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크아웃</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(checkOut)}</Text>
                </View>
            </View>
        </View>;
        footer=
        <View>
            <View style={styles.paysCard}>
                <View>
                    <Button
                        buttonStyle={{backgroundColor:colors.green01}} title="예약하기" 
                        onPress={payEnd}
                    />
                </View>
            </View>
        </View>;
    }else if(whereScreen === 'info'){
    //예약 확인에서 왔을 경우
        imageCard=
            <View style={styles.ImageWrap}>
                <Image style={styles.keeperImg} source={{ uri:data.keeper_store_imgurl }}></Image>
                <Text style={styles.keeperText}>{data.keeper_store_name }</Text>
            </View>
        headerText = <Text style={styles.headerText}>예약확인</Text>
        checkInOut=
        <View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크인</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate2(reservation.check_in)}</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크아웃</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate2(reservation.check_out)}</Text>
                </View>
            </View>
        </View>;
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>결제 된 비용</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>가방</Text>
                    <Text>캐리어</Text>
                    <Text>합계</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>개수</Text>
                    <Text>{reservation.bag_cnt}</Text>    
                    <Text>{reservation.car_cnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>기간</Text>
                    <Text>{getDays(reservation.check_in,reservation.check_out)}</Text>
                    <Text>{getDays(reservation.check_in,reservation.check_out)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>비용</Text>
                    <Text>¥{reservation.bag_cnt*400*ddd}</Text>
                    <Text>¥{reservation.car_cnt*700*ddd}</Text>
                    <Text>¥{reservation.bag_cnt*400*ddd+reservation.car_cnt*700*ddd}</Text>
                </View>
            </View>
        </View>;
        if(state==='keeper_reservation' || state==='keeper_keeping'){
            footer=
            <View>
                <TouchableOpacity >
                    <Text style={{ borderBottomColor:1 }}>
                        배달을 이용하고 싶은 분께서는....Click!
                    </Text>
                </TouchableOpacity>
                
                <View style={styles.paysCard}>
                    <Text>딜리버리 요청</Text>    
                    <View>
                        <Text>- 가게까지 짐을 배달해 주는 서비스입니다.</Text>    
                        <Text>- 반경 5KM 내의 딜리버리를 찾습니다.</Text>
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="예약하기" 
                            onPress={goDelivery}
                        />
                    </View>
                </View>
            </View>;
        }else if(state==='in_delivery'){
            footer=
            <View>                
                <View style={styles.paysCard}>
                        <Text>딜리버리의 위치를 실시간으로 확인 할 수 있습니다.</Text>    
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="딜리버리 확인" 
                            onPress={goDeliveryFindScreen}
                        />
                </View>
            </View>;
        }else{
            footer=
            <View>  
                <Text>딜리버리 이용 내역</Text>                  
                <View style={styles.paysCard}>
                    <View>
                        <Text>- 딜리버리 : {delivery.delivery_name}</Text> 
                        <Text>- 차종 : {delivery.delivery_car}</Text>   
                        <Text>- 이동 거리 : 6.23km</Text>
                    </View>
                </View>
                <View>
                    {/* <Button title='리뷰 추가' /> */}
                </View>
            </View>;
        }
    }    
    // console.log('1' +keeper_id);

        return(
            <View style={{ flex:1 }}> 
                <ScrollView stickyHeaderIndices={[0]}>
                    <View style ={styles.header}>
                        <TouchableHighlight onPress={()=>{props.navigation.goBack()}}>
                            <View style = {styles.elem}>
                                <Icon name='keyboard-arrow-left' size={24}/>
                                {headerText}
                            </View>

                        </TouchableHighlight>
                    </View>
                    <View style = {styles.container}> 
                            {imageCard}
                        <View style={styles.cardView}>
                            {checkInOut}
                        </View>
                        <View style={styles.cardView}>
                            {total}
                        </View >
                        <View style={styles.cardView}>
                            {footer}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.gray
    },
    ImageWrap:{
        width:'100%',
        backgroundColor:colors.white,
        alignItems:'center',
        paddingBottom:8
    },
    keeperImg:{
        width: '90%',
        height:200,
        borderRadius:8,
    },
    keeperText:{
        position:'absolute',
        bottom:8,
        color:colors.white,
        fontSize:20,
        backgroundColor:'rgba(0,0,0,0.6)',
        width:'90%',
        padding:5,
        padding:8,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
    header:{
        padding:'2%',      
    },
    title:{
        width:'100%',
        paddingTop:10,
        paddingLeft:18,
        paddingRight:18,
        backgroundColor:colors.white
    },
    rowDirection:{
        flexDirection:'row'
    },
    starEmel:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleFont:{
        fontSize:24,
        marginTop:15,
        marginBottom:15,

    },
    cardView:{
        backgroundColor:colors.white,
        width:'100%',
        marginTop:10,
        paddingTop:10,
        paddingLeft:18,
        paddingRight:18,
    },
    inWrapView:{
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        width:"100%",
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    floatView:{
        position:'absolute',
        width:'100%',
        bottom:15,
        alignItems:'center',
        justifyContent:'center',
    },
    elem:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        width:'100%',
        fontSize:18,
        fontWeight:"500",
    },
    subFont:{
        marginTop:'3%',
        marginBottom:'3%',
        fontSize:18,
    },
    tableView:{ 
        flex:1, 
        width:'100%', 
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'gray',
        paddingBottom:10,
        justifyContent:'space-between',
    },
    paysCard:{
        backgroundColor:colors.gray,
        borderRadius:10,
        marginTop:8,
        marginBottom:30,
        padding:8,
    },
    inputText:{
        backgroundColor:colors.white,
        borderRadius:10,
        height:35,
        color:colors.black,
        marginTop:10,
        marginBottom:10,
    }
});

export default Reservation;