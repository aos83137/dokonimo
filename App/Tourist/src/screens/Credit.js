import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
//prop-types : 타입 확인 라이브러리
import  Icon from 'react-native-vector-icons/FontAwesome';
import { Button} from 'react-native-elements';
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
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const USE_LITE_CREDIT_CARD_INPUT = false;

export default class Credit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true, // will be true once all fields are "valid" (time to enable the submit button)
            values: { // will be in the sanitized and formatted form
                number: "5272 8951 8851 4144",
                expiry: "1123",
                cvc: "322",
                type: "master-card", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
                name: "JEON YONG SEOK",
            },
            status: {  // will be one of ["incomplete", "invalid", and "valid"]
              number: "incomplete",
              expiry: "incomplete",
              cvc: "incomplete",
              name: "incomplete", 
            },
          };
    }
    // _onChange => form => console.log(form);
    _onChange = formData => {
        /* eslint no-console: 0 */
        console.log(JSON.stringify(formData, null, " "));
        if(formData.valid){
            this.setState({
                values:formData.valid,
                status:formData.status,
                vaild:formData.valid,
            })
        }
      };
    _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
    };
    save = ()=>{
        Alert.alert(
            //Header
            '저장 완료.',
            //title
            '이제 키퍼 예약 밑 딜리버리 서비스 이용 시 간편하게 사용 가능합니다.',
            //footer button
        [
            {
                text:'Ok',
                onPress:()=>{
                    this.props.navigation.navigate('Setting');
                }
            }
        ])
    }
    render(){
        return (
            <View style={s.container}>
                <View style={s.header}>
                    <Text style={s.headerText}>
                        결제 정보
                    </Text>
                </View>
            { USE_LITE_CREDIT_CARD_INPUT ?
              (<LiteCreditCardInput
                  autoFocus
                  inputStyle={s.input}
    
                  validColor={"black"}
                  invalidColor={"red"}
                  placeholderColor={"darkgray"}
    
                  onFocus={this._onFocus}
                  onChange={this._onChange} />) :
                (<CreditCardInput
                    autoFocus
    
                    requiresName
                    requiresCVC
    
                    labelStyle={s.label}
                    inputStyle={s.input}
                    validColor={"black"}
                    invalidColor={"red"}
                    placeholderColor={"darkgray"}

                    onFocus={this._onFocus}
                    onChange={this._onChange} />)
            }
            <Button buttonStyle={s.button} type={'clear'} title={'저장'} onPress={this.save}/>
          </View>
        );
    }
}
const s = StyleSheet.create({
    container: {
      backgroundColor: "#F5F5F5",
      marginTop: 60,
      flex:1
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
    button:{
        marginTop:15,
    },
    header:{
        width:'100%',
        paddingLeft:10,
        marginBottom:20,
        alignItems:'center'
    },
    headerText:{
        width:'100%',
        fontSize:24,
        fontWeight:"bold",
    },
  });