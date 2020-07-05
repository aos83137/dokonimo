import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Image,ActivityIndicator,Alert,TouchableHighlight} from 'react-native';
import { Button, Overlay,Text } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

const Delivery = (props)=>{
    const [load,setLoad] = useState(false);
    const [userCoords,setUserCoords] = useState(null);
    const [userId,setUserId] = useState(props.route.params?.userId);
    const [distance, setDistance] = useState();
    const [time,setTime] = useState();

    // const [r_id, setR_id] = useState();
    const reservation = props.route.params?.reservation; //예약정보 받음
    const data = props.route.params?.data ? props.route.params?.data : '없디'; // 가게정보 받음
    
    const _storeData = async()=>{
        try{
            const userToken =await AsyncStorage.getItem('userToken');
            // const r_id =await AsyncStorage.getItem('reservation_id');
            console.log('userToken',userToken);
            // setR_id(r_id);
            setUserId(userToken);
            
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{

        Geolocation.getCurrentPosition((position)=>{
            let userCoords = {
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
            }
            console.log('DeliveryInfo화면 - 현재 유저coord : ', userCoords);
            
            fetch('https://api.mapbox.com/directions/v5/mapbox/walking/'
                +userCoords.longitude+','+userCoords.latitude+';'+data.keeper_store_longtitude+','+data.keeper_store_latitude+'?geometries=geojson&access_token=pk.eyJ1IjoiamVvbnlvbmdzZW9rIiwiYSI6ImNrOXh4dGh0aTA1aXozbXBpdjNkeXM0OXYifQ.z_QRmRG_ZTKLTxHdUnLDiQ',{
                method:"get",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
            }).then((res)=>res.json())
            .then((resJson)=>{
                const distance = ''+Math.round(resJson.routes[0].distance)/1000+'km';
                const speed = 20;
                const time = Math.round((Math.round(resJson.routes[0].distance)/1000)/speed*60);
                console.log('거리 : ',distance);
                console.log('속력 : ',speed);
                console.log('시간 : ', time);

                setDistance(distance)
                setTime(time);
            })
            .catch((e)=>{
                console.log(e);
            });
            setUserCoords(userCoords)
        },(e)=>{console.error(e);});
        _storeData()

        return ()=>{
            console.log("This will be logged on unmount");
        };
    },[props]);

    const findDelivery=()=>{
        console.log('넣는다! :' + reservation.reservation_id);
        setLoad(true);
        database()
        .ref('/users/'+userId)
        .update({
            name: userId,
            reservation_id:reservation.reservation_id,
            user_latitude:userCoords.latitude,
            user_longitude: userCoords.longitude,
            state:'listen',
        })
        .then(() => {
            console.log('Data set.')
        });
        database()
        .ref('/users/'+userId)
        .on('value', snapshot => {
            console.log('User data: ', snapshot.val().state);
            const state = snapshot.val().state;
            if(state=='ok'){
                setVisible(!visible);
                setLoad(false);
                props.navigation.navigate('DeliveryFindScreen',{
                    reservation,
                    data,
                    userId,
                });
            }
        });
        
        fetch('https://fcm.googleapis.com/fcm/send',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAnXNFhws:APA91bH5gDeGFgVYolbkdx44qnOyYadDP1-xst1-tkUYlWHXqC3Lropg4GIPwqnD8-fG8kmT6yzCh8ueY1rnvSYSrVokqfMRWOLexTF87JK_2cETW8RkT2oA9r13k8FLnG0IAHGBYqsc'
            },
            body:JSON.stringify(
                {
                    //여기 토큰을 딜리버리꺼로 바꾸면 될듯
                    "to":"/topics/delivery",
                    "priority":"high",
                    "notification":{
                        "body":"ツアーリストからデリバリーリクエストがあります。",
                        "title":"デリバリーリクエスト"
                    }, 
                    "data":{
                        "title": "デリバリーリクエスト",
                        "message":"ツアーリストからデリバリーリクエストがあります。"
                    }
                }
            )
        });

    }
    const homeNavi=()=>{
        props.navigation.navigate('Main',{ screen: 'InfoScreen' });
    }
    let showActivity;
    if (load){
        showActivity=
        <View style = {styles.elem}>
            <ActivityIndicator/>
            <Text style={styles.searchText}>デリバリーを探しています…</Text>
        </View>
    }


    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };
    return(
        <View style={styles.container}>
            <View>
                <Overlay isVisible={visible}>
                    <View style={styles.header}>
                        <Text h3>詳細金額</Text>
                    </View>
                    <View style={{ flex:2 }}>
                        <LottieView style={styles.lottie} source={require('../../img/lottie/walk-processes.json')} autoPlay loop/>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text>出発地：現在地</Text>
                            {/* <Icon2 name='arrow-down' size={24}/> */}
                            <Text>目的地 : {data.keeper_store_name}</Text>

                            <Text h5>運行距離 : {distance}</Text>
                            <Text>最終決済金額 : 1000¥</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        
                        {showActivity?
                        showActivity:<Text>デリバリーを探しますか。</Text>
                        }
                        <View style={styles.elem}>
                            <Button buttonStyle={styles.button2} title="いいえ"  onPress={toggleOverlay}/>
                            <Button buttonStyle={styles.button2} title="ハイ" onPress={findDelivery}  />
                        </View>
                    </View >
                </Overlay>
            </View>
            <View style ={styles.header}>
                <TouchableHighlight onPress={()=>{props.navigation.navigate('Main')}}>
                    <View>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </View>
                </TouchableHighlight>
            </View>
            <View style = {styles.lottieView}>
            <Text h4 style={styles.headerTitle}>ご予約の受付が完了しました。</Text>
            <LottieView style={styles.lottie} source={require('../../img/lottie/checkList3.json')} autoPlay loop/>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText2}>
                    デリバリーサービスを利用する
                </Text>
                <Text style={styles.contentText}>
                    お客様の荷物をお店までお伝えするサービスです。
                </Text>
                <Text style={styles.contentText}>
                    経路は現在の位置からキーパーまで自動設定され、
                </Text>
                <Text style={styles.contentText}>
                    10分以内に到着できるデリバリーを呼びます。
                </Text>
                <Text style={styles.contentText3}>
                    (24時間内のキーパーの受け入れにより、予約がキャンセルされることがあります。)</Text>
            </View>
            <View style={styles.footer}>
                {/* {showActivity} */}
                <View style={{justifyContent:'center', flexDirection:'row', }}>
                    <Button title="当日に使います。" type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={homeNavi}/>
                    <Button title="はい、今使います。" type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={toggleOverlay}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.gray
    },
    header:{
        padding:'2%', 
    },
    elem:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'center'
    },
    lottie:{
        // width:200,
        // height:"100%",
        
    },
    lottie2:{
        width:32
    }
    ,
    lottieView:{
        height:'40%',
        width:"100%",
        alignItems:'center',
        marginTop:"5%",
    },
    content:{
        alignItems:'center',
        padding:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
        backgroundColor:colors.white
    },
    contentText2:{
        fontSize:20,
    },
    searchText:{
        fontSize:16,
    },
    footer:{
        width:"100%",
        alignItems:'center',
    },
    contentText:{
        fontSize:14,
    },  
    contentText3:{
        fontSize:11,
        marginTop:10,
    },  
    headerTitle:{
        // width:'100%',
        fontSize:23,
        fontWeight:"500"
    },
    button:{
        marginLeft:13,
        marginRight:13,
        // backgroundColor:'rgba(255,255,255,0.2)'
    },
    button2:{
        marginLeft:13,
        marginRight:13,
        width:100,
        backgroundColor:colors.green01,
        // backgroundColor:'rgba(255,255,255,0.2)'
    },
    buttonTitle:{
        color:colors.black
    }
});
export default Delivery;
