import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity
  
} from 'react-native'

import CustomButton from './CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../cons/Context'


const LoginScreen = ({navigation}) =>{ 

    const [data,setData] = React.useState({
        username:'',
        password:'',
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
  
    const {signIn} = React.useContext(AuthContext);

    const loginHandle = (username, password) =>{
        signIn(username,password);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text_header}>Login To Delivery App</Text>
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
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    
                />
                {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn">
                        <Feather 
                            name="check-circle"
                            color="blue"
                            size={20}
                        />
                    </Animatable.View>
                : null}
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
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                  <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="blue"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="blue"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                </Animatable.View>
            }

            <View style={styles.button}>
                <CustomButton title='로그인' buttonColor={'#BBD4D8'} borderRadius={8} 
                onPress={()=>{loginHandle( data.username,data.password )}} />
            </View>
            <View style={styles.button}>
                <CustomButton title='회원가입' buttonColor={'#BBD4D8'} borderRadius={8}
                onPress={()=>navigation.navigate('Signup')}/>
            </View>
        </View>
    );
}


export default LoginScreen;

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
        marginLeft:'14%'
    },
    text_pass: {
        color: '#fff',
        fontSize: 18,
        marginEnd:'3%',
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