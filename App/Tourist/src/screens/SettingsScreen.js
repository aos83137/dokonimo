import React,{component, Component} from 'react';
import {View,Text, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen =(props)=>{
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
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>Sign Up</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={styles.content}>
                                <Text style={styles.text}>Login</Text>
                                <Icon name="keyboard-arrow-right" size={30} color={colors.gray}/>
                            </View>
                        </TouchableHighlight>                     
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

export default SettingsScreen;