import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
//prop-types : 타입 확인 라이브러리
import  Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    ScrollView ,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import colors from '../styles/colors';
import InputField from '../components/form/inputField';
import NextArrowButton from '../components/buttons/NextArrowButton';
import AsyncStorage from '@react-native-community/async-storage';
const url='sylvan-presence-280012.an.r.appspot.com';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formValid: true,
          validEmail: false,
          emailAddress: '',
          password: '',
          name:'',
          phone:'',
          validPassword: false,
          validName:false,
          validPhone:false,
          loadingVisible: false,
          userName:'',
          auth:false,
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }
    handleNextButton = async ()=>{
        try{
            const userEmail = this.state.emailAddress;
            const userName = userEmail.split('@')[0];
            const {validEmail,validName,validPassword,validPhone,emailAddress,password,name,phone}= this.state;


            if(validEmail==true && validName==true &&validPassword==true && validPhone==true){
              
              fetch('http://'+url+'/tourists',{
                  method: 'POST',
                  headers:{
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                    "tourist_name":name,
                    "tourist_email":emailAddress,
                    "tourist_password":password,
                    "tourist_phonenumber":phone,
                  })
              }).then((response)=>{
                  console.log('response',response);
                  console.log('투어리스트 저장 완료');

                  Alert.alert(
                    //Header
                    '회원가입 완료',
                    //title
                    '회원 가입이 완료 되었습니다. 도코니모를 이용할 수 있습니다.',
                    //footer button
                    [
                        {
                            text:'Ok',
                            onPress: ()=>{
                              this.props.navigation.navigate('Setting',{
                                stateTest:'Setting',
                              });
                            }
                        }
                    ]
                );
              }).catch((e)=>{
                  console.log(e);
              })
            }else{
              alert('다시한번 확인해 주세요');
            }

        }catch(e){
            console.error(e);
        }
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
    handleNameChange(name){
      const { validName } = this.state;

      this.setState({name});
      if(!validName){
        this.setState({validName:true});
      }else if(name.length <= 2){
        this.setState({validName:false});
      }
    }
    handlePhoneChange(phone){
      const phoneCheckRegex = /(\d{3}).*(\d{3}).*(\d{4})/;
      const { validPhone } = this.state;
      this.setState({phone});
      if(!validPhone){
        if (phoneCheckRegex.test(phone)) {
          this.setState({validPhone:true});
        }
      }else if(phoneCheckRegex.test(phone)){
        this.setState({validPhone:false});
      }
    }
    render(){
        const {
            formValid, loadingVisible, validEmail, validPassword, validPhone, validName
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
                          placeholder={'xxxx@xxxxxx.xxx'}
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
                            placeholder={'4글자 이상'}
                        />
                        <InputField
                            labelText={"NAME"}
                            labelTextSize={14}
                            labelColor={colors.white}
                            textColor={colors.white}
                            borderBottomColor = {colors.white}
                            inputType="text"
                            customStyle={{ marginBottom : 30 }}
                            onChangeText={this.handleNameChange}
                            showCheckmark={validName}
                            placeholder={'2글자 이상'}
                        />
                        <InputField
                            labelText={"PHONE NUMBER"}
                            labelTextSize={14}
                            labelColor={colors.white}
                            textColor={colors.white}
                            borderBottomColor = {colors.white}
                            inputType="email"
                            customStyle={{ marginBottom : 30 }}
                            onChangeText={this.handlePhoneChange}
                            showCheckmark={validPhone}
                            placeholder={'000-0000-0000'}
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
