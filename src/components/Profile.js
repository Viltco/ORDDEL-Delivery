import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  BackHandler
} from "react-native";
import Card from '../components/Card'
import { useRoute, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
import MyHeader from "../components/MyHeader";
import URL from "../api/ApiURL";

import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as ApiDataAction from "../store/actions/ApiData";
import base64 from "react-native-base64";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
// import Toast from 'react-native-simple-toast';
import MyAlert from '../components/MyAlert';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Profile = ({ navigation ,route}) => {

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate("Dashboard")
        // Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel"
        //   },
        //   { text: "YES", onPress: () => BackHandler.exitApp() }
        // ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, [route])
  );




  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [photoState, setPhotoState] = useState('');

  const RiderId = useSelector((state) => state.ApiData.RiderId);
  const RiderPackage = useSelector((state) => state.ApiData.RiderPackage);
  const RiderEmail = useSelector((state) => state.ApiData.RiderEmail);
  const FirstName = useSelector((state) => state.ApiData.FirstName);
  const LastName = useSelector((state) => state.ApiData.LastName);
  const UsedInvoices = useSelector((state) => state.ApiData.UsedInvoices);
  const PhoneNumber = useSelector((state) => state.ApiData.RiderPhone);
  const RiderAddress = useSelector((state) => state.ApiData.RiderAddress);
  const RiderImage = useSelector((state) => state.ApiData.RiderImage);


  const [oldSecurePass , setOldSecurePass] = useState(true);
  const [securePass , setSecurePass] = useState(true);
  const [secureConfirmPass , setSecureConfirmPass] = useState(true);
  console.log("Rider Image",RiderImage);
    const [image,setImage]=useState("");
    const [imageCheck,setImageCheck]=useState(false);
  const RemainingInvoices = useSelector(
    (state) => state.ApiData.RemainingInvoices
  );

  const isFocused = useIsFocused();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address,setAddress]=useState("");
  const [response, setResponse] = useState("");
  const [data, setData] = useState("");
    const [alertMessage,setAlertMessage]=useState(false);
