import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
  
  } from 'react-native'

export default class ToggleButton extends React.Component{ 
    state={
        toggle:false
    }
    _onPress(){
    const newState = !this.state.toggle;
    this.setState({toggle:newState})
    this.props.onStateChange && this.props.onStateChange(newState)
    }
    render(){
    const {toggle} = this.state;
    const textValue = toggle?"大気中":"配達しません";
        return(
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
            onPress={()=>this._onPress()}
            style={{margin:50,flex:1,height:60,backgroundColor:'#008388',justifyContent:'center'}}>
                <Text style={{color:'white',textAlign:'center',fontSize:20}}>{textValue}</Text>
            </TouchableOpacity>
            </View>
        
        );
    }
}



