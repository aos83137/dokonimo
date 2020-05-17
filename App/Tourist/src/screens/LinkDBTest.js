import React, {useState, useEffect} from 'react';
import {  Button, View, Text,TextInput, Alert,StyleSheet ,TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Input } from 'react-native-elements';
// http://192.168.0.2:8000/user
// const url = '192.168.0.2:8000';
const url = 'my-project-9710670624.df.r.appspot.com';
const LinkDBTest = (props)=>{   
 
//navi
    const ViewUsersList=()=>{
        props.navigation.navigate('List')
    }
    const Stack = createStackNavigator();
//navi

    const InputScreen = () => {
        const [TextInputName, setTextInputName] = useState('Useless Placeholder');
        const [TextInputEmail, setTextInputEmail] = useState('Useless Placeholder');
        const [TextInputPhoneNumber, setTextInputPhoneNumber] = useState('Useless Placeholder');

        const InsertUser=()=>{
            
            //fetch(url,콜백함수)
            fetch('http://'+url+'/user',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name: TextInputName,
                    email: TextInputEmail,
                    phone_number: TextInputPhoneNumber,
                })
            }).then((response)=> {
                return response.json()
            })
            .then((responseJson)=>{
                Alert.alert(responseJson);
            }).catch((error)=>{
                console.error(error);
            });
        }
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder='Enter Name'
                    onChangeText={TextInputValue=>setTextInputName(TextInputValue)}
                    // underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle2}
                />
                <TextInput
                    placeholder='Enter Email'
                    onChangeText={TextInputValue=>setTextInputEmail(TextInputValue)}
                    underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle}
                />
                <TextInput
                    placeholder='Enter PhoneNumber'
                    onChangeText={TextInputValue=>setTextInputPhoneNumber(TextInputValue)}
                    underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle}
                />
                <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={InsertUser}>
                    <Text style={styles.TextStyle}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={ViewUsersList}>
                    <Text style={styles.TextStyle}>List</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const ViewDatauser =()=>{
        const [isLoding, setIsLoding] = useState(true);
        const [dataSource, setDataSource] = useState({})

        useEffect(()=>{
            fetch('http://'+url+'/user')
            .then((response)=>response.json())
            .then((responseJson)=>{
                setIsLoding(false);
                setDataSource(responseJson);
            }).catch((error)=>{
                console.error(error);
        })
        },[])
        // console.log('여기는 바깥! : '+ JSON.stringify(dataSource));
        
        
        if(isLoding){
            return(
                <View style={{ flex:1, paddingTop:20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        const Action_Click=(id,name,email,phone_number)=> {
            props.navigation.navigate('ViewInfo',{
                id,
                name,
                email,
                phone_number
            })
        }
        console.log('test');
        
        console.log(dataSource[0]);
        
        return(
            <View style={styles.containerDataUsers}>
                <FlatList
                    data = {dataSource}
                    renderItem ={(rowData)=>(
                        <TouchableOpacity
                            key={rowData.item.id}
                            onPress ={Action_Click.bind(this,
                                rowData.item.id,
                                rowData.item.name,
                                rowData.item.email,
                                rowData.item.phone_number,
                                )}
                            style={[
                                styles.item,
                                { backgroundColor: rowData.selected ? '#6e3b6e' : '#f9c2ff' },
                            ]}
                            >
                            <View style={styles.rowViewContainer}>
                                <Text style={styles.text}>
                                    {rowData.index+1+' - '+rowData.item.name}
                                                                    </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    const ViewInfoScreen =(props)=>{
        const [TextInputId, setTextInputId] = useState('Useless Placeholder');
        const [TextInputName, setTextInputName] = useState('Useless Placeholder');
        const [TextInputEmail, setTextInputEmail] = useState('Useless Placeholder');
        const [TextInputPhoneNumber, setTextInputPhoneNumber] = useState('Useless Placeholder');        

        useEffect(()=>{
            setTextInputId(props.route.params?.id);
            setTextInputName(props.route.params?.name);
            setTextInputEmail(props.route.params?.email)
            setTextInputPhoneNumber(props.route.params?.phone_number)
        },[])

        const UpdateUsers= ()=>{
            fetch('http://'+url+'/user/'+TextInputId,{
                method: 'PATCH',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    //restfull하게 만들어서 body필요 없기 때문에 주석처리했음
                    // id : TextInputId,
                    name:TextInputName,
                    email:TextInputEmail,
                    phone_number:TextInputPhoneNumber,
                })
            }).then((response)=> response.json())
            .then((responseJson)=>{
                // Alert.alert(responseJson);
                props.navigation.navigate('List');
            }).catch((error)=>{
                console.error(error);
            }); 
        }

        // const ListViewItemSepartor
        const DeleteUsers = ()=>{
            fetch('http://'+url+'/user/'+TextInputId,{
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                //restfull하게 만들어서 body필요 없기 때문에 주석처리했음
                // body: JSON.stringify({
                //     id : TextInputId,
                // })
            }).then((response)=> response.json())
            .then((responseJson)=>{
                Alert.alert(responseJson);
                props.navigation.navigate('List')
            }).catch((error)=>{
                console.error(error);
            });        
        }
        
        return(
            <View style={styles.container}>
                <TextInput
                    value={TextInputName}
                    placeholder='Enter Name'
                    onChangeText={TextInputValue=>setTextInputName(TextInputValue)}
                    // underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle2}
                />
                <TextInput
                    value={TextInputEmail}
                    placeholder='Enter Email'
                    onChangeText={TextInputValue=>setTextInputEmail(TextInputValue)}
                    underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle}
                />
                <TextInput
                    value={TextInputPhoneNumber}
                    placeholder='Enter PhoneNumber'
                    onChangeText={TextInputValue=>setTextInputPhoneNumber(TextInputValue)}
                    underlineColorAndroid = 'transparent'
                    style={styles.textInputStyle}
                />
                <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={UpdateUsers}>
                    <Text style={styles.TextStyle}>UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={DeleteUsers}>
                    <Text style={styles.TextStyle}>DELETE</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="InputS" component={InputScreen} />
            <Stack.Screen name="List" component={ViewDatauser}/>
            <Stack.Screen name="ViewInfo" component={ViewInfoScreen}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        marginTop:5,
        backgroundColor:'#fff',
    },
    textInputStyle:{
        textAlign:'center',
        marginBottom:7,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ff5722'
    },
    textInputStyle2:{
        textAlign:'center',
        marginTop:20,
        marginBottom:7,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ff5722'
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },
    TouchableOpacityStyle:{
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        margin:7,
        width:'90%',
        backgroundColor : '#00BCD4'
    },
    TouchableOpacityStyle2:{
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        margin:7,
        width:'90%',
        backgroundColor : '#FF5722'
    },
    containerDataUsers:{
        paddingTop: 30,

    },
    rowViewContainer:{
        flex: 1, 
        borderBottomWidth : 1,
        borderColor: '#3212f6',
        paddingTop:20,
        paddingBottom:8,
    },
    text:{
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color:"gray",
    }
})
export default LinkDBTest;