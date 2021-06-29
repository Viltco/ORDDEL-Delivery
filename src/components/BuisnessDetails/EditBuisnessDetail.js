import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Form,
  Label,
  Button,
  Thumbnail,
  Text,
  Spinner,
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
//import styles from './Signup.style'

import { useIsFocused } from "@react-navigation/native";

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
//import PhoneInput from "react-native-phone-number-input";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
// import * as BusinessDate from "../../store/actions/BusinessDate";
import Colors from "../../ColorCodes/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import URL from "../../api/ApiURL";

// import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
import BuisnessDetail from "./BuisnessDetail";
// import Firebase from '@react-native-firebase/app'

const EditBuisnessDetail = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const { BName, BAdress, BNature, BType, ID } = route.params;
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  const RiderName = useSelector((state) => state.ApiData.RiderName);
  const RiderImage = useSelector((state) => state.ApiData.RiderImage);

  //   const Name = useSelector((state) => state.BusinessData.BuisnessName);
  //   const nature = useSelector((state) => state.BusinessData.BuisnessNature);

  //   const type = useSelector((state) => state.BusinessData.BuisnessType);

  //   const aaddress = useSelector((state) => state.BusinessData.BuisnessAddress);

  console.log("ClientId", RiderId);
  const phoneInput = useRef(phone_No);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [username, setUserName] = useState("");
  // const [email , setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const [c_Pass, setC_Pass] = useState("");
  const [phone_No, setPhone_No] = useState(phoneInput);
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);

  const [BusinessName, setBusinessName] = useState("");
  const [BusinessNature, setBusinessNature] = useState("");
  const [BusinessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [BusinessNameMsg, setBusinessNameMsg] = useState(false);
  const [BusinessNatureMsg, setBusinessNatureMsg] = useState(false);
  const [BusinessTypeMsg, setBusinessTypeMsg] = useState(false);
  const [addressMsg, setAddressMsg] = useState(false);

  var reg1 = /^[a-zA-Z ]*$/;
  const [BusinessNameMsg1, setBusinessNameMsg1] = useState(false);
  const [BusinessNatureMsg1, setBusinessNatureMsg1] = useState(false);
  const [BusinessTypeMsg1, setBusinessTypeMsg1] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tokken, setTokken] = useState("");
  useEffect(() => {
    // console.log("Name", Name);
    // console.log("nature", nature);
    // console.log("type", type);
  }, [isFocused, ID]);

  // const checkName=()=>{
  //   if(BusinessName!=""){
  //     if (reg1.test(BusinessName) === false) {
  //       // setToastMessage("Email is Not Correct");
  //       // alert("Invalid Business Name");
  //       setBusinessNameMsg1(true);
  //       setBusinessName("");
  //       // setButtonCheck(false);
  //       // setAccountNumberMsg1(true);
  //       // setLoading(false);
  //       return false;
  //     }
  //     else{
  //       setBusinessNameMsg1(false);
  //     }
  //   }
  // }

  const checkNature = () => {
    if (BusinessNature != "") {
      if (reg1.test(BusinessNature) === false) {
        // setToastMessage("Email is Not Correct");
        // alert("Invalid Business Nature");
        setBusinessNatureMsg1(true);
        setBusinessNature("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      } else {
        setBusinessNatureMsg1(false);
      }
    }
  };

  const checkType = () => {
    if (BusinessType != "") {
      if (reg1.test(BusinessType) === false) {
        // setToastMessage("Email is Not Correct");
        // alert("Invalid Business Type");
        setBusinessTypeMsg1(true);
        setBusinessType("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      } else {
        setBusinessTypeMsg1(false);
      }
    }
  };

  const updateBuisnessDetail = () => {
    // if (BusinessName == "") {
    //   setBusinessName(BName);
    // } else if (BusinessNature == "") {
    //   setBusinessNature(BNature);
    // } else if (BusinessType == "") {
    //   setBusinessType(BType);
    // } else if (address == "") {
    //   setAddress(BAdress);
    // } else {
    if (BusinessType != "") {
      if (reg1.test(BusinessType) === false) {
        // setToastMessage("Email is Not Correct");
        // alert("Invalid Business Type");
        setBusinessTypeMsg1(true);
        setBusinessType("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      } else {
        setBusinessTypeMsg1(false);
      }
    }
    if (BusinessNature != "") {
      if (reg1.test(BusinessNature) === false) {
        // setToastMessage("Email is Not Correct");
        // alert("Invalid Business Nature");
        setBusinessNatureMsg1(true);
        setBusinessNature("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      } else {
        setBusinessNatureMsg1(false);
      }
    }

    // if(BusinessName!=""){
    //   if (reg1.test(BusinessName) === false) {
    //     // setToastMessage("Email is Not Correct");
    //     // alert("Invalid Business Name");
    //     setBusinessNameMsg1(true);
    //     setBusinessName("");
    //     // setButtonCheck(false);
    //     // setAccountNumberMsg1(true);
    //     // setLoading(false);
    //     return false;
    //   }
    //   else{
    //     setBusinessNameMsg1(false);
    //   }
    // }

    if (
      BusinessName == "" &&
      BusinessNature == "" &&
      BusinessType == "" &&
      address == ""
    ) {
      alert("Nothing to change");
    } else if (
      BusinessName == " " ||
      BusinessNature == " " ||
      BusinessType == " " ||
      address == " "
    ) {
      alert("Nothing to change");
    } else {
      setLoading(true);

      fetch(URL + "/delivery_person/update_business/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          business_logo: "",
          business_name: BusinessName == "" ? BName : BusinessName,
          business_nature: BusinessNature == "" ? BNature : BusinessNature,
          business_type: BusinessType == "" ? BType : BusinessType,
          business_address: address == "" ? BAdress : address,
        }),
      })
        .then(async (response) => {
          let data = await response.json();
          console.log(data);
          if (response.status == 200) {
            setBusinessName("");
            setBusinessNature("");
            setBusinessType("");
            setAddress("");
            setLoading(false);
            navigation.navigate("BuisnessDetail");
            //   dispatch(
            //     ApiData.updateBuisnessDetail(
            //       BusinessName,
            //       BusinessNature,
            //       BusinessType,
            //       address
            //     )
            //   );
          } else {
            setLoading(false);
            alert(data.message);
            //Toast.show("Successfully Updated the record", Toast.LONG);
            // console.log("status code",response.status)
            // console.log("status code",data)
            //console.log(data, "---------------Profile");
          }
          // code that can access both here
        })
        .catch((error) => console.log("Something went wrong", error));
    }

    // }
  };

  //Verification Code

  //  useEffect(() => {

  //   Firebase.initializeApp

  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       setTokken(token.token)

  //       console.log("TOKEN:", token);
  //     },

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     onNotification: function (notification) {
  //       console.log("NOTIFICATION:", notification);

  //       // process the notification

  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },

  //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //     onAction: function (notification) {
  //       console.log("ACTION:", notification.action);
  //       console.log("NOTIFICATION:", notification);

  //       // process the action
  //     },

  //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //     onRegistrationError: function(err) {
  //       console.error(err.message, err);
  //     },

  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,

  //     /**
  //      * (optional) default: true
  //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //      * - if you are not using remote notification or do not have Firebase installed, use this:
  //      *     requestPermissions: Platform.OS === 'ios'
  //      */
  //     requestPermissions: true,
  //   });

  // try {
  //   const Login =  AsyncStorage.getItem('@login')
  //   const Password = AsyncStorage.getItem('@password')
  //   if (Login !== null) {
  //      this.props.navigation.navigate("Dashboard")
  //   }
  // } catch (e) {
  //   alert('Failed to fetch the data from storage')
  // }

  // },[]);

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}
  behavior={Platform.OS == "ios" ? "padding" : null} >
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          {/* <View style={styles.spinnerv}> */}
          {/* {
  state?
  <ActivityIndicator size={100} /> :
  <Text> loading... </Text>
} */}
          {/* </View> */}

          <View style={{ ...styles.header, paddingBottom: 10 }}>
            <ImageBackground
              source={require("../../assets/Splash.jpg")}
              style={{ width: "100%", height: "100%" }}
            >
              <Content>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Thumbnail
                    scaleX={2}
                    scaleY={2}
                    style={{ margin: 35 }}
                    source={
                      RiderImage == null
                        ? require("../../assets/profilelogo.png")
                        : { uri: RiderImage }
                    }
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      color: Colors.yellowColor,
                    }}
                  >
                    Edit Business Details Of{" "}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 22,
                      color: "white",
                    }}
                  >
                    {RiderName}
                  </Text>
                </View>
                {/* <View style = {{alignItems:'center'}}>
          <Text style ={{fontWeight:'bold',color:'black',padding:5}}>Khan</Text>
          </View> */}
              </Content>
            </ImageBackground>
          </View>

     
          <View style={{ ...styles.footer }}>
        
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              {/* <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}> */}
              {/* <ScrollView> */}
              {/* <FormSignup type="SignUp"/> */}

              <TextInput
                style={styles.inputArea}
                placeholder={BName}
                autoCapitalize="words"
                placeholderTextColor={Colors.textGreyColor}
                value={BusinessName}
                maxLength={50}
                required={true}
                onChangeText={(value) => {
                  setBusinessNameMsg(false);
                  setBusinessNameMsg1(false);
                  setBusinessName(value);
                }}
                // onEndEditing={checkName}
                initialValue=""
              />
              {BusinessNameMsg && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Please Enter Business Name
                  </Text>
                </Animatable.View>
              )}
              {BusinessNameMsg1 && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Invalid Business Name
                  </Text>
                </Animatable.View>
              )}

              <TextInput
                style={styles.inputArea}
                placeholder={BNature}
                autoCapitalize="words"
                placeholderTextColor={Colors.textGreyColor}
                maxLength={50}
                value={BusinessNature}
                required={true}
                onChangeText={(value) => {
                  setBusinessNatureMsg(false);
                  setBusinessNatureMsg1(false);
                  setBusinessNature(value);
                }}
                onEndEditing={checkNature}
                initialValue=""
              />
              {BusinessNatureMsg && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Please Enter Busines Nature
                  </Text>
                </Animatable.View>
              )}

              {BusinessNatureMsg1 && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Invalid Busines Nature
                  </Text>
                </Animatable.View>
              )}
              <TextInput
                style={styles.inputArea}
                placeholder={BType}
                autoCapitalize="words"
                placeholderTextColor={Colors.textGreyColor}
                maxLength={50}
                value={BusinessType}
                required={true}
                onChangeText={(value) => {
                  setBusinessTypeMsg(false);
                  setBusinessTypeMsg1(false);
                  setBusinessType(value);
                }}
                onEndEditing={checkType}
                initialValue=""
              />
              {BusinessTypeMsg && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Please Enter Business Type
                  </Text>
                </Animatable.View>
              )}

              {BusinessTypeMsg1 && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Invalid Business Type
                  </Text>
                </Animatable.View>
              )}

              <TextInput
                style={styles.inputArea}
                placeholder={BAdress}
                autoCapitalize="words"
                placeholderTextColor={Colors.textGreyColor}
                value={address}
                required={true}
                onChangeText={(value) => {
                  setAddressMsg(false);
                  setAddress(value);
                }}
                initialValue=""
              />
              {addressMsg && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "#DC143C", marginLeft: 20 }}>
                    Please Enter Address
                  </Text>
                </Animatable.View>
              )}

              {isLoading ? (
                <Spinner
                  //visibility of Overlay Loading Spinner
                  visible={isLoading}
                  // size="normal"
                  // animation='fade'
                  //Text with the Spinner
                  // textContent={'Loading...'}
                  //Text style of the Spinner Text
                  // textStyle={styles.activityIndicator}
                />
              ) : (
                <View>
                  {/* <TouchableOpacity
                    style={styles.uploadButton}
                    activeOpacity={0.7}
                  >
                    <AntDesign
                      name="upload"
                      color={Colors.themeColor}
                      size={20}
                      style={{ marginTop: 5, marginRight: 10 }}
                    />
                    <Text style={styles.uploadButtonText}>UPLOAD LOGO</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={updateBuisnessDetail}
                    style={{ ...styles.signupButton, marginTop: 10 }}
                    activeOpacity={0.7}
                  >
                    {loading ? (
                      <Spinner color={"white"} />
                    ) : (
                      <Text style={styles.signupButtonText}>UPDATE</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              {/* </ScrollView> */}
              {/* </KeyboardAvoidingView> */}
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
              {/* <TouchableOpacity style={styles.button}
        onPress={addCompanyInfo}
        >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity> */}
              {/* //)} */}
            </View>
          

          </View>

        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE0202",
  },

  inputArea: {
    marginVertical: 10,
    height: 40,
    width: "100%",
    backgroundColor: "#F2F1F3",
    //  borderColor:'black',
    //  borderWidth:1,
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  name_inputArea: {
    marginVertical: 10,
    height: 40,
    width: 150,
    backgroundColor: "#F2F1F3",
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  name2_inputArea: {
    marginLeft: 20,
    marginVertical: 10,
    height: 40,
    width: 150,
    backgroundColor: "#F2F1F3",
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  signupButtonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },

  signupText: {
    fontSize: 14,
    fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },

  signupButton: {
    height: 40,
    width: "100%",
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 20,
    // marginVertical: 20,
  },

  uploadButton: {
    height: 40,
    width: "100%",
    borderWidth: 2,
    flexDirection: "row",
    borderColor: Colors.themeColor,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
  },
  uploadButtonText: {
    fontSize: 20,
    marginTop: 5,
    color: Colors.themeColor,
    fontWeight: "bold",
    textAlign: "center",
  },

  header: {
    flex: 2,
    width: "100%",
  },

  footer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#ffffff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingVertical: 10,
    //paddingHorizontal:Platform.OS === 'android' ?20:40
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    //marginVertical:20,
    width: 90,
    height: 30,
    backgroundColor: "#EE0202",
    borderRadius: 25,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },

  signupContianer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default EditBuisnessDetail;
