import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    AsyncStorage
  
} from 'react-native'

import CustomButton from './CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const url =  'https://sylvan-presence-280012.an.r.appspot.com';
const SignupScreen = ({navigation}) => { 


  

    const [data,setData] = React.useState({
        username:'',
        password:'',
        email:'',
        phon:'',
        car:'',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
 

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true

            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
      
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
    
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
      
            });
        }
    }

    const Inputemail = (val) => {
        setData({
            ...data,
            email: val,

        });
    }

    const InputPhonenumber = (val) => {
        setData({
            ...data,
            phon: val,

        });
    }

    const InputCar = (val) => {
        setData({
            ...data,
            car: val,

        });
    }


    const signupbutton = () =>{
        fetch(url+'/deliverys',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                delivery_name:data.username,
                delivery_phonenumber:data.phon,
                delivery_email:data.email,
                delivery_car:data.car,
                delivery_password:data.password
            })
        }).then((res)=>res.json())
        .then((resJson)=>{
            console.log(resJson);
            
        }).catch(e=>{console.error(e);}
        )

        navigation.navigate('Login');
    }

 

    return(
        <View style={styles.container}>
            <Text style={styles.text_header}>Sign up To Delivery App</Text>
            <View style={styles.action}>
                <Text  style={styles.text_email}>Name</Text>
                <FontAwesome 
                    name="user-o"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                    placeholder="Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    
                    
                    
                />
            </View>
            { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                </Animatable.View>
            }
            
            <View style={styles.action }>
                <Text  style={styles.text_pass}>Password</Text>
                <Feather 
                    name="lock"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                    placeholder="Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
            </View>
            { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                </Animatable.View>
            }

            <View style={styles.action}>
                <Text  style={styles.text_email}>Email</Text>
                <Feather 
                    name="mail"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                    placeholder="Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    
                    onChangeText={(val) => Inputemail(val)}
                />
            </View>
            <View style={styles.action }>
                <Text  style={styles.text_phon}>Phonenumber</Text>
                <Feather 
                    name="phone"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                    placeholder="Phonenumber"
                    style={styles.textInput}
                    autoCapitalize="none"
                    
                    onChangeText={(val) => InputPhonenumber(val)}
                />
            </View>
            <View style={styles.action}>
                <Text  style={styles.text_pass}>Car_Name</Text>
                <FontAwesome 
                    name="car"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                    placeholder="Car_Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    
                    onChangeText={(val) => InputCar(val)}
                />
            </View>

            
            <View style={styles.button}>
                <CustomButton title='회원가입' buttonColor={'#BBD4D8'} borderRadius={8}
                onPress={()=>{signupbutton()}} />
            </View>

            <View style={styles.button}>
                <CustomButton title='로그인' buttonColor={'#BBD4D8'} borderRadius={8} 
                onPress={()=>navigation.navigate('Login')}/>
            </View>
        </View>
    );
    


}
export default SignupScreen;


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#008388',
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 4,
        marginTop:'4%'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center',
        margin:25,
    },
    text_email: {
        color: '#fff',
        fontSize: 18,
        marginEnd:'3%',
        marginLeft:'20%'
    },
    text_pass: {
        color: '#fff',
        fontSize: 18,
        marginEnd:'3%',
        marginLeft:'11%'
    },
    text_phon: {
        color: '#fff',
        fontSize: 18,
        marginEnd:'2%',
        marginLeft:'5%'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
        
    },
    button:{
        width: '60%',
        height:'8%',
        marginTop:'4%'
    },
    errorMsg: {
        color: 'yellow',
        fontSize: 14,
    },
 
  });