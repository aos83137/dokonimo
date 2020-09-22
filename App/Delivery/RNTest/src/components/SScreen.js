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
        <Text style={styles.text}>設定</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.text2}>認証</Text>
          <View style={styles.button}>
            <CustomButton title="口座登録"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="ログアウト" 
            onPress={()=>{signOut()}}/>
          </View>
          <Text style={styles.text2}>基本設定</Text>
          <View style={styles.button}>
            <CustomButton title="知らせ"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="GPS"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="言語設定"/>
          </View>
          <Text style={styles.text2}>Help</Text>
          <View style={styles.button}>
            <CustomButton title="FAQ"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="禁止品目"/>
          </View>
          <View style={styles.button}>
            <CustomButton title="支援チームに連絡"/>
          </View>
          <Text style={styles.text2}>このアプリに関して</Text>
          <View style={styles.button}>
            <CustomButton title="案内"/>
          </View><View style={styles.button}>
            <CustomButton title="禁止品目"/>
          </View><View style={styles.button}>
            <CustomButton title="支援チームに連絡"/>
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