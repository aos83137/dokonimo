import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
  
  } from 'react-native'


import ToggleButton from './ToggleButton'
import firebase from 'firebase'
import CustomButton from './CustomButton'
  

export default class HomeScreen extends React.Component{ 
    state={
        value:'',
        data:[],
    }
    constructor(props){
        super(props)
        this._onStateChange = this._onStateChange.bind(this)

    }
    _onStateChange(newState){
        const value = newState?"대기중":"배달안함"
        this.setState({toggleText:value})
        
    }
    
    componentDidMount(){
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyDaeJwtorHi3g-ytqU9bn5cjFhKO-2kbIE",
                authDomain: "maptest3-b3603.firebaseapp.com",
                databaseURL: "https://maptest3-b3603.firebaseio.com",
                projectId: "maptest3-b3603",
                storageBucket: "maptest3-b3603.appspot.com",
                messagingSenderId: "676243801867",
                appId: "1:676243801867:web:9a0db9a23c16846b04c40e",
                measurementId: "G-Y8XG5Y6V1D"
            });
        }

 
        firebase.database().ref('/users').on("value",snapshot=>{
            if(snapshot.forEach){
                const to = [];
                snapshot.forEach(
                    (data)=>{
                        const temp = data.val();
                        to.push(temp);
                        this.setState({data:to});
                   
                    }
                )
            }
      
        })

        
    }

    render(){
        const {toggleText} = this.state;
        const users = [];

        if(toggleText=="대기중"){
            if(this.state.data){
                for(i=0; i<this.state.data.length; i++){
                    const keeper ={
                        id:this.state.data[i].reservation_id+'번',
                        name:this.state.data[i].name,
                        user_latitude: this.state.data[i].user_latitude,
                        user_longitude: this.state.data[i].user_longitude,
                    }                 
                    users.push(keeper);
                    
                    
                }   

            }
        }

        return(
            <View style={styles.container}>
                <Text>안전 운전 하세요!</Text>
                <ToggleButton onStateChange={this._onStateChange}/>
                <View style={styles.footer}>
                {
                    users.map(value=>{
                        return(
                            <CustomButton title={value.id} 
                            
                            marginBottom={6}
                            buttonColor={'#008388'}
                            titleColor={'#fff'}
                            onPress={()=>this.props.navigation.navigate('Map',{reservation_id:value.id,user_name:value.name,user_latitude:value.user_latitude,user_longitude:value.user_longitude})}/>
                        );
                    })
                } 
                </View>
                
                        
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'whitesmoke',
  },
  footer:{
      width: '30%',
      height:'15%',
  }
});

