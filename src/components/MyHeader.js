import React from 'react'
import {View,Button,Text,Image,TouchableOpacity} from 'react-native';
import Colors from '../ColorCodes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
function MyHeader(props) {
    console.log(props,"props")
    return (
        <View style = {{height:'10%',backgroundColor:Colors.themeColor,flexDirection:'row',marginTop:20,paddingTop:18,width:'100%'}}>
        <View style={{height:'100%',width:'15%',justifyContent:'center',paddingLeft:'5%'}}>
        <TouchableOpacity
            onPress={() => props.nav.openDrawer()}
            transparent>
           <Ionicons name="menu" size={35} color="white" />
            </TouchableOpacity>
        </View>
        <View style={{height:'100%',width:'65%',justifyContent:'center',paddingLeft:10}}>
        <Text style = {{color:'white',fontWeight:'bold',textAlign:'center',width:200,fontSize:18}}>{props.name}</Text>

        </View>
        <View style={{height:'100%',width:'20%',justifyContent:'center'}}>
        <Image source={require('../assets/colorLogo.png')} style={{width:Platform.OS=='ios'? 40:50,height:Platform.OS=='ios'? 40:50,marginBottom:5}} />

        </View>
  
    </View>
    )
}

export default MyHeader
