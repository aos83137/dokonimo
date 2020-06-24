import React,{component, Component} from 'react';
import {View,Text, ScrollView, StyleSheet, TouchableHighlight,Alert} from 'react-native';
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
            Alert.alert(
                //Header
                'ログアウト',
                //title
                '本当にログアウトしますか?',
                //footer button
                [
                    {
                        text:'いいえ',
                        style: 'cancel',
                    },
                    {
                        text:'はい',
                        onPress: ()=>{
                        AsyncStorage.clear()
                        this.setState({auth:false})
                          this.props.navigation.navigate('Setting',{
                            stateTest:'Home',
                          });
                        }
                    }
                ]
            );  
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
                        <Text style={styles.text}>会員登録</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight  onPress={
                    ()=>{
                        this.props.navigation.navigate('LogIn')
                    }
                }>
                    <View style={styles.content}>
                        <Text style={styles.text}>ログイン</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>                     
            </View>
        }else{
            authLoginView=
            <>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Credit')}}>
                    <View style={styles.content}>
                        <Text style={styles.text}>クレジットカード登録</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={
                    ()=>{
                        this.removeValue();   
                                                                       
                    }
                }>
                    <View style={styles.content}>
                        <Text style={styles.text}>ログアウト</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                    </View>
                </TouchableHighlight>
            </>
        }
        
        return(
            <ScrollView style={styles.container} stickyHeaderIndices ={[0]} >
                <View style={styles.titleContent}>
                    <Text style={styles.headerText}>設定</Text>
                </View>
                <View style={styles.wrapContent}>
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>認証</Text>
                        </View>
                        {
                            authLoginView
                        }                      
                    </View>                    
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>基本設定</Text>
                        </View> 
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>通知受信</Text>
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
                                <Text style={styles.text}>言語設定</Text>
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
                                <Text style={styles.text}>禁止品目</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>支援チームに連絡</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.subTitleContent}>
                            <Text style={styles.text}>このアプリについて</Text>
                        </View>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>お知らせ</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>    
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>禁止品目</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>支援チームに連絡</Text>
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