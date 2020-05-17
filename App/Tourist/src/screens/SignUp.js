<<<<<<< HEAD
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
//prop-types : 타입 확인 라이브러리
import  Icon from 'react-native-vector-icons/FontAwesome';
import {
    Alert,
    View,
    Text,
    ScrollView ,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
import NextArrowButton from '../components/buttons/NextArrowButton';
import AsyncStorage from '@react-native-community/async-storage';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formValid: true,
          validEmail: false,
          name:'',
          phone_number:'',
          emailAddress: '',
          password: '',
          validPassword: false,
          loadingVisible: false,
          userName:'',
          auth:false,
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }
    handleNextButton = ()=>{
      Alert.alert(
        //Header
        '회원가입',
        //title
        '회원가입이 완료 되었습니다.',
        //footer button
        [
            {
                text:'Ok',
                onPress: ()=>{
                  this.props.navigation.navigate('Setting',{
                    'auth':true,
                  });
                }
            }
        ]
    );
        console.log('Done.');
    }
    handleEmailChange(email) {
        // eslint-disable-next-line
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validEmail } = this.state;
        this.setState({ emailAddress: email });
    
        if (!validEmail) {
          if (emailCheckRegex.test(email)) {
            this.setState({ validEmail: true });
          }
        } else if (!emailCheckRegex.test(email)) {
          this.setState({ validEmail: false });
        }
      }
      handlePasswordChange(password) {
        const { validPassword } = this.state;
    
        this.setState({ password });
    
        if (!validPassword) {
          if (password.length > 4) {
            // Password has to be at least 4 characters long
            this.setState({ validPassword: true });
          }
        } else if (password <= 4) {
          this.setState({ validPassword: false });
        }
      }
    render(){
        const {
            formValid, loadingVisible, validEmail, validPassword,
          } = this.state;
        return (
            <KeyboardAvoidingView 
                style={styles.wrapper}
                //behavior 키보드에 숨겨진 다음 버튼을 수정해야합니다 
                behavior="padding"
                >
                <View
                    style={styles.scrollViewWrapper}
                >
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.loginHeader}>
                            회원가입
                        </Text>
                        <InputField
                            labelText={"EMAIL"}
                            labelTextSize={14}
                            labelColor={colors.white}
                            textColor={colors.white}
                            borderBottomColor = {colors.white}
                            inputType="email"
                            customStyle={{ marginBottom : 30 }}
                            onChangeText={this.handleEmailChange}
                            showCheckmark={validEmail}
                            />
                        <InputField
                            labelText={"PASS WORD"}
                            labelTextSize={14}
                            labelColor={colors.white}
                            textColor={colors.white}
                            borderBottomColor = {colors.white}
                            inputType="password"
                            customStyle={{ marginBottom : 30 }}
                            onChangeText={this.handlePasswordChange}
                            showCheckmark={validPassword}
                        />
                        <InputField
                          labelText={"NAME"}
                          labelTextSize={14}
                          labelColor={colors.white}
                          textColor={colors.white}
                          borderBottomColor = {colors.white}
                          inputType="email"
                          customStyle={{ marginBottom : 30 }}
                          onChangeText={e=>this.setState({name:e})}
                          showCheckmark={validEmail}
                          />
                        <InputField
                          labelText={"PHONE NUMBER"}
                          labelTextSize={14}
                          labelColor={colors.white}
                          textColor={colors.white}
                          borderBottomColor = {colors.white}
                          inputType="email"
                          customStyle={{ marginBottom : 30 }}
                          onChangeText={e=>this.setState({phone_number:e})}
                          showCheckmark={validEmail}
                          />
                    </ScrollView>
                    <View style={styles.nextButton}>
                        <NextArrowButton
                            handleNextButton={this.handleNextButton}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{
        display : 'flex',
        flex: 1,
        backgroundColor:colors.green01,
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    scrollView:{
        paddingLeft :30,
        paddingRight: 30,
        paddingTop: 20,
        flex:1,
    },
    loginHeader:{
        fontSize:30,
        color: colors.white,
        fontWeight: '300',
        marginBottom:40,
    },
    nextButton:{
        //flex-end 이거하면 스크롤해도 밑에 고정임
        alignItems: 'flex-end',
        right : 20,
        bottom: 20,
    }

});
=======
// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log(this.props.navigation);
      
      this.props.navigation.navigate('Setting');
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
>>>>>>> 10b52aece0c4c59ff744ea3b38fe26d0543880fe