const [showAlert,setShowAlert]=useState(false);

  var { photo } = photoState;
  var dataa = 0;

  useEffect(() => {
    setFirstName(FirstName);
    setAddress(RiderAddress);
    setLastName(LastName);

      console.log("RiderEmail",RiderEmail)
      if(RiderId!=0){
        fetch(URL + "/delivery_person/delivery_person_dashboard/" + RiderId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "Dashboard:",
          responseJson.delivery_person_dashboard.no_of_pending_orders
        );
        console.log("Dashboard:", responseJson);
        // console.log("Dashboard:",responseJson.client_dashboard.client_name);
        //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
        // console.log("=======",)
        dispatch(ApiDataAction.SetListData(responseJson));
        dataa = responseJson;
        setData(responseJson);
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error(error));
      }
    

      if(RiderImage==""){
        fetch(URL + "/delivery_person/get_delivery_person_logo/"+RiderId+"/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          " Getting Image:",
          responseJson
        );
        dispatch(ApiDataAction.SetImage(responseJson.image));
        // setImageCheck(false);
        // setImage(responseJson.image);
      })
      .catch((error) => console.error(error));
      }
      






  }, [isFocused]);

  //---------------------------Change Password------------------------//
  const change_Password = () => {
    //console.log("ph o",Phone_No);
    //console.log(ClientEmail, oldPass, "--------------------Header");
    if (newPass != "" && oldPass != "" && confirmPass != "") {
        if (newPass == confirmPass) {
          if(newPass==oldPass){
            alert("There No Change Between Old and New Password");
            
          }
          else if (newPass.length < 8) {
            // setToastMessage("Password limit should be Greater than 6 Digits");
            alert("Password limit should be Greater than 7 Digits");
          }
          else{
      fetch(URL + "/api/change-password/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + base64.encode(`${RiderEmail}:${oldPass}`),
          //   btoa({ username: ClientEmail, password: oldPass })

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          old_password: oldPass,
          new_password: newPass,
        }),
      })
        .then(async (response) => {
          let data = await response.json();
          console.log("status ", response.status);
          console.log("Change password", response.message);
          if (response.status == 200) {
              setNewPass("");
              setOldPass("");
              setConfirmPass("");
              setModalVisible(!modalVisible);

            alert(data.message);
          } else {
            alert("Your Old Password Is Invalid");
          }
        })
        .catch((error) => console.log(error));
      }
    }
    else{
        alert("Password Doesn't Matched")
    }
    } else {
      alert("All Fields Are Required");
    }
  };

  const handleChoosePhoto = async() => {
    const options = {
      noData: true,
    };
    // var base64 = require('base-64');
    var res=0;
    try {
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
    setPhotoState({ photo:res });
    dispatch(ApiDataAction.SetImage(res.uri));

      uploadImage(res)
      console.log(res,"Imageee");
      
    } catch ( err ) {
      if ( DocumentPicker.isCancel(err) ) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
 
    // const base64File = await RNFS.readFile(res.uri, "base64");
    
  };



  const uploadImage=(response)=>{
    var formdata = new FormData();
    formdata.append("image",response);
    formdata.append("id",RiderId);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
    };
    
    fetch(URL+"/delivery_person/upload_delivery_person_logo/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      setImageCheck(true);

  }

//   const handleChoosePhoto = () => {
  
//     const Options = {
//       title: 'Choose an Image',
//     //   includeBase64:true
//     saveToPhotos:true
//     };
    
//     launchImageLibrary(Options, response => {
//       setPhotoState ({ photo: response });
//       const imageBase64=response;
//       console.log("Image_______________",response)
      
//     uploadImage(response);
//     });
    
//     };

  const UpdateProfile = () => {
    setShowAlert(false);
    if (firstName == "") {
        setFirstName(FirstName);
          

        console.log(firstName, "-------------------First Name");
      } else {
        console.log(firstName, "-------------------First Name");
      }
      if (lastName == "") {
        setLastName(LastName);
        console.log(lastName, "----------------------Last Name");
      } else {
        console.log(lastName, "----------------------Last Name");
      }
      if(address=="")
      {
          setAddress(RiderAddress);
      }
      else {
          console.log("----------------------address")
      }
      if ((firstName != FirstName || lastName != LastName||address!=RiderAddress)&&(firstName!=""||lastName!=""||address!="")) {
    fetch(URL + "/delivery_person/update_delivery_person/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: RiderEmail,
        phone_number: PhoneNumber,
        first_name: firstName==""?FirstName:firstName,
        last_name: lastName==""?LastName:lastName,
        address:address==""?RiderAddress:address
      }),
    })
    .then(async (response) => {
        let data = await response.json();
        console.log(data);

        if (response.status == 200) {
          dispatch(ApiDataAction.UpdateProfile(firstName, lastName, phoneNo,address));
          console.log(PhoneNumber, phoneNo);
          
            setFirstName("");
            setLastName("");
            setPhoneNo("");
            setAddress("");
            // Toast.show("Successfully Updated the record", Toast.LONG);
            alert("Successfully Updated the record");
            navigation.navigate("Dashboard")
            // console.log("status code",response.status)
            // console.log("status code",data)
            console.log(data, "---------------Profile");
          
        }
        // code that can access both here
      })
      .catch((error) => console.log("Something went wrong", error));
    }
    else{
      // Toast.show("There is Nothing for updation", Toast.LONG);
      alert("There is Nothing for updation")
      setShowAlert(true);
      console.log("showAlert",showAlert);
      // <MyAlert message="There is Nothing for updation" show={true}/>

    }
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      {/* <MyHeader name="PROFILE" nav={navigation} /> */}
      {/* {showAlert==true?<MyAlert message="There is Nothing for updation" show={true} />:null} */}

      <View style={{ height: "35%" }}>
        <ImageBackground
          source={require("../assets/Splash.jpg")}
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
             <Image source={RiderImage==null||RiderImage==""?require('../assets/profilelogo.png'):{uri:RiderImage}} 
      style={styles.avatar} 
      />
            {/* {RiderImage==""? <Image style={styles.avatar} 
        source={RiderImage==null?require("../assets/profilelogo.png"):{uri:RiderImage}} 
        />:
        <Image style={styles.avatar} source={{uri:RiderImage}} />
        } */}
        <View style={{alignSelf:"center",marginBottom:Platform.OS=="android"?110:"25%",marginLeft:"26%"}}>
        <TouchableOpacity
      // style={{marginRight:'10%'}}
          activeOpacity={0.5}
          onPress={handleChoosePhoto}
        >
          <FontAwesome name="camera" size={21}
          // style={styles.iconStyle}
            color='white'
            style={{alignSelf:'center'}}
          />
          {/* <Text style={{color:'#0f70b7'}}>Upload</Text> */}
        </TouchableOpacity>
      </View>
        </ImageBackground>
        
       
      </View>
      <View style={{ height: "65%" }}>
        <ScrollView keyboardShouldPersistTaps={true}>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 0 }}
        >
          <View style={{ height: "100%" }}>
            <View>
              {/*  */}

              {/* <FormSignup type="SignUp"/> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={styles.name1_inputArea}
                  placeholder={FirstName}
                  autoCapitalize="words"
                  // textContentType='emailAddress'
                  placeholderTextColor={Colors.productGrey}
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                  initialValue=""
                />

                <TextInput
                  style={styles.name2_inputArea}
                  placeholder={LastName}
                  autoCapitalize="none"
                  autoCapitalize="words"
                  placeholderTextColor={Colors.productGrey}
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                  initialValue=""
                />
              </View>
              <TextInput
                  style={styles.inputArea}
                  placeholder={RiderAddress}
                  autoCapitalize="none"
                  autoCapitalize="words"
                  placeholderTextColor={Colors.productGrey}
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                  initialValue=""
                />
              <TextInput
                editable={false}
                style={styles.inputArea}
                placeholder={RiderEmail}
                required={true}
                autoCapitalize="none"
                placeholderTextColor={Colors.productGrey}
                keyboardType="email-address"
                errorMessage="Please enter a valid email address."
                initialValue=""
              />
              <View style={styles.inputArea}>
                <TextInput
                editable={false}

                  style={{ width: 250 }}
                  placeholder={PhoneNumber}
                  autoCapitalize="none"
                  required={true}
                  placeholderTextColor={Colors.productGrey}
                  minLength={6}
                //   errorMessage="Please enter Minimum 6 characters password"
                  //value={phoneNo}
                  onChangeText={(value) => setPhoneNo(value)}
                  initialValue=""
                />
              </View>
            </View>
           

            <View
              style={{
                //height: "30%",
                paddingTop: 20,

                flexDirection: "row",
                justifyContent: "center",

                //bottom: 10,
              }}
            >
              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/Profile_basic.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text
                  style={{
                    color: Colors.darkRedColor,
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 5,
                  }}
                >
                  {RiderPackage}
                </Text>
                <Text
                  style={{
                    color: Colors.productGrey,
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  Packages
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/remain.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                {RemainingInvoices=="-1"?<Text
                  style={{
                    color: Colors.darkRedColor,
                    fontWeight: "bold",

                    fontSize: 14,
                    marginTop: 5,
                  }}
                >
                  UNLIMITED
                </Text>:
                <Text
                  style={{
                    color: Colors.darkRedColor,
                    fontWeight: "bold",

                    fontSize: 20,
                    marginTop: 5,
                  }}
                >
                  {RemainingInvoices}
                </Text>}
                <Text
                  style={{
                    color: Colors.productGrey,
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  Remaining Invoices
                </Text>
              </View>

              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/pending2.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text
                  style={{
                    color: Colors.darkRedColor,
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 5,
                  }}
                >
                  {UsedInvoices}
                </Text>
                <Text
                  style={{
                    color: Colors.productGrey,
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  Used Invoices
                </Text>
              </View>
            </View>

            <View style={{ height: "17%", paddingTop: 20 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  height: 30,
                  width: "60%",
                  backgroundColor: "#E2E2E2",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    // letterSpacing: 1,
                textAlign:'center',
                fontSize:16

                  }}
                >
                  CHANGE PASSWORD
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={UpdateProfile}
                style={{
                  height: 30,
                  width: "60%",
                  backgroundColor: Colors.themeColor,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  marginTop: 10,
                  marginBottom:25,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    // letterSpacing: 1,
                textAlign:'center',
                fontSize:16


                  }}
                >
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);

          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Card style={{borderRadius:10,width:320,height:380,alignItems:'center',backgroundColor:"white"}}>

        {/* <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          > */}
          <View style={{paddingTop:40}}>
          <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
                letterSpacing: 1,
                textAlign:'center'
              }}
            >CHANGE PASSWORD   </Text>
          </View>
            
          <View style={styles.name_inputArea}>
          <TextInput
              style={{width:"95%"}}
              placeholder="Enter Old Password"
              secureTextEntry={oldSecurePass}
              autoCapitalize="none"
              // textContentType='emailAddress'
              placeholderTextColor={Colors.textGreyColor}
              value={oldPass}
              onChangeText={(value) => setOldPass(value)}
              initialValue=""
            />
          <View style={{alignSelf:"center",}}>
          <Icon active name={oldSecurePass?'eye':"eye-off"} color= {Colors.textGreyColor} size={25} 
               onPress = {() => {
             
                if(oldSecurePass == true){
               setOldSecurePass(false)
                }
                else{
                  setOldSecurePass(true)
                }
              }
              }
               />
            </View>
             </View>

             <View style={styles.name_inputArea}>
            <TextInput
              style={{width:"95%"}}

              placeholder="Enter New Password"
              secureTextEntry={securePass}
              autoCapitalize="none"
              //autoCapitalize="words"
              // textContentType='emailAddress'
              placeholderTextColor={Colors.textGreyColor}
              value={newPass}
              onChangeText={(value) => setNewPass(value)}
              initialValue=""
            />
            <View style={{alignSelf:"center",}}>
            <Icon active name={securePass?'eye':"eye-off"} color= {Colors.textGreyColor} size={25} 
                 onPress = {() => {
               
                  if(securePass == true){
                 setSecurePass(false)
                  }
                  else{
                    setSecurePass(true)
                  }
                }
                }
                 />
              </View>
               </View>

             <View style={styles.name_inputArea}>

            <TextInput
              style={{width:"95%"}}
              
              placeholder="Re-Enter Password"
              autoCapitalize="none"
              secureTextEntry={secureConfirmPass}

              // textContentType='emailAddress'
              placeholderTextColor={Colors.textGreyColor}
              value={confirmPass}
              onChangeText={(value) => setConfirmPass(value)}
              initialValue=""
            />
            <View style={{alignSelf:"center",}}>
            <Icon active name={secureConfirmPass?'eye':"eye-off"} color= {Colors.textGreyColor} size={25} 
                 onPress = {() => {
               
                  if(secureConfirmPass == true){
                    setSecureConfirmPass(false)
                  }
                  else{
                    setSecureConfirmPass(true)
                  }
                }
                }
                 />
              </View>
               </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.themeColor,
                marginTop: 20,
                width: 230,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
              }}
              onPress={() => {
                change_Password();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  
                  // letterSpacing: 1,
                  textAlign:'center',
                fontSize: 16,

                }}
              >CONFIRM  </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: Colors.themeColor,
                borderWidth: 1,
                marginTop: 10,
                width: 230,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
                
                  
              <Text style={{ color: Colors.themeColor,fontSize: 16,textAlign:'center', }}>Cancel</Text>
            </TouchableOpacity>
            </Card>
          </View>
        {/* </View>
        </View> */}
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    marginTop: 12,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#EE0202",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 15,
  },
  name1_inputArea: {
    height: 40,
    width: 130,

    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  name_inputArea:{
    marginVertical:4,
    // textAlign:'right',
    height: 40, 
    width:250,
     backgroundColor: '#F2F1F3',
    borderRadius:25,
    paddingHorizontal:30,
    flexDirection:'row',
    marginTop:10
    
    //padding:40,
  },
  name2_inputArea: {
    marginLeft: 20,
    marginVertical: 10,
    height: 40,
    width: 135,
    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  inputArea: {
    marginVertical: 5,
    alignSelf: "center",
    height: 40,
    width: 290,
    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 60,
    

  },
  button: {
    height: 40,
    width: 270,
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: "center",
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:90,
  
  },
});

export default Profile;
