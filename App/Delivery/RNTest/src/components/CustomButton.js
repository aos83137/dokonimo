import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: 'whitesmoke',
    titleColor: '#1C1C1C',
    marginBottom: 0,
    borderRadius:0,
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity style={[
        styles.button,
        {backgroundColor: this.props.buttonColor,marginBottom:this.props.marginBottom
        ,borderRadius:this.props.borderRadius}
        
      ]}
      onPress={this.props.onPress}>
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  title: {
    fontSize: 18,
  },
});