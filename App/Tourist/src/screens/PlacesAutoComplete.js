import React , {Component} from 'react';
import {Text ,View, Image, StyleSheet} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { log } from 'react-native-reanimated';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class PlacesAutoComplete extends Component{
    render(){
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GooglePlacesAutocomplete
              placeholder='지역 검색'
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              // listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              // renderDescription={row => row.description} // custom description render
              onPress={(inputData, placeData = null) => { // 'details' is provided when fetchDetails = true
                // console.log('data : '+JSON.stringify(data));
                // console.log('details : '+JSON.stringify(details));
                
                this.props.route.params?._map.animateToRegion({
                  latitude: placeData.geometry.location.lat,
                  longitude: placeData.geometry.location.lng,
                  latitudeDelta: 0.045,
                  longitudeDelta: 0.045,
                })

                this.props.navigation.navigate('Home',{inputData,placeData});                
              }}
              
              getDefaultValue={() => ''}
        
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBayvtNmfr3CKZV9lZaUZSyzL3NPYQEq98',
                language: 'ko', // language of the results
                types: '(regions)' // default: 'geocode'
              }}
        
              styles={{
                textInputContainer: {
                  width: '100%'
                },
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
              }}
        
              // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              // currentLocationLabel="Current location"
              // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              // GoogleReverseGeocodingQuery={{
              //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              // }}
              // GooglePlacesSearchQuery={{
              //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              //   rankby: 'distance',
              //   type: 'cafe'
              // }}
              
              // GooglePlacesDetailsQuery={{
              //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              //   fields: 'formatted_address',
              // }}
        
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              // predefinedPlaces={[homePlace, workPlace]}
            
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
              // renderRightButton={() => }
            />
          </View>
        );
    }
}