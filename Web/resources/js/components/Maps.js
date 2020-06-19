import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios'
// import LinesEllipsis from 'react-lines-ellipsis'


const mapStyles = {
  width: '100%',
  height: '100%'
};



{/* <LinesEllipsis
  text='long long text'
  maxLine='3'
  ellipsis='...'
  trimRight
  basedOn='letters'
/> */}

class Maps extends Component {

  componentWillMount() {
      this.setState({ markers: [] })
  }


  componentDidMount(){
    this.getMap();
  }
  getMap(){
    axios.get('/api/kstoreinfos')
    .then(response => {
      this.setState({
        markers: response.data
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }


  // constructor(){
  //   super();
  //   this.state ={
  //     markers:[]
  //   }
  // }

  

    // componentWillMount() {
    //    this.setState({ markers: [] })
    //  }

    //  componentDidMount() {
    //       this.setState({ 
    //         markers : [
    //           {lat:35.894404,lng:128.623991,title:'mams',contents:'맘스터치 햄버거 진짜 먹을거 없을데 먹는다..',
    //           img:'https://www.breaknews.com/imgdata/breaknews_com/201901/2019010417281676.jpg'},
    //           {lat:35.892970,lng:128.622724,title:'pasta',contents:'비싸지만 맛있긴 한데 공간이 좁아서 자주 먹기는 힘들다..',
    //           img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRj47u3_9eCSZTrm8fw6WtxL29LE7Yx084TlMHtUWCW3dWjELRu&usqp=CAU'},
    //           {lat:35.893709,lng:128.620008,title:'Soup',contents:'할매국밥과 쌍벽을 이루는 국밥집이다...',img:'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190929090000801_photo_43fde11766ba.jpg'},
    //           {lat:35.894500,lng:128.619074,title:'pizza',contents:'피자의 도우나 피클이 다른 피자 집보다 인공적인 맛이 덜해서 맛있다..',img:'https://modo-phinf.pstatic.net/20170208_209/1486542594928y7y8N_PNG/mosa8nsDF6.png?type=w720'}
    //         ], 
    //       });
    // }



    // componentWillMount (){
    //   axios.get('/api/kstoreinfoweb').then(response => {
    //     this.setstate({
    //       markers:response.data
    //     });
    //   }).catch(errors =>{
    //     console.log(errors);
    //   })
    // }

    // componentWillMount(){
    //     this.setState({
    //        markers : []
    //     });
     
    // }
    

    // componentDidMount(){
    //   this.callApi()
    //     .then(res => this.setState({markers:res}))
    //     .catch(err => console.log(err));
    // }
    // callApi = async () => {
    //   const response = await fetch('/api/kstoreinfos');
    //   const body = await response.json();
    //   return body;
    // }



  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};


  render() {
    return (
    <div>
      <div class="mapbody" style={{
                                    width: '100%',
                                    height: '100vh',
                                    position: 'relative'
                                  }}>
      <Map
        google={this.props.google}
        zoom={17}
        style={mapStyles}
        initialCenter={{
          lat:35.895986,
          lng:128.621558
        }}>
          { this.state.markers.map(marker => (
           <Marker
              key={marker.keeper_store_id}
              position={{ lat: marker.keeper_store_latitude, lng: marker.keeper_store_longtitude}}
              title={marker.keeper_store_name}
              img={marker.keeper_store_imgurl}
              address={marker.keeper_store_address}
              onClick={this.onMarkerClick}
           />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div className="picture" style={{}}>
          <img src={this.state.selectedPlace.img} alt="home" width="100px" height="100px" />
          </div>
          <div className="title">
          <h4>{this.state.selectedPlace.title}</h4>
          </div>
          <div>
          <p>{this.state.selectedPlace.address}</p>
          </div>
        </InfoWindow>
      </Map>
      </div>
      <div class="sidebar " style={{
                    position: 'fixed',
                    top:'0',
                    left:'0',
                    width: '325px',
                    height: '200vh',
                    zindex: '1000',
                    background: '#CED8F6',
      }}>
      <div className="maps_header" style={{ marginLeft:'10px' }}>
          <a className="navbar-brand"><a href="/"><img src="./도코니모.png" alt="home" width="298px" height="60px" /></a></a>
      </div>
      {this.state.markers.map((marker)=>{
        return(
          <div className="row" style={{
            marginTop:'10px',
           
          }}>
            <div className="col-sm-5">
            <img src={marker.keeper_store_imgurl} alt="home" width="130px" height="100px" />
            </div>
            <div className="col-sm-7">
            <h5 >{marker.keeper_store_name}</h5>
            {marker.keeper_store_address}
            </div>
          </div>
        )
      })}
      </div>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDECK_bjebV3VBQVDNe1Lj08AoA0UZXrbU'
})(Maps);