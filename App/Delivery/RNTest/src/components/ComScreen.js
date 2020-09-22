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
const url = 'https://sylvan-presence-280012.an.r.appspot.com';

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
        firebase.database().ref('/users/'+name).set({delivery_latitude:null,delivery_longitude:null});

        fetch('https://fcm.googleapis.com/fcm/send',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAnXNFhws:APA91bH5gDeGFgVYolbkdx44qnOyYadDP1-xst1-tkUYlWHXqC3Lropg4GIPwqnD8-fG8kmT6yzCh8ueY1rnvSYSrVokqfMRWOLexTF87JK_2cETW8RkT2oA9r13k8FLnG0IAHGBYqsc'
            },
            body:JSON.stringify(
                {
                    //여기 토큰을 딜리버리꺼로 바꾸면 될듯
                    "to":"/topics/tourist",
                    "priority":"high",
                    "notification":{
                        "body":"キーパーに渡すのを完了しました。",
                        "title":"デリバリー到着"
                    }, 
                    "data":{
                        "title": "デリバリー到着",
                        "message":"キーパに渡すのを完了しました。"
                    }
                }
            )
        });

        this.props.navigation.navigate('딜리버리');

    }

    render(){

        const {reservation_id, user_name} = this.props.route.params
        id = reservation_id;
        name = user_name;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>配達完了しました!</Text>
                {this.push()}
                <View style={styles.CButton}>
                    <CustomButton buttonColor={'#008388'}
                            titleColor={'#fff'} title = "ホーム" 
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
  