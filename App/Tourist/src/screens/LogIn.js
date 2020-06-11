import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
//prop-types : 타입 확인 라이브러리
import  Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    ScrollView ,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Dimensions,
} from 'react-native';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
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
          validPassword: false,
          loadingVisible: false,
          userName:'',
          auth:false,
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    handleNextButton = async ()=>{
        try{
            const {emailAddress,password} = this.state;
            // const userName = emailAddress.split('@')[0];
            let checkEmail = false;
            let checkPasswd = false;
            let userName;
            await fetch('http://'+url+'/tourists',{
                method:"GET",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            }).then((response)=>{
                return response.json()
            })
            .then((responseJson)=>{
                console.log(responseJson);
                
                responseJson.forEach(tourist => {
                    console.log('email :',tourist.tourist_email,'// passwd :',tourist.tourist_password);
                    if(tourist.tourist_email == emailAddress){
                        checkEmail = true;
                        userName=tourist.tourist_name;
                        console.log(tourist.tourist_name);
                        
                    }else{
                    }
                    if(tourist.tourist_password == password){
                        checkPasswd = true;
                    }else{
                    }
                });

                //이메일 비번 둘다 일치 할때
                if(checkEmail && checkPasswd){
                    console.log('로그인');
                    AsyncStorage.setItem('aysn',true);
                    AsyncStorage.setItem('userToken',userName);

                    Alert.alert(
                        //Header
                        '로그인 완료',
                        //title
                        '도코니모를 사용하실 수 있습니다.',
                        //footer button
                        [
                            {
                                text:'Ok',
                                onPress: ()=>{
                                  this.props.navigation.navigate('Setting',{
                                    stateTest:'Home',
                                  });
                                }
                            }
                        ]
                    );
                }else if(checkEmail==false){
                    console.log('이메일 불일치');
                    alert('존재하지 않는 이메일 입니다.');
                }else if(checkPasswd==false){
                    console.log('패스워드 불일치');
                    alert('패스워드 불일치');                }
            })
            .catch(e=>console.log(e));

        }catch(e){
            console.error(e);
        }

        
        // await AsyncStorage.setItem('userToken',userName);
            
        // alert('로그인 완료');
        // this.props.navigation.navigate('Setting',{
        //     'auth':true,
        // });
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
                            로그인
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
