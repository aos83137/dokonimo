import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
  
  } from 'react-native'


import ToggleButton from './ToggleButton'
  

export default class HomeScreen extends React.Component{ 
    state={
        value:''
    }
    constructor(props){
        super(props)
        this._onStateChange = this._onStateChange.bind(this)

    }
    _onStateChange(newState){
        const value = newState?"대기중":"배달안함"
        this.setState({toggleText:value})
    }
    

    render(){
        const {toggleText} = this.state;
        let button;
        if(toggleText=="대기중"){
            button = <Button title="키퍼있는 곳"
            onPress={()=>this.props.navigation.navigate('Map')} />
        }
        return(
            <View style={styles.container}>
                <Text>안전 운전 하세요!</Text>
                <ToggleButton onStateChange={this._onStateChange}/>
                {button}
                             
                
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
  button:{
      backgroundColor:'#f4511e',
  }
});

