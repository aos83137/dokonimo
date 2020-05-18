import React, { Component } from 'react';
import colors from '../../styles/colors'
import { 
    StyleSheet,
    Text, 
    View,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/Fontisto';


const FS = 14;

export const SearchMenu = function(props){

    
    const getFormatDate = date=>{
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let hour = date.getHours();                 //h
        let min = date.getMinutes();                //m
        if(min<10) min = '0' + min;
        return  '' + month + '/' + day + ' ' + hour+':'+min;
    }

    const goPlace = props.goPlace ? props.goPlace :()=> console.log('여기는 콜백 위치 검색 이벤트지');
    const goDate = props.goDate ? props.goDate : ()=> console.log('여기는 콜백 날짜 이벤트지');
    const checkIn = props.checkIn ? getFormatDate(props.checkIn) : getFormatDate(new Date());
    const checkOut = props.checkOut ? getFormatDate(props.checkOut):getFormatDate(new Date());
    const bagCnt = props.bagCnt?props.bagCnt:0;
    const carrCnt = props.carrCnt?props.carrCnt:0;
    const whereLocation = props.inputText?props.inputText:'검색';
    // console.log('여기는 서치메뉴 프롭스:'+props.inputText);
    
    const date = checkIn+ ' - ' + checkOut;

        return(
            <View style = {styles.container}>
                <TouchableHighlight style={styles.titleSearchButton} onPress={()=> goPlace()} >
                    <View style={styles.elem}>
                        <Icon
                            name = "search"
                            color={colors.green01}
                            size={24}
                            style={styles.icon}
                        />
                        <Text style={styles.titleText}>{whereLocation}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.titleSearchButton} onPress={()=> goDate()}>
                    <View style={styles.elem}>
                        <View style={styles.calendarView}>
                            <Icon
                                name="calendar"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}>
                                {date}
                            </Text>
                        </View>
                        <View style={styles.luggageView}>
                            <Icon4
                                name="card-travel"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}> x{bagCnt}</Text>
                            <Icon5
                                name="suitcase"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}> x{carrCnt}</Text>
                        </View>
                    </View>
                </TouchableHighlight>             
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(255,255,255,1)',
        marginTop:'5%',
        width:"100%",
        borderRadius:5,
        borderColor:colors.round01,
        borderWidth:1.7,
    },
    titleSearchButton:{
        width:"100%",
        alignItems: 'stretch',
    },
    elem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'stretch',
        padding:"3%",
    },
    icon:{
        marginLeft:5,
    },
    titleText:{
        color: colors.green01,
        fontSize:FS,
        paddingLeft:5,
        marginTop:3,
    },
    luggageView:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end'
    },
    calendarView:{
        flexDirection:'row',
        flex:4,
    },
})