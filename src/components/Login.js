import React , {useEffect , useState , useCallback}from 'react';
import { Container, Header, Content, Input, Item , Form , Label , Button , Text,Spinner } from 'native-base';
import { StyleSheet , View , ImageBackground , Image,Linking,KeyboardAvoidingView,TextInput,TouchableOpacity,ScrollView,Alert,BackHandler} from 'react-native'
//import styles from './Login.style'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import * as ApiDataActions from '../store/actions/ApiData';
import AsyncStorage from '@react-native-community/async-storage'
import Firebase from '@react-native-firebase/app'
import Icon from 'react-native-vector-icons/Ionicons';
import base64 from "react-native-base64";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import URL from '../api/ApiURL'
import { useRoute, useFocusEffect } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
// import messaging from '@react-native-firebase/messaging';
//import NotifService from '../../NotifService';
import PushNotification from "react-native-push-notification";
import Colors from '../ColorCodes/Colors';
import Logos from '../components/Logos';
import CheckBox from '@react-native-community/checkbox';
const Login = ({navigation,route}) => {

  const dispatch = useDispatch();
  const RiderId = useSelector((state) => state.ApiData.RiderId);

  const [data, setData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [personInfo, setPersonInfo] = useState([]);
  const [contactPerson, setContactPerson] = useState([]);
  const [accountInfo, setaccountInfo] = useState([]);
  const [device,setDevice]=useState("");
  const [securePass , setSecurePass] = useState(true)
  const [tokken , setTokken] = useState('')
  const [emailMsg, setEmailMsg]=useState(false)
  const [passMsg, setPassMsg]=useState(false)
  const [toastMessage,setToastMessage]=useState("");
  const [loading,setLoading]=useState("");
const [rememberMe, setRememberMe] = useState(true);
const isFocused = useIsFocused();

useFocusEffect(
  React.useCallback(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [route])
);

  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_Login, email)
  //     await AsyncStorage.setItem(STORAGE_Password, password)
  //     alert('Data successfully saved')
  //   } catch (e) {
  //     alert('Failed to save the daa to the storage')
  //   }
  // }
//   var arr=[email,password];
//  var len=arr.length;
//  var new_arr=[];
const check=()=>{
  if(email==""||email==null){
    setToastMessage("Please Enter Email");
   }
   else{
     if(password==""||password==null){
      setToastMessage("Please Enter Password");
     }
     else{
      loadData();

     }
   }

}


const sendTokken=()=>{
  if(tokken!=""){
    console.log("Tokkennnnnnnnnn:",tokken)
    console.log("Tokkennnnnnnnnn:",tokken.os)
    fetch(URL + "/devices/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization:
          "Basic " + base64.encode(`${email}:${password}`),
        //   btoa({ username: ClientEmail, password: oldPass })

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: "",
        registration_id: tokken,
        device_id: "",
        active: true,
        type: device
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        //console.log("signup", data);
        //console.log("signup", response.message);
        if (response.status == 200) {
          console.log("lalalalalalalalal",data)
          //alert(data.message);
          // Toast.show(data.message, Toast.LONG);
        } else {
          console.log("lalalalalalalalal",data)

          // Toast.show("Your Old Password Is Invalid", Toast.LONG);
        }
      })
      .catch((error) => console.log(error));
  }

}

  const loadData = () => {
    console.log("email:",email);
    console.log("password:",password);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setToastMessage("Email is Not Correct");
        setLoading(false);
        return false;
      } else{
        setLoading(true);
    fetch(URL+'/delivery_person/delivery_person_login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({


        "username": email,
        "password": password

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
          storeToken(email,password);
          dispatch(ApiDataActions.SetLoginData(data));
          setLoading(false);
          sendTokken();
          navigation.navigate("MyDrawer");
          setEmail("");
          setPassword("");
        }
        else if (
          response.message == "The account is not verified via email"
        ) {
          // console.log("data",data);
          setLoading(false);

          alert(response.message);
        } else {
          setLoading(false);
          alert(data.message);

        }
      }
      else {
        setLoading(false);

        alert(data.message);
      }
          // code that can access both here

    })
    .catch ((error)=>
      console.log("Something went wrong", error)
    )
  }


  //  if(email=="")
  //  {
  //    setEmailMsg(true);
  //  }
  //  else {
  //   setEmailMsg(false);
  //  }

    //console.log(email,password,tokken)

    // return fetch(URL+'/client_app/client_login/')

    // .then((response) => response.json())
    // .then((responseJson) => {
    //   if(responseJson[0] != "Login doesn't exist or password is incorrect"){



    //   // setData({data : responseJson})
    //   // setCompanyInfo({companyInfo : responseJson[0]})
    //   // setPersonInfo({personInfo : responseJson[1]})
    //   // setContactPerson({contactPerson : responseJson[2]})
    //   // setaccountInfo({accountInfo : responseJson[3]})
    //   // AsyncStorage.setItem('isLoggedIn' , '1')
    // //   const STORAGE_LOGIN = ''
    // //   const STORAGE_PASSWORD = ''
    // //   AsyncStorage.setItem(STORAGE_LOGIN, "email")
    // //   AsyncStorage.setItem(STORAGE_PASSWORD, password)

    // // console.log("Shaheer",STORAGE_LOGIN)

    // storeToken(email,password)

    //   navigation.navigate("MyDrawer" , { Company_Data : responseJson })
    //   }else{
    //   alert("Wrong email or password")

    //   }

    //})


  }





  // const loadData = () => {



  //   return fetch(URL+'/shipment/search?login='+email.trim()+'&password='+password+'&token='+tokken)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     //console.log(responseJson)
  //     setData({data : responseJson})

  //     setCompanyInfo({companyInfo : responseJson[0]})
  //     setPersonInfo({personInfo : responseJson[1]})
  //     setContactPerson({contactPerson : responseJson[2]})
  //     setaccountInfo({accountInfo : responseJson[3]})
  //     // AsyncStorage.setItem('isLoggedIn' , '1')
  //   //   const STORAGE_LOGIN = ''
  //   //   const STORAGE_PASSWORD = ''
  //   //   AsyncStorage.setItem(STORAGE_LOGIN, "email")
  //   //   AsyncStorage.setItem(STORAGE_PASSWORD, password)


  //   // console.log("Shaheer",STORAGE_LOGIN)

  //   storeToken(email,password)

  //     navigation.navigate("MyDrawer" , { Company_Data : responseJson })

  //   })
  //   .catch((error) => {
  //     alert("Email or Password Incorrect")

  //   });

  // }


  var storeToken = async (e, p) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(e));

      await AsyncStorage.setItem("passData", JSON.stringify(p));
      await AsyncStorage.setItem("loginCheck", JSON.stringify(true));
      if(rememberMe){
        await AsyncStorage.setItem("remember", JSON.stringify(true));
      }
      else{
        await AsyncStorage.setItem("remember", JSON.stringify(false));
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  var getToken = async () => {
    try {
      let userEmail = await AsyncStorage.getItem("userData");

      let userPass = await AsyncStorage.getItem("passData");
      let userRemember = await AsyncStorage.getItem("remember");

      let datae = JSON.parse(userEmail);
      let datap = JSON.parse(userPass);
      let dataR=JSON.parse(userRemember);
      console.log("Async data: ",datae);
      console.log("Async data: ",datap);
      console.log("Async data: ",userRemember);
      if(dataR==true){
        console.log("from Iff og Login ******")
      setEmail(datae);
      console.log("emailllllllllllll",email)


      setPassword(datap);
      }
      else{
        setEmail("")
        setPassword("");
      }

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
  }, [isFocused]);


  useEffect(() => {

    console.log("TOKEN: 1");

    Firebase.initializeApp
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          setTokken(token.token)
          setDevice(token.os)
          console.log(tokken)
          console.log("TOKEN:", token);
        },
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
          // process the notification
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
          // process the action
        },
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });

  }, []);




  return (
    <View style={{...styles.container}}>


      <View style={styles.header}>
        <ImageBackground
          source={require("../assets/Splash.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              color: "white",
              marginVertical: "5%",
              fontSize: 35,
              alignSelf: "center",
              marginTop: "15%",
              borderBottomWidth: 1,
              borderBottomColor: "white",
              fontWeight: "bold",
            }}
          >
            LOG IN
          </Text>
          <Text
            style={{
              color: Colors.yellowColor,
              marginVertical: 15,
              fontSize: 20,
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            Login to your ORDDEL Account
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.footer}>
      <KeyboardAvoidingView style={{}}
        behavior={Platform.OS == "ios" ? "padding" : null} >
        <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} >
        {/* <View style={styles.g_container}> */}
          {/* <KeyboardAvoidingView> */}
            <View>
              <TextInput
                style={styles.n_inputArea}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                autoFocus={true}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={Colors.textGreyColor}
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => {
                  setEmailMsg(false);
                  setEmail(value);
                  setToastMessage("");
                }}
                initialValue=""
              />
            </View>
            {/* {emailMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C" }}>Please Enter Email</Text>
              </Animatable.View>
            )} */}

            <View style={styles.inputArea}>
              <TextInput
                style={{ width: "90%" }}
                placeholder="Password"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                secureTextEntry={securePass}
                autoCapitalize="none"
                required={true}
                placeholderTextColor={Colors.textGreyColor}
                minLength={6}
                errorMessage="Please enter Minimum 6 characters password"
                value={password}
                onChangeText={(text) => {
                  setToastMessage("");
                  setPassword(text)
                }}
                initialValue=""
              />
              <View style={{alignSelf:'center'}}>
                <Icon
                  active
                  name={securePass ? "eye" : "eye-off"}
                  color={Colors.textGreyColor}
                  size={25}
                  onPress={() => {
                    if (securePass == true) {
                      setSecurePass(false);
                    } else {
                      setSecurePass(true);
                    }
                  }}
                />
              </View>
            </View>

            <View style={{flexDirection:'row',alignSelf:'center'}}>
            <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          boxType="square"
          onAnimationType="fade"
          onTintColor={Colors.themeColor}
          onCheckColor={Colors.themeColor}
          tintColors={{ true: Colors.themeColor, false: 'black' }}

          style={{marginTop:Platform.OS=="android"?null:5, transform: [{ scaleX: Platform.OS=="android"? 0.8:0.7 }, { scaleY: Platform.OS=="android"? 0.8:0.7 }] }}
        />
                <View style={{alignSelf:"center",marginBottom:Platform.OS=="android"?null:4}}>
                  <Text style={{fontSize:Platform.OS=="android"?12:14, marginRight:0,color:Colors.productGrey }}>Remember me</Text>


                </View>


        </View>
            {/* {passMsg == true ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C" }}>Please Enter Password</Text>
              </Animatable.View>
            ) : null} */}
          {/* </KeyboardAvoidingView> */}

          <View style={{ flexDirection: "row", marginTop: 30,alignSelf:'center' }}>
            <Text style={{ color: Colors.textGreyColor, fontSize: 12 }}>
              {" "}
              Forgot Your Password?{" "}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordVerification")}
            >
              <Text style={{ color: Colors.darkRedColor, fontSize: 12,fontWeight:'700' }}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* {emptyMsg && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "#DC143C" }}>All Fields Are Required</Text>
            </Animatable.View>
          )} */}
          {/* {isLoading ? (
      <Spinner
      //visibility of Overlay Loading Spinner
      visible={isLoading}
      // size="normal"
      // animation='fade'
      //Text with the Spinner
      // textContent={'Loading...'}
      //Text style of the Spinner Text
      // textStyle={styles.activityIndicator}
    />):(

    // )}
    //   {isLoading ? (
    //   <ActivityIndicator size="large" color={Colors.accentColor} style={styles.activityIndicator}/>
    //   ) : ( */}
          {toastMessage != "" ? (
            <Text
              style={{
                color: Colors.themeColor,
                marginTop: 10,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {toastMessage}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={check}>
            {loading ? (
              <Spinner color={"white"} />
            ) : (
              <Text style={styles.buttonText}>LOG IN</Text>
            )}
          </TouchableOpacity>
          {/* //)} */}
        {/* </View> */}

        <View style={styles.signupContianer}>
          <Text style={styles.signupText}> Don't have an account yet? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: Colors.darkRedColor,fontWeight:'700' }}>Signup here</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
          </KeyboardAvoidingView>
      </View>
    </View>

);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#EE0202',
  },
  activityIndicator: {
    // backgroundColor:'#FFF',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf:"center",
    fontSize: 25,
    width: "60%",
    color: Colors.accentColor,
  },

  spinner: {
    //flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 30,
    //backgroundColor: '#ecf0f1',
    //padding: 8,
  },

  signupContianer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signupText: {
    fontSize: 14,
    // fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },
  signupButton: {
    fontWeight: "bold",
    backgroundColor: "#EE0202",
    fontSize: 20,
    width: 100,
    height: 30,
    borderRadius: 25,
  },
  header: {
    flex: 2,
    width: "100%",
    //backgroundColor:'#EE0202',
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 4,
    backgroundColor: "#ffffff",
    // justifyContent: "center",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    //paddingVertical: 10,
    width:"100%",

  },
  g_container: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    marginVertical: 0,
    height: 40,
    width: "85%",
    alignSelf:'center',
    backgroundColor: "#F2F1F3",
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  n_inputArea: {
    marginVertical: 10,
    marginTop: 20,
    height: 40,
    width: "85%",
    alignSelf:'center',
    backgroundColor: "#F2F1F3",
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  button: {
    height: 40,
    width: "85%",
    alignSelf:'center',
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
  },

  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});


export default Login;

