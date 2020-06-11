import React from 'react';
import {
    Text,
    AppRegistry,
    StyleSheet,
    View,
    FlatList
  
} from 'react-native'


const url = 'https://my-project-9710670624.df.r.appspot.com';
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
            {item.id}  {item.state}
          </Text>
        </View>
    </View>
    )
    

  }

  componentDidMount(){
    fetch(url+'/reservations')
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
          console.log(data);
          if(data.reservation_status=='end_delivery'){
            const ends ={
              id:data.reservation_id+'번',
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
    marginTop:20,
    padding:25,
    backgroundColor:'#BBD4D8',
    fontSize:16,

    
  }
})