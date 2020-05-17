import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,Button,TouchableHighlight} from 'react-native';
import { Input,Avatar  } from 'react-native-elements';
import MapView, {Marker,PROVIDER_GOOGLE,Polyline ,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {CurrentLocationButton} from '../../components/buttons/CurrentLocationButton';
import {ShowDeliveryButton} from '../../components/buttons/ShowDeliveryButton';
import {UserAndDeliveryCenterButton} from '../../components/buttons/UserAndDeliveryCenterButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../styles/colors';
import database from '@react-native-firebase/database';


const url='my-project-9710670624.df.r.appspot.com';

export default class DeliveryFindScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            delivery:{
                latitude:35.8928, 
                longitude: 128.6226
            },
            userId : this.props.route.params?.userId,
            data: this.props.route.params?.data,
            reservation: this.props.route.params?.reservation,
            error: null,
        };        
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.

            Geolocation.getCurrentPosition(
                (position) => {
                    let initialRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    }
                    this.setState({
                        initialRegion,
                        error: null,
                    })

                    this.getDeliveryLocation();

                },
                (error) => {
                    // See error code charts below.
                    this.setState({error:error.message});
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                //정확도, 타임아웃, 최대 연령
            );
    }
    componentWillUnmount(){
        database().ref('/users/'+this.state.userId).off('value');
        console.log('DelivaeryFindScreen - componentWillUnmount 성공');
    }
    getDeliveryLocation(){
        console.log('DeliveryFindScreen -> userId :',this.state.userId);
        database()
        .ref('/users/'+this.state.userId)
        .once('value')
        .then(snapshot => {
            console.log('User data - state: ', snapshot.val());

            this.setState({
                dInit:{
                    latitude:snapshot.val().delivery_latitude,
                    longitude:snapshot.val().delivery_longitude,
                }
            });    
            console.log('componenMOunt',this.state.dInit);
   
            if(this.state.dInit){
                this.getRouteLocation();
            }                 
        });
        database().ref('/users/'+this.state.userId)
        .on('value', snapshot => {
                //data가 object이긴 한데 json처럼 값이 안나와서 정제 한번 해줌.
                console.log(snapshot.val().state);
                if(snapshot.val().state == 'take_luggage'){
                    this.takeLuggage();
                    console.log('update status to in_delivery');
                    
                }
                const newCoordinate ={
                    latitude:snapshot.val().delivery_latitude,
                    longitude:snapshot.val().delivery_longitude,
                }
                // console.log(newCoordinate);//잘나옴
 
                if (Platform.OS === "android") {
                    if (this.marker) {
                        // console.log(this.marker);
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500 // 500 is the duration to animate the marker
                        );
                    }
                }
                this.setState({
                    delivery:{
                        latitude:newCoordinate.latitude, 
                        longitude: newCoordinate.longitude,
                        latitudeDelta:0.003,
                        longitudeDelta:0.003,
                    },
                })
        });     
    }
    getRouteLocation(){
        console.log('getRouteLoccation 안에 delivery값 : ',this.state.dInit);
        
        fetch('https://api.mapbox.com/directions/v5/mapbox/walking/'
            +this.state.dInit.longitude+','+this.state.dInit.latitude+';'+this.state.initialRegion.longitude+','+this.state.initialRegion.latitude+'?geometries=geojson&access_token=pk.eyJ1IjoiamVvbnlvbmdzZW9rIiwiYSI6ImNrOXh4dGh0aTA1aXozbXBpdjNkeXM0OXYifQ.z_QRmRG_ZTKLTxHdUnLDiQ',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        }).then((res)=>res.json())
        .then((resJson)=>{
            const distance = ''+Math.round(resJson.routes[0].distance)/1000+'km';
            const speed = 20;
            const time = Math.ceil((Math.ceil(resJson.routes[0].distance)/1000)/speed*60);

            console.log('거리 : ',distance);
            console.log('속력 : ',speed);
            console.log('시간 : ', time);

            let coords = resJson.routes[0].geometry.coordinates.map(item => {
                return { latitude: item[1], longitude: item[0] };
            });
            // console.log(coords);
            this.setState({
                coords,
                distance,
                time
            })
        })
        .catch((e)=>{
            console.error(e);
        });
    }

    deleteToken=async()=>{
        await AsyncStorage.setItem('status','endDelivery');
    }

    takeLuggage(){
        console.log('reservation id:',this.state.reservation.reservation_id);
        
        fetch('http://'+url+'/reservations/'+this.state.reservation.reservation_id,{
            method: 'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                reservation_status:'in_delivery',
            })
        }).then((response)=>{
            return response.json()
        }).then((resJson)=>{
            Alert.alert(
                //header
                '인계 완료했습니다.',
                // title
                'Info탭에서 실시간 짐의 위치를 확인할 수 있습니다.',
                [
                    {
                        text:'홈으로...',
                        onPress:()=>{
                            database().ref('/delivery').update({state:'delivering'})
                            .then(()=>{console.log('Data updated');
                            });
                            this.props.navigation.navigate('Info',{
                                test:'test',
                            });
                        }
                    },
                ]
            )
            console.log('tlqkf',resJson);
        })
        .catch((e)=>{console.error(e)
        });

        this.deleteToken()
    }

    centerMap(){
        const {
            latitude, 
            longitude, 
            latitudeDelta, 
            longitudeDelta} = this.state.initialRegion
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })
    }
    goDelivery(){
        const {
            latitude, 
            longitude, } = this.state.delivery
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta:0.003,
            longitudeDelta:0.003
        })
    }
    zoomOut(){
        const userRegion ={
            latitude: this.state.initialRegion.latitude,
            longitude:this.state.initialRegion.longitude,
        }
        const delivery = this.state.delivery
        const zoomOutLat = (userRegion.latitude + delivery.latitude)/2;
        const zoomOutLon = (userRegion.longitude + delivery.longitude)/2;
        console.log('userRegion : ' +JSON.stringify(userRegion));
        console.log('storeRegion : ' +JSON.stringify(delivery));
        
        console.log('zoomOutLat :'+zoomOutLat);
        console.log('zoomOutLon : '+zoomOutLon);
        
        this._map.animateToRegion({
            latitude:zoomOutLat,
            longitude:zoomOutLon,
            latitudeDelta:0.006,
            longitudeDelta:0.006,
        })
    }

    render(){             
        return(
            <View style={styles.container}>
                <View style={styles.rootMenu}>
                    <Text style={styles.titleText}>딜리버리를 찾았습니다.</Text>
                    <View style={styles.elem}>
                        <Avatar
                            rounded
                            title="DV"
                            size="large"
                        />
                        <View style={styles.deliveryInfoText}>
                            <Text style={styles.dName}>딜리버리 : 전꿈몽</Text>
                            <Text style={styles.dCar}>대구11사1234 | 아반떼cn7</Text>
                            <Text style={styles.timeText}>총 거리 : {this.state.distance}</Text>
                            <Text style={styles.timeText}>약 {this.state.time}분 후 도착합니다.</Text>
                        </View>
                    </View>
                    
                </View>
                <CurrentLocationButton
                    cb={()=>{this.centerMap()}}
                />
                <ShowDeliveryButton
                    cb={()=>{this.goDelivery()}}
                />
                <UserAndDeliveryCenterButton
                    cb={()=>{this.zoomOut()}}
                />
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map=> {this._map = map}}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={false}
                    showsMyLocationButton = {true}
                    showsCompass = {true}
                    rotateEnabled={false}
                >   
                    {this.state.initialRegion&&
                        <Marker
                            coordinate={this.state.initialRegion}
                            image={require('../../img/signs.png')}
                        >
                        </Marker>
                    }
                    <Marker.Animated
                        coordinate={this.state.delivery}
                        image={require('../../img/location.png')}
                        ref={ref=>this.marker=ref}
                        title={'Delivery'}
                    />
                    {   
                        this.state.coords?
                        <Polyline
                        coordinates={this.state.coords}
                        // strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                      />:null
                    }
                </MapView>
                <TouchableHighlight 
                    onPress={()=>{
                    

                        this.takeLuggage();
                    }
                }>
                    <View style = {styles.elem}>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </View>
                </TouchableHighlight>
            </View>

        );
    } 
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        //(position: 'absolute', left: 0, right: 0, top: 0, bottom: 0)
    },
    header: {
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#9aa9ff',
    },
    title : {
        alignItems: 'center',
        width:'90%',
    },
    titleSearchButton:{
        width:'100%',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    timeText:{
        color:"orange",
        fontSize:15,
        fontWeight:'bold'
    },
    content : {
        flex : 4,
        alignItems:'center',
    },
    footer: {
        width:'100%',
    },
    marker:{
        width:5,
        height:5,
    },
    carousel:{
        position:'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height:200,
        width:300,
        padding:24,
        borderRadius:24
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        position:'absolute',
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
    },
    cardTitle:{
        color:'white',
        fontSize:22,
        alignSelf:'center'

    },
    nextButton : {
    },
    flat:{
        height:'30%',
    },
    rootMenu:{
        position:'absolute',
        zIndex:9,
        width:'95%',
        margin:'2.5%',
        padding:15,
        backgroundColor:colors.white,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
        alignItems:"center",
    },
    elem:{
        flexDirection:'row',
        width:"100%",
        alignItems:'center',
    },
    deliveryInfoText:{
        marginLeft:20,
    }
});