import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,Button,TouchableHighlight} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Carousel from 'react-native-snap-carousel';
import {SearchMenu} from '../components/menu/SearchMenu';
import {CurrentLocationButton} from '../components/buttons/CurrentLocationButton';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            coordinates:[
                { name : '1', latitude:35.8938, longitude:128.6245, image:require('../img/sushi.jpg')},
                { name : '2', latitude:35.8970, longitude:128.6249, image:require('../img/sushi.jpg')},
                { name : '3', latitude:35.8965,  longitude:128.6220, image:require('../img/sushi.jpg')},
                { name : '4', latitude:35.8940, longitude:128.6219, image:require('../img/sushi.jpg')},
                { name : '5', latitude:35.8943188, longitude:128.6238612, image:require('../img/sushi.jpg')},
                
            ],
            markers:[],
            // bagCnt : props.route.params.bacCnt,
            hiddenToggle:{
                display:'none'
            }
        };        
    }

    //componentDidMount : render가 호출된 후 실행되는 메서드
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.

            Geolocation.getCurrentPosition(
                (position) => {
                    let initialRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.045,
                        longitudeDelta: 0.045,
                    }

                    this.setState({
                        initialRegion,
                        error: null,
                    });
                    console.log(JSON.stringify(position));
                    
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

    static getDerivedStateFromProps(props, state) {
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.id !== state.prevId) {
          return {
            externalData: null,
            prevId: props.id,
          };
        }
        // No state update necessary
        return null;
      }
    //현재 위치로 돌아가는 버튼
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

    //맵 클릭시 가게 정보 슬라이드 메뉴가 사라짐
    clickMapHiddenMenu = () =>{
        this.setState({
            hiddenToggle:{
                display:'none'
            }
        })
    }

    //Alert 사용
    showWelcomMesage = () =>{
        Alert.alert(
            //Header
            'Welecome to San 대구',
            //title
            'The food is amazing',
            //footer button
            [
                {
                    text:'Cancel',
                    style: 'cancel'
                },
                {
                    text:'Ok'
                }
            ]
        )
    }
    //onSnapToItem의 콜백함수로 쓸 함수임
    onCarouselItemChange = (index) =>{
        let location = this.state.coordinates[index];
        
        //Region이동
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0115,
            longitudeDelta: 0.0121,
        });

        //showCallout() : 이 마커의 문구를 표시합니다
        this.state.markers[index].showCallout();
    }
    
    //marker눌렀을 때 이벤트
    onMarkerPressed = (location, index) => {
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0115,
            longitudeDelta: 0.0121,
        })
        //snapToItem : carousel 의 함수  index에 맞는 스냅을 보여줌
        this._carousel.snapToItem(index);
        this.setState({
            hiddenToggle:{
                display:'flex'
            }
        })
    }

    //carousel의 아이템 뷰 설정 함수
    renderCarouselItem = ({item}) => (
        <TouchableHighlight onPress={()=>{
            //네비갈때 데이터 던져주는걸로 구분하면 될듯함
            this.props.navigation.navigate('KeeperInfo');
        }}>
            <View style={[styles.cardContainer,this.state.hiddenToggle]}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Image style={styles.cardImage} source={item.image}/>

            </View>
        </TouchableHighlight>
    )    
    
    render(){     
        const checkIn = this.props.route.params?.checkIn
        const checkOut = this.props.route.params?.checkOut
        const bagCnt = this.props.route.params?.bagCnt
        const carrCnt = this.props.route.params?.carrCnt
        const inputData = this.props.route.params?.inputData.description

        // console.log('render할때 값 : '+JSON.stringify(this.state.initialRegion));
        
        return(
            <View style={styles.container}>
                <CurrentLocationButton
                 cb={()=>{this.centerMap()}}
                />
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map=> {this._map = map}}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={true}
                    showsMyLocationButton = {true}
                    showsCompass = {true}
                    rotateEnabled={false}
                    onPress = {this.clickMapHiddenMenu}
                >   
                    <Circle
                        center={{ latitude: 35.8943188,
                            longitude:128.6238612, }}
                        radius={100}
                        fillColor={'rgba(100,100,200,0.5)'}
                    />
                    
                    {
                        this.state.coordinates.map((marker, index)=>(
                            <Marker
                            key={marker.name}
                            coordinate={{latitude:marker.latitude, longitude:marker.longitude}}
                            title={marker.name}
                            ref={ref=> this.state.markers[index] = ref}
                            onPress = {() => this.onMarkerPressed(marker, index)}
                            >
                                
                            </Marker>
                        ))
                    }
                </MapView>

                <View style={styles.title}>
                    <SearchMenu 
                        goPlace={()=>{this.props.navigation.navigate('PlacesAutoComplete',{
                            _map : this._map
                        });}}
                        goDate={()=>{this.props.navigation.navigate('DateSetting',{
                            carrCnt,
                            bagCnt,
                            checkIn,
                            checkOut,
                        });}}
                        checkIn = {checkIn}
                        checkOut = {checkOut}
                        bagCnt = {bagCnt}
                        carrCnt ={carrCnt}
                        inputText = {inputData}
                    />
                </View>

                <View style={styles.content}>
                    {/* <Text>현재 좌표</Text>
                    <Text >latitude : {this.state.latitude}</Text>
                    <Text >longitude : {this.state.longitude}</Text> */}
                </View>

                <View style={[styles.footer]}>
                    <View style={[styles.footer]}>
                        <Carousel
                        //https://github.com/archriss/react-native-snap-carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.coordinates}
                            renderItem={this.renderCarouselItem}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={300}
                            containerCustomStyle={styles.carousel}
                            onSnapToItem = {
                                (index) => this.onCarouselItemChange(index)
                            }
                            removeClippedSubviews={false}
                        />
                    </View>
                </View>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexDirection:'column',
        alignItems:"center"
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
    }
});