import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  LogBox,
  TextInput,
  Modal,Pressable,Alert
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Card from '../components/Card';

function MyAlert(props) {
    console.log("props.show",props.show)
    console.log("props.message",props.message)
    const [modalVisible, setModalVisible] = useState(props.show);
console.log("from Alerr",modalVisible);
// setModalVisible(props.show);

    return (
        <View style={{flex:1}}>
        <Modal
        animationType="slide"
        
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card style={{borderRadius:10,width:"80%",height:"40%",alignItems:'center',backgroundColor:"white"}}>
            <View style={{flexDirection:'row'}}>

                <Text>{props.message}</Text>
             
             
            
             {/* </View> */}
            </View>

           
          
          <Pressable
            //    style={styles.signupButton}
               activeOpacity={0.7}
              onPress={()=> setModalVisible(false)}
            >
              <Text >SAVE</Text>
            </Pressable>
            <Pressable
               
               activeOpacity={0.7}
               onPress={()=> setModalVisible(false)}
            >
              <Text >CANCEL</Text>
            </Pressable>
           </Card>
        
 
            
          </View>
        </View>
      </Modal>
      </View>
    )
}
const styles=StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 60,
        

      },
      modalView: {
        margin: 20,
        // height:"100%",
        height:'100%',
        width:"100%",
        backgroundColor: 'rgba(0,0,0,0.3)',
       // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})

export default MyAlert
