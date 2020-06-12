import React from 'react';
import {
    Text,
    AppRegistry,
    StyleSheet,
    View,
    FlatList
  
} from 'react-native'


const url = 'hhttps://sylvan-presence-280012.an.r.appspot.com';
export default class MScreen extends React.Component{
  constructor(){
    super()
    this.state={
      dataSource:[],
      end:[],
    }
  }
  
  renderItem = ({item}) =>{
    return(
      <View style={{flex:1,marginBottom:3,width:'100%'}}>
        <View style={{flex:1,justifyContent:'center'}}>
          <Text style={styles.item}>
            {item.id}   {item.name}   {item.state}
          </Text>
        </View>
    </View>
    )
    

  }

  componentDidMount(){
    fetch(url+'/rktshow')
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        dataSource:responseJson
      })
     
    })
    .catch((error)=>{
      console.log(error)
    })

    
  }

  render(){
    
      const to = [];
      this.state.dataSource.forEach(
        (data)=>{
          
          if(data.reservation_status=='end_delivery'){
            console.log('end');
            const ends ={
              id:data.reservation_id+'번',
              name:data.keeper_store_name,
              state:'배달완료'
            }
            to.push(ends);

          }

        }
      )
      return(
        <View style={styles.container}>
          <FlatList
            data={to}
            renderItem={this.renderItem}
            />
        </View>
      );
  }
    
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
    
  },
  item:{
    marginTop:15,
    padding:25,
    backgroundColor:'#BBD4D8',
    fontSize:19,   
  }
})