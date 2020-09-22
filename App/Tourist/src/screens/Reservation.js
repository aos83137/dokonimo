import React , {Component,useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, ScrollView, Alert, Dimensions, ActivityIndicator,TouchableHighlight,TextInput} from 'react-native';
import { Button,Rating,AirbnbRating,Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ImagePicker from 'react-native-image-picker';
import { SafeAreaViewBase } from 'react-native';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

let {width, height} = Dimensions.get('window')
const url='sylvan-presence-280012.an.r.appspot.com';
//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const Reservation = (props)=>{   
    const checkIn = props.route.params?.checkIn;
    const checkOut = props.route.params?.checkOut;
    const bagCnt = props.route.params?.bagCnt;
    const carrCnt = props.route.params?.carrCnt;
    const [whereScreen,setWhereScreen] = useState(props.route.params?.whereScreen ? props.route.params?.whereScreen : true);
    const keeper_id = props.route.params?.keeper_id
    const data = props.route.params?.data ? props.route.params?.data : '없디'; // 가게정보 받음
    const [state,setState] = useState(props.route.params?.state);
    const [isLoading, setIsLoading] = useState(true);
    const [reservation, setReservation] = useState(props.route.params?.reservation); //예약정보 받음
    const [value, onChangeText] = useState('xxxx-xxxx-xxxx-xxxx');
    const [delivery, setDelivery]=useState();
    const [reviewContent, setReviewContent] = useState();
    const [rating, setRating] = useState();
    const [payLoading,setPayLoading] = useState();
    const [imageSource, setImageSource] = useState([]);

    const options = {
        title: 'Load Photo',
        customButtons: [
          { name: 'button_id_1', title: 'CustomButton 1' },
          { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    let ddd;
    const coord = props.route.params?.coord;
    // console.log('여기는 reservation');
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
        // console.log('reservation_status : ',reservation.reservation_status);
        if(reservation){
            fetch('http://'+url+'/rphotos/'+reservation.reservation_id,{
                method:"get",
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            }).then((res)=>{
                return res.json();
            }).
            then((resJson)=>{
                console.log('resJson',resJson);
                let uri = [];
                resJson.forEach(e => {
                    // console.log('e.rphoto_url',e.rphoto_url);
                    uri=uri.concat({'url':e.rphoto_url});
                });
                // console.log('uri',uri);
                setImageSource(uri);
            })
            
        }
            
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
        let ampm = '午前';
        if(hour>=12){
            hour= hour -12;
            ampm = '午後';
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
            appm = '午後 '+appm;
        }else{
            appm = '午前 '+ Number(time.split(':')[0]);
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

    const sendReviewData =()=>{
        console.log('data.keeper_id',data.keeper_id);
        console.log('rating',rating);
        console.log();
        console.log('content', reviewContent);
        
        
        fetch('http://'+url+'/evaluations',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "keeper_store_id":data.keeper_store_id,
                "tourist_id":1,
                "starpoint":rating,
                "content":reviewContent
             })
        }).then((response)=>{
            console.log('리뷰 데이터 저장 완료');
            Alert.alert(
                //Header
                'レビュー登録',
                //title
                'レビューが登録されました。\nありがとうございます。',
                //footer button
                [
                    {
                        text:'確認',
                        onPress: ()=>{
                                props.navigation.navigate('Home',{
                                    stateTest:'change',
                                });
    
                        }
                    }
                ]
            );
        }).catch((e)=>{
            console.log(e);
        })
    }
    const payEnd= async()=>{
        const userId = await AsyncStorage.getItem('userToken');
        setPayLoading(true);
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
                reservation_status:'keeper_listen',
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
                setPayLoading(false);

                Alert.alert(
                    //Header
                    '予約ありがとうございます',
                    //title
                    '保管する荷物の写真を登録してください。\nキーパーが確認後、受諾をします。',
                    //footer button
                    [
                        {
                            text:'後にします。',
                            style: 'cancel',
                            onPress:()=>{
                                //딜리버리 스테이트를 바꿔야함
                                props.navigation.navigate('Home',{
                                    stateTest:'change',
                                });
                            }
                        },
                        {
                            text:'はい',
                            onPress: ()=>{
                                props.navigation.navigate('Info',{
                                    stateTest:'change',
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

    const onCamera=()=>{
        // console.log(utils.FilePath.PICTURES_DIRECrTORY)
        // ImagePicker.launchCamera(options, (response) => {
        //     // Same code as in above section!
        //     console.log(response);
            
        //   });
    }
    const uploadImage =async(uri,imageName,ref)=>{
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(blob);
        
        return ref.put(blob);
    }
    const showCameraRoll = ()=> {
        // let result = await ImagePicker.launchImageLibrary();

        ImagePicker.launchImageLibrary(options, async(response) => {
            // console.log('imageSource',imageSource);
            const file ={
                uri:response.uri,
                name:response.fileName,
                type:'image/jpg'
            }
            console.log('file',file);
            
            const ref = await storage().ref("/images/"+file.name);
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {     
                console.log('set image');
                if(file.uri.length>0){
                    uploadImage(file.uri, file.name, ref)
                       .then(()=>{
                           console.log('firebase put Success');
                           ref.getDownloadURL()
                           .then((getURL)=>{
                               console.log('getURL',getURL);
                               fetch("http://"+url+"/rphotos",{
                                   method:"POST",
                                   headers:{
                                       "Accept":'application/json',
                                       "Content-Type":'application/json'
                                   },
                                   body:JSON.stringify({
                                        reservation_id:reservation.reservation_id,
                                        rphoto_url:getURL,
                                        rphoto_content:"rphoto_content"
                                    })
                               })
                               .then(res=>console.log('rphotos put success',res))
                               .catch(e=>console.log(e));                               
                           }).catch(e=>console.log(e));
                       })
                       .catch((e)=>console.log(e));
                    setImageSource(imageSource.concat({url:response.uri}));
                }
            }

        });
      };

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

    //carousel의 아이템 뷰 설정 함수
    const renderCarouselItem = ({item}) => {
        // console.log('item',item);

        return (
            <View style={[styles.cardContainer]}>
                    <Image style={styles.cardImage} source={{uri:item.url}}/>
            </View>
        );
    }  
    const pagination=()=> {
        // const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={5}
              activeDotIndex={5}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
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
    let Review;
    let pictureView;
    let imageList;
    //예약하기로 넘어 왔을 경우    
    if(whereScreen === 'reservation'){
        imageCard=
        <View style={styles.ImageWrap}>
            <Image style={styles.keeperImg} source={{ uri:data.keeper_store_imgurl }}></Image>
            <Text style={styles.keeperText}>{data.keeper_store_name}</Text>
        </View>
        headerText = <Text style={styles.headerText}>予約する</Text>
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>費用</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>鞄</Text>
                    <Text>キャリー</Text>
                    <Text>合計</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>数</Text>
                    <Text>{bagCnt}</Text>    
                    <Text>{carrCnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>期間</Text>
                    <Text>{getDays2(checkIn,checkOut)}</Text>
                    <Text>{getDays2(checkIn,checkOut)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>費用</Text>
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
                        <Text style={styles.subFont}>チェックイン</Text>
                    </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(checkIn)}</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>チェックアウト</Text>
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
                        buttonStyle={{backgroundColor:colors.green01}} title="予約する" 
                        onPress={payEnd}
                    />
                </View>
            </View>
        </View>;
    }else if(whereScreen === 'info'){
    //예약 확인 info에서 왔을 경우
        imageCard=
            <View style={styles.ImageWrap}>
                <Image style={styles.keeperImg} source={{ uri:data.keeper_store_imgurl }}></Image>
                <Text style={styles.keeperText}>{data.keeper_store_name }</Text>
            </View>
        headerText = <Text style={styles.headerText}>予約確認</Text>
        checkInOut=
        <View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>チェックイン</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate2(reservation.check_in)}</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>チェックアウト</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate2(reservation.check_out)}</Text>
                </View>
            </View>
        </View>;
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>決済費用</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>鞄</Text>
                    <Text>キャリー</Text>
                    <Text>合計</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>数</Text>
                    <Text>{reservation.bag_cnt}</Text>    
                    <Text>{reservation.car_cnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>機関</Text>
                    <Text>{getDays(reservation.check_in,reservation.check_out)}</Text>
                    <Text>{getDays(reservation.check_in,reservation.check_out)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>費用</Text>
                    <Text>¥{reservation.bag_cnt*400*ddd}</Text>
                    <Text>¥{reservation.car_cnt*700*ddd}</Text>
                    <Text>¥{reservation.bag_cnt*400*ddd+reservation.car_cnt*700*ddd}</Text>
                </View>
            </View>
        </View>;
        //상태 : 예약 완료, 보관 중 
        if(state==='keeper_reservation' || state==='keeper_keeping'){
            footer=
            <View>
                <Text style={styles.headerText}>
                    デリバリーの利用
                </Text>
                <View style={styles.paysCard}>
                    <View>
                        <Text>- キーパーに荷物を配達してくれるサービスです。</Text>    
                        <Text>- 半径5KM内のデリバリーを探します。</Text>
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="予約する" 
                            onPress={goDelivery}
                        />
                    </View>
                </View>
            </View>;
            // pictureView = 
            // <View>
            //     {/* <Text style={styles.headerText}>
            //         고객님의 짐
            //     </Text>
            //     <View style={styles.paysCard}>
            //         <Text>
            //             고객님의 짐은 키퍼가 안전하게 보관 하고 있습니다.
            //         </Text>
            //         <View>
            //             <Text>
            //                 사진
            //             </Text>
            //         </View>
            //     </View> */}
            // </View>
        //상태 : 배달 중
        }else if(state==='in_delivery'){
            footer=
            <View>                
                <View style={styles.paysCard}>
                        <Text>デリバリーの位置をリアルタイムで確認できます。</Text>    
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="デリバリー確認" 
                            onPress={goDeliveryFindScreen}
                        />
                </View>
            </View>;
        //상태 : 종료
        }else if(state ==='keeper_listen'){
            imageList =
            <>
            <View style={styles.header}>
                <Text style={styles.headerText}>荷物の写真を登録</Text>
            </View>
                <Carousel
                    //https://github.com/archriss/react-native-snap-carousel
                        // ref={(c) => { this._carousel = c; }}
                        data={imageSource}
                        renderItem={renderCarouselItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width-100}
                        // containerCustomStyle={styles.carousel}
                        // onSnapToItem = {
                        //     (index) => this.onCarouselItemChange(index)
                        // }
                        removeClippedSubviews={false}
                />
                <Button buttonStyle={styles.button2} title={'写真登録'} onPress={showCameraRoll}/>
                {/* <Button buttonStyle={styles.button2} title={'사진 촬영'}  onPress={onCamera}/> */}
            </>
            footer=
            <View>              
                
                { pagination }
                <View style={styles.paysCard}>
                        <Text>キーファーの受諾を待機中です...</Text>    
                        <Text>
                            少々お待ちください...
                        </Text>
                </View>
            </View>;
        }else{
            footer=
            <View>
                <View>  
                    <Text style={styles.headerText}>デリバリー利用内訳</Text>                  
                    <View style={styles.paysCard}>
                        <View>
                            <Text>- デリバリー : {delivery.delivery_name}</Text> 
                            <Text>- 車種 : {delivery.delivery_car}</Text>   
                            <Text>- 移動距離 : 6.23km</Text>
                        </View>
                    </View>
                </View>
            </View>;
            Review=
            <View>
                <Text style={styles.headerText}>レビュー作成</Text>                  
                <Text style={{ width:'100%' }}>キーパーについてのレビューを残してください。</Text> 
                <View style={styles.reviewView}>
                    <View style={styles.field}>
                        <Text style={{ marginBottom:5, fontSize:18 }}>コメント</Text>
                        <TextInput
                            style={{ borderColor:colors.gray, borderWidth:2, width:'90%', padding:10 }}
                            multiline={true}
                            underlineColorAndroid={'transparent'}
                            textAlignVertical={'top'}
                            onChangeText={val=>{
                                console.log(val);
                                
                                setReviewContent(val);
                            }}
                        />
                    </View>
                    <View style={styles.field}>
                        <AirbnbRating 
                            // starStyle={{ flex:3 }}
                          size={20}
                          onFinishRating={
                              rating=>{
                                  console.log(rating);
                                  setRating(rating);
                              }
                          }
                        />

                    </View>

                    <View style={styles.field2}>
                        <Button title={'登録'} buttonStyle={styles.button2} onPress={sendReviewData}/>
                    </View>
                </View>
                <View>
                    {/* <Button title='리뷰 추가' /> */}
                </View>
            </View>
        }
    }    
    // console.log('키퍼 아이디',data.keeper_store_id);
    // <script src="https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js"></script>
    // console.log('test',AWS.config);
    // console.log('imageSource',imageSource);

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
                        {Review?
                        <View style={styles.cardView}>
                            {Review}
                        </View>:null
                        }   
                        {
                            imageList?
                            <View style={styles.cardView2}>
                            {imageList}
                            </View>:null
                        }
                        <View style={styles.cardView}>
                            {checkInOut}
                        </View>
                        <View style={styles.cardView}>
                            {total}
                        </View >
                        {
                            pictureView?
                            <View style={styles.cardView}>
                            {pictureView}
                            </View>:null
                        }

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
    cardView2:{
        backgroundColor:colors.white,
        width:'100%',
        marginTop:10,
        paddingTop:10,
        alignItems:'center',

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
    },
    button:{
        marginLeft:13,
        marginRight:13,
        width:300,
        backgroundColor:colors.green01,
        marginBottom:15,
        // backgroundColor:'rgba(255,255,255,0.2)'
    },
    button2:{
        marginLeft:13,
        marginRight:13,
        width:300,
        backgroundColor:colors.green01,
        marginBottom:15,
        // backgroundColor:'rgba(255,255,255,0.2)'
    },
    field:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    },
    field2:{
        marginTop:17,
        alignItems:'center',
        justifyContent:'center'
    },
    reviewView:{
        margin:10,
        backgroundColor:'rgba(200,200,200,0.4)',
        borderRadius:10,
        marginTop:8,
        marginBottom:30,
        padding:8,
    },
    cardImage:{
        width: Dimensions.get('window').width-100
        , height: '90%'
    },
    cardContainer:{
        width: Dimensions.get('window').width
        , height: 400
    }
});

export default Reservation;