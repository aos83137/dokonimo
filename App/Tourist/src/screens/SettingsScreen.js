import React,{component, Component} from 'react';
import {View,Text, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
let value;
export default class SettingsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            userEmail:'',
            auth:false,
        };
    }
    componentDidMount=async()=>{
        try{
            const value = await AsyncStorage.getItem('userToken');
            console.log(value);
            if(value){
                this.setState({auth:true});
            }
        }catch(e){

        }
    }
    UNSAFE_componentWillReceiveProps= async() =>{
        try{
            value = await AsyncStorage.getItem('userToken')
            console.log(value);

            if(value){
                this.setState({auth:true})    
            }
        }catch(e){

        }
    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken')
          console.log(value);
          
          if(value !== null) {
            // value previously stored
          }
          this.setState({auth:true})
        } catch(e) {
          // error reading value
        }
    } 
    removeValue = async () => {
        try {
            await AsyncStorage.clear()
            this.setState({auth:false})
          } catch(e) {
            // clear error
            console.error(e);
            
          }
        
          console.log('Done.')
    }
    render(){
        // const auth = this.getData();
        // console.log(auth);
        
        let authLoginView;
        if(!this.state.auth){
            authLoginView = 
            <View>
                <TouchableHighlight onPress={
                    ()=>{
                        this.props.navigation.navigate('SignUp');
                        console.log(this.state.auth);

                    }
                }>
                    <View style={styles.content}>
                        <Text style={styles.text}>회원가입</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight  onPress={
                    ()=>{
                        this.props.navigation.navigate('LogIn')
                    }
                }>
                    <View style={styles.content}>
                        <Text style={styles.text}>로그인</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>                     
            </View>
        }else{
            authLoginView=
            <>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Credit')}}>
                    <View style={styles.content}>
                        <Text style={styles.text}>결제 정보</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={
                    ()=>{
                        this.removeValue();                                
                    }
                }>
                    <View style={styles.content}>
                        <Text style={styles.text}>로그아웃</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
            </>
        }
        
        return(
            <ScrollView style={styles.container} stickyHeaderIndices ={[0]} >
                <View style={styles.titleContent}>
                    <Text style={styles.headerText}>설정</Text>
                </View>
                <View style={styles.wrapContent}>
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>인증</Text>
                        </View>
                        {
                            authLoginView
                        }                      
                    </View>                    
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>기본설정</Text>
                        </View> 
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>알림</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>GPS</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>언어설정</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>Help</Text>
                        </View>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>FAQ</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>금지 품목</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>지원팀으로 연락</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>이 앱에 관하여</Text>
                        </View>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>공지</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>    
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>금지 품목</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>지원팀으로 연락</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>           
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapContent: {
        width: '100%',
        height: '100%',
    },
    titleContent: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        flex:1,
        alignItems:'center',
        padding:'2%',
    },
    subTitleContent:{
        paddingLeft:'4%',
        padding:'1.5%',
        backgroundColor:'#AAA',
    },
    content:{
        paddingLeft:'4%',
        padding:'3%',
        paddingBottom:'-3%',
        borderBottomWidth:1,
        borderBottomStartRadius:20,
        borderBottomRightRadius:20,
        borderBottomWidth:0.3,
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    headerText:{
        fontSize :24,
        fontWeight:'bold',
        color:colors.title,
    },
    text:{
        fontSize :18,
        color:colors.title,
    }
})