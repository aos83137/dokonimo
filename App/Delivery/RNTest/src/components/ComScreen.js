import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
  
  } from 'react-native'
export default class ComScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>배달 완료했습니다!</Text>
                <Button title = "홈" 
                onPress={()=>this.props.navigation.navigate('딜리버리')}></Button>
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
    text:{
        fontSize:20,
    }
  });
  