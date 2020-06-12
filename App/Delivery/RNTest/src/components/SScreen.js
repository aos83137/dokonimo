import React from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import CustomButton from './CustomButton'
import {AuthContext} from '../cons/Context'

const SScreen =()=>{
 
  const {signOut} = React.useContext(AuthContext);

    return(
      <View style={styles.container}>
        <Text style={styles.text}>설정</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.text2}>인증</Text>
          <View style={styles.button}>
            <CustomButton title="계좌 등록"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="로그아웃" 
            onPress={()=>{signOut()}}/>
          </View>
          <Text style={styles.text2}>기본 설정</Text>
          <View style={styles.button}>
            <CustomButton title="알림"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="GPS"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="언어설정"/>
          </View>
          <Text style={styles.text2}>Help</Text>
          <View style={styles.button}>
            <CustomButton title="FAQ"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="금지 품목"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="지원팀으로 연락"/>
          </View>
          <Text style={styles.text2}>이 앱에 관하여</Text>
          <View style={styles.button}>
            <CustomButton title="공지"/>
          </View><View style={styles.button}>
            <CustomButton title="금지 품목"/>
          </View><View style={styles.button}>
            <CustomButton title="지원팀으로 연락"/>
          </View>
          
        </ScrollView>
      </View>
      
    );
}

export default SScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  scroll:{
    width:"100%"
  },
  text:{
      fontSize:23,
      padding:'1%'
      
  },
  text2:{
    flex:1,
    fontSize:20,
    padding:'2%',
    backgroundColor:'#BDBDBD',

  },
  button:{
    height:39,
    borderBottomWidth:1
  }
});