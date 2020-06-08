import React , {Component,useState, useEffect } from 'react';
import {View,StyleSheet, Image, ScrollView, Alert, Dimensions, ActivityIndicator,TouchableHighlight} from 'react-native';
import { Button,Avatar,Text,Tooltip,Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import  colors from '../styles/colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { log } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

let {width, height} = Dimensions.get('window')

const URI = 'https://my-project-9710670624.df.r.appspot.com'

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
function Item({item, props}){
    let cnt='';
    for (var i=0; i<item.starpoint; i++){
        cnt += '★';
    }

return(
    <View>
        <View style={styles.rowDirection}>
            <Avatar
                rounded
                title={item.tourist_id[0]}
                size="medium"
            />
            <Text  style={styles.nameText}>{item.tourist_id}</Text>
        </View>
        <View style={styles.starEmel}>
            <View style={styles.starRating}>
            <Text>{cnt + ' '+item.starpoint}</Text>
            </View>
            <Text>{item.created_at}</Text>                        
        </View>
        <View style={styles.inWrapView}> 
            <Text>
                {item.content}
            </Text>
        </View>
    </View>
    )
}

const KeeperInfo = (props)=>{   
    const checkIn = props.route.params?.checkIn
    const checkOut = props.route.params?.checkOut
    const bagCnt = props.route.params?.bagCnt
    const carrCnt = props.route.params?.carrCnt
    const keeper_id = props.route.params?.keeper
    const [keeper,setKeeper] = useState({});
    const [isLoding, setIsLoding] = useState(true);
    const coord = props.route.params?.coord;
    const comment = [
        {
            tourist_id:'JeonYS',
            starpoint:5,
            created_at:'2020.05.12',
            content:'사장님도 친절하시고 가게 구경도 재밌게 했습니다!!\n다음에 여행오면 또 이용할 것 같아요!!'
        },
        {
            tourist_id:'小嶋',
            starpoint:5,
            created_at:'2020.04.24',
            content:'丁寧にご対応頂きました。ありがとうございます。'
        },        {
            tourist_id:'田中',
            starpoint:5,
            created_at:'2020.03.20',
            content:'今回、コインロッカーが使えず、困って、白畑ら、こちらのサイトを知りました。迅速に対応していただけて、また機会があれば、是非利用したいと思います。'
        },
        {
            tourist_id:'JeonYS',
            starpoint:5,
            created_at:'2020.05.12',
            content:'사장님도 친절하시고 가게 구경도 재밌게 했습니다!!\n다음에 여행오면 또 이용할 것 같아요!!'
        }
    ]
    useEffect(()=>{
        fetch(URI+'/kstoreinfos',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('keeper_id',keeper_id);
            // console.log('responseJson',responseJson);
            responseJson.forEach(element => {
                // console.log(element.keeper_store_id);
                if(element.keeper_store_id == keeper_id){
                    console.log('element',element);
                    setKeeper(element)
                }
            });
            setIsLoding(false);
        }).catch((error)=>{
            console.error(error);
        });
    },[])
    if(isLoding){
        return(
            <View style={{ flex:1, paddingTop:20}}>
                <ActivityIndicator/>
            </View>
        )
    }
    const goReservation=()=>{
        props.navigation.navigate('DateSetting',{
            carrCnt,
            bagCnt,
            checkIn,
            checkOut,
            keeper,
            keeper_id,
            coord,
            whereScreen:'info'
        });
    }
    console.log(keeper);
    
    const imgUrl = ''+keeper.keeper_store_imgurl;

    
    // console.log(imgUrl);
    const test='../img/store/img5.png';    
    // const input = require(string);
        return(
            <View style={{ flex:1 }}> 
                <ScrollView stickyHeaderIndices={[0]} >
                    <View style ={styles.header}>
                        <TouchableHighlight onPress={()=>{props.navigation.goBack()}}>
                            <Icon name='keyboard-arrow-left' size={24}/>
                        </TouchableHighlight>
                    </View>
                    <View style = {styles.container}> 
                        <View style={styles.ImageWrap}>
                            {
                                imgUrl ? 
                                <Image style={styles.keeper} source={{
                                    uri: imgUrl,
                                  }}/>
                                :null
                            }
                        </View>
                        <View style={styles.title}>
                            <View style={styles.starEmel}>
                                <Text>Keeper</Text>
                                <View style={styles.starRating}>
                                    <Rating imageSize={20} readonly startingValue={5} style={styles.rating} />
                                    <Text>  5.0</Text>
                                </View>
                            </View>
                            <Text style={styles.titleFont}>{keeper.keeper_store_name}</Text>
                        </View>
                        <View style={styles.cardView}>
                            <Text style = {styles.subTitle}>보관 가능한 시간</Text>                            
                            {/* <Tooltip popover={<Text>Info here</Text>} height={100}> */}
                                <View style={styles.inWrapView}>
                                    <View style={styles.elem}>
                                        <Icon
                                            name='access-time'
                                            size={28}
                                            color={colors.green01}
                                            style={styles.icon}
                                        />
                                        <Text style={styles.subText}>오늘</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subText}>{keeper.keeper_store_openinghours}</Text>
                                    </View>
                                </View>
                            {/* </Tooltip> */}
                            <View style={styles.inWrapViewLast}>
                                <View style={styles.elem}>
                                    <Icon
                                        name='card-travel'
                                        size={28}
                                        color={colors.green01}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.subText}>수하물 개수 제한</Text>
                                </View>
                                <View>
                                    <Text style={styles.subText}>
                                        가방 사이즈 x {keeper.keeper_store_bag_cnt}
                                    </Text>
                                    <Text style={styles.subText}>
                                        슈트케이스의 사이즈 x {keeper.keeper_store_bag_cnt}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardView}>
                            <Text style = {styles.subTitle}>가게 정보</Text>
                            <View style={styles.inWrapView}>
                                <View style={styles.elem}>
                                    <Icon
                                        name='local-phone'
                                        size={28}
                                        color={colors.green01}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.subText}>전화기</Text>
                                </View>
                                <View style={styles.elem}>
                                    <Text style={styles.subText}>{keeper.keeper_store_tel}</Text>
                                </View>
                            </View>
                            <View style={styles.inWrapViewLast}>
                                <View style={styles.elem}>
                                    <Icon   
                                        name='location-on'
                                        size={28}
                                        color={colors.green01}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.subText}>위치</Text>
                                </View>
                                <View>
                                    <Text style={styles.subText}>{keeper.keeper_store_address}</Text>
                                </View>
                            </View>
                            {/* <View style={styles.inWrapView}>
                                <Text>홈페이지,링크</Text>
                                <Text>http://www.naver.com</Text>
                            </View> */}
                        </View >
                        <View style={styles.cardView}>
                            <Text style={styles.subTitle}>평가</Text>
                            <FlatList
                                data={comment}
                                renderItem={({item})=>(<Item item={item} props={props}/>)}
                                keyExtractor={item=>item.id}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.floatView}>
                    <Button title={'예약하기'} buttonStyle={{backgroundColor:colors.green01}} onPress={goReservation}></Button>
                </View>
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
        borderRadius:2,
    },
    keeper:{
        width: '100%',
        height:200,
        borderRadius:5,
    },
    header:{
        padding:'2%',
        position:'absolute',
    },
    subTitle:{
        fontWeight:'bold',
        fontSize:18,
    },
    subText:{
        fontSize:16,
    },
    title:{
        width:'100%',
        paddingTop:10,
        paddingLeft:18,
        paddingRight:18,
        backgroundColor:colors.white
    },
    rowDirection:{

            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderColor:'#eee',
            borderBottomWidth:0.5,
            padding: 5,
    },  
    nameText:{
        marginLeft:10,
    },  
    starEmel:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    titleFont:{
        fontSize:24,
        fontWeight:'bold',
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
        marginTop:10,
        paddingBottom:5,
        width:"100%",
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    inWrapViewLast:{
        marginTop:5,
        width:"100%",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:10,
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
    icon:{
        marginRight:5,
    },
    starRating:{
        flexDirection:'row',
        justifyContent:'center',
    }
}
);

export default KeeperInfo;