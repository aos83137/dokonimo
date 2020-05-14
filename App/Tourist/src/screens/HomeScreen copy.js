import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Carousel from 'react-native-snap-carousel';
import {SearchMenu} from '../components/menu/SearchMenu';
import {CurrentLocationButton} from '../components/buttons/CurrentLocationButton';
import {PlacesAutoComplete} from '../screens/PlacesAutoComplete';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            coordinates:[
                { name : '1', latitude:35.8938, longitude:128.6245, image:require('../img/sushi.jpg')},
                { name : '2', latitude:35.8970, longitude:128.6249, image:require('../img/sushi.jpg')},
                { name : '3', latitude:35.8965,  longitude:128.6220, image:require('../img/sushi.jpg')},
                { name : '4', latitude:35.8940, longitude:128.6219, image:require('../img/sushi.jpg')},
                { name : '5', latitude:35.8943188, longitude:128.6238612, image:require('../img/sushi.jpg')},
                
            ],
            markers:[],
            hiddenMenu:{display:'none'}
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
                        region : initialRegion, 
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude,
                        initialRegion,
                        error: null,
                    });
                    console.log(JSON.stringify(position));
                    
                },
                (error) => {
                    // See error code charts below.
                    this.setState({error:error.message}),
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                //정확도, 타임아웃, 최대 연령
            );
    }

    
    //현재 위치로 돌아가는 버튼
    centerMap(){
        const {
            latitude, 
            longitude, 
            latitudeDelta, 
            longitudeDelta} = this.state.region
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
            hiddenMenu:{display:'none'}
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
            hiddenMenu:{display:'flex'}
        })
    }

    //carousel의 아이템 뷰 설정 함수
    renderCarouselItem = ({item}) => {
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Image style={styles.cardImage} source={item.image}/>
        </View>
    };    
    
    render(){
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
                    <Marker
                        draggable
                        coordinate={this.state.coordinate}
                        // 드래그 이벤트 아직 작동 잘안해..
                        onDragEnd={
                            (e)=> this.setState({x: e.nativeEvent.coordinate})
                        }
                        //마커 이미지 사이즈가 안변함...
                        // image={require('../img/logo.png')}
                        // style={{ width: 50, height: 5 }}

                        // title={"this is a marker"}
                    >
                        <Callout onPress={this.showWelcomMesage}>
                            <Image source={require('../img/sushi.jpg')}/>
                            <Text>An Interstion city</Text>
                        </Callout>
                        {/* <Image source={require('../img/marker.png')}/> */}
                    </Marker>
                    <Marker
                        coordinate={{latitude: 35.896198, longitude: 128.622353}}
                        title="this is a marker"
                        description="this is a marker example"
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
                    <SearchMenu cb={()=>{}}/>
                </View>
                <View style={styles.content}>
                    <Text>현재 좌표</Text>
                    <Text >latitude : {this.state.latitude}</Text>
                    <Text >longitude : {this.state.longitude}</Text>
                </View>
                <View style={[this.state.hiddenMenu,styles.footer]}>
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