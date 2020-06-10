import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
  
  } from 'react-native'
import firebase from 'firebase'
import CustomButton from './CustomButton'

let id;
let name;
const url = 'https://my-project-9710670624.df.r.appspot.com';

export default class ComScreen extends React.Component{
    constructor(props){
        super(props)
    }
    push(){
        firebase.database().ref('/users/'+name).update({state:'push_luggage'});
        fetch(url+'/reservations/'+id,{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                reservation_status:'end_delivery',
            })
        }).then((res)=>res.json())
        .then((resJson)=>{
            console.log(resJson);
            
        }).catch(e=>{console.error(e);}
        )
    }
    end=()=>{
        firebase.database().ref('/users/'+name).set(null);
        this.props.navigation.navigate('딜리버리');

    }

    render(){

        const {reservation_id, user_name} = this.props.route.params
        id = reservation_id;
        name = user_name;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>배달 완료했습니다!</Text>
                {this.push()}
                <View style={styles.CButton}>
                    <CustomButton buttonColor={'#008388'}
                            titleColor={'#fff'} title = "홈" 
                    onPress={this.end} />
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
    text:{
        fontSize:20,
        margin:10,
    },
    CButton:{
        width: '30%',
        height:'8%',
    }
  });
  