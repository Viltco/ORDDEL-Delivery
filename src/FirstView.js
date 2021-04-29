import React, { Suspense, useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Form,
  Label,
  Button,
  Text,
  Icon,
  Spinner
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler
} from "react-native";
import styles from "./FirstView.style";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch } from "react-redux";
import * as ApiDataActions from "../src/store/actions/ApiData";
import {useRoute, useFocusEffect} from '@react-navigation/native';
import Colors from "../src/ColorCodes/Colors";
const FirstView = ({ navigation }) => {
  const dispatch = useDispatch();

  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  var getToken = async () => {
    console.log("Hi Shaheer Welcome to Hell");

    try {
      let check = await AsyncStorage.getItem("loginCheck");
      let datal = JSON.parse(check);
      // setCheckLogin(datal);
      let remember = await AsyncStorage.getItem("remember");
      let dataR = JSON.parse(remember);
      let userEmail = await AsyncStorage.getItem("userData");

      let userPass = await AsyncStorage.getItem("passData");

      let datae = JSON.parse(userEmail);

      // setEmail(datae);
      // console.log(email)

      let datap = JSON.parse(userPass);
      if(datal&&dataR){
      setLoading(true);

        fetch(URL+'/delivery_person/delivery_person_login/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          
          
            "username": datae,
            "password": datap
           
         })
        
           
        })
      
        .then( async (response) => {
          let data = await response.json();
            console.log("status code",response.status)
            console.log("status code",data)
            if (data.message != "The account is not verified via email") {
    
            if(response.status==200)
            {
              console.log("data",data)
              // storeToken(email,password);
              dispatch(ApiDataActions.SetLoginData(data));
              setLoading(false); 
              navigation.navigate("MyDrawer");
            }
            else if (
              response.message == "The account is not verified via email"
            ) {
              // console.log("data",data);
              setLoading(false);
              // alert(response.message);
            } else {
              setLoading(false);
              // alert(data.message);
    
            }
          }
          else {
            setLoading(false);
    
            // alert(data.message);
          }
              // code that can access both here
         
        })
        .catch ((error)=>
          console.log("Something went wrong", error)
        )
      }
      
      // setPassword(datap);
      // console.log(datae, "from my stack -------------------------");
      // let datap = JSON.parse(userPass);
      // setPassword(datap)

      //console.log(datae , datap);
      // if(datae != null && datap != null){

      // loadData()
      // }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    getToken();

    fetch(URL + "/version_control/?apk_version=1.3")
    // fetch(URL+'/client_app/clients_list/33/')
    .then( async (response) => {
        let data = await response.json();
        console.log("Show Card",data)
        console.log("Show Card Code",response.status)
        if(response.status==200){
// dispatch(ApiDataAction.SetCard(data.card.card_brand,data.card.last4));
           
      
        }
        else{
            setLoading(false)
            Alert.alert("Hold on!", data.message, [
              {
                // text: "Cancel",
                // onPress: () => null,
                // style: "cancel"
              },
              { text: "Ok", onPress: () => BackHandler.exitApp() }
            ]);
            
        }
        
    })
    .catch((error) => console.error(error));
  }, []);
  
  

  
  return (
  //   <>
  //  <StatusBar backgroundColor="black" />

    <View style={{flex:1}}>
      {loading ? (
        <Spinner color={Colors.themeColor} size={50} style={{alignSelf:'center',marginTop:"50%"}}/>
        
      ) :
       
     <>

      <View style={{flex:10}} >

    <ImageBackground
    source={require('./assets/Splash.jpg')} 
    style={styles.image}
    >

    <View style = {styles.topContainer}>

    <Image
        style={styles.tinyLogo}
        source={require('./assets/colorLogo.png')}
      />
    </View>
    </ImageBackground>
    </View>

    <View style = {{flex:3}}>
    
    <TouchableOpacity
    onPress = { () => navigation.navigate("Signup")}
    style = {{
      width:'80%',borderRadius:30,backgroundColor:Colors.darkRedColor}}
    style = {{...styles.submitButton,backgroundColor:Colors.darkRedColor}}
    >
        <Text style= {{fontWeight:'bold',alignSelf:'center',color:'white'}}>Register Yourself</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
    onPress = { () => navigation.navigate("Login")} 
    style = {{...styles.secondSubmitButton,backgroundColor:'white',borderWidth: 1,
    borderColor: Colors.darkRedColor,marginTop:20}}
    >
        <Text style= {{fontWeight:'bold',color:Colors.darkRedColor,alignSelf:'center'}}>Login</Text>
    </TouchableOpacity>
    
    </View>
    {/* </View> */}
      {/* )} */}
      </>}
    </View>
    
  
  );
};



export default FirstView;
