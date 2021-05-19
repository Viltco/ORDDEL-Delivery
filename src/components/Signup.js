
import React,{useState , useEffect,useRef} from 'react';
import { Container, Header, Content, Input, Item , Form , Label , Button , Text,Spinner,Picker } from 'native-base';
import { StyleSheet , View , ImageBackground,KeyboardAvoidingView,ScrollView, TextInput,TouchableOpacity ,Platform, Image,ActivityIndicator,FlatList} from 'react-native'
//import styles from './Signup.style'
import Icon from 'react-native-vector-icons/Ionicons';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
//import PhoneInput from "react-native-phone-number-input";
import Colors from '../ColorCodes/Colors';
import URL from '../api/ApiURL';
import PhoneInput from "react-native-phone-number-input";
// import { RadioButton } from 'react-native-paper';
import Card from "../components/Card";
import { BottomSheet } from "react-native-btr";
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Firebase from '@react-native-firebase/app'


const Signup = ({navigation}) => {
  const [checked, setChecked] = useState('percentage');
  const phoneInput = useRef(phone_No);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [username , setUserName] = useState('')
  // const [email , setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [isEmail,setIsEmail]=useState(false);
  const [c_Pass, setC_Pass] = useState('')
  const [phone_No, setPhone_No] = useState(phoneInput)
  const [securePass , setSecurePass] = useState(true)
  const [secureConfirmPass , setSecureConfirmPass] = useState(true)
  const [loading,setLoading]=useState(false);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('')
  const [RiderAddress,setRiderAddress]=useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [toastMessage,setToastMessage]=useState("");
  const [selectedValue, setSelectedValue] = useState("key");
  const [terms, setTerms] = useState(false);
  const [packageData,setPackageData]=useState("");
  const [packageLoading, setPackageLoading] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const toggleBottomNavigationView2 = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible2(!visible2);
  };

  const [packageName, setPackageName] = useState("");
  const [packageInvoice, setPackageInvoice] = useState("");
  const [packageId, setPackageId] = useState("");
  const packagedDetail = (name, invoices, id) => {
    setPackageName(name);
    setPackageInvoice(invoices);
    setPackageId(id);
    // console.log("pid",packageId);
    toggleBottomNavigationView2();
  };
  
  const [tokken , setTokken] = useState('')

  const checkEmail=()=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email!=""){
      if (reg.test(email) === false) {
        setToastMessage("Email is Not Correct");
    
        return false;
      } else {
    fetch(URL+'/check_existing_email/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
     })
    
       
    }).then( async (response) => {
     let data = await response.json();
     console.log("signup",data)
     console.log("signup",response.status)
     if(response.status==400){
        // alert("works");
        setIsEmail(true);

       setToastMessage("")

      //  navigation.navigate("VerificationCode" , {Email : email , Phone_No : formattedValue,EmailVerify:"EmailVerification", first_name: firstName,
  //        last_name: lastName,
  //        email:email,
  //        phone_number:formattedValue,
  //        password: password,
  //        address: RiderAddress,
  //   })
       
     }
    else{
      setIsEmail(false);

       setToastMessage(data.message)
      //  setIsLoading(false);
      //  alert(data.message);
     }
     

    
   })
    .catch ((error)=>
      console.log("Something went wrong", error)
    )
    }
      
  }
  else{
    setToastMessage("Please Enter Email");
  }
  }

  const SendOtp=()=>{
   
      fetch(URL+'/send_otp/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
    
       body : JSON.stringify({
    
        "phone_number" : formattedValue
      
      
      })
        
    
        
      }).then( async (response) => {
           let data = await response.json();
           console.log("send otp",data)
           console.log("send otp",response.status)
           if(response.status==200){
             
             
              setToastMessage("");
              setLoading(false);
              navigation.navigate("VerificationCode" , {Email : email , Phone_No : formattedValue,EmailVerify:"EmailVerification", first_name: firstName,
              last_name: lastName,
              password: password,
              address: RiderAddress,
              gender:selectedValue=="key"?"male":"female",
              packageId:packageId
               })
            
            
             
           }
          else{
      setLoading(false);
  
             setToastMessage(data.message)
            //  setIsLoading(false);
            //  alert(data.message);
           }
          
  
           
         }).catch((error)=>console.log(error))
    }
  
    
  
  useEffect(() => {




    
  
        fetch(URL+'/delivery_person/list_packages/')
        // fetch(URL+'/client_app/clients_list/33/')
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.all_package==""){
              setPackageLoading(true);
            }else{
              setPackageLoading(false);
              console.log("Packages:",responseJson);
              setPackageData(responseJson.all_package);
            }
           
        // setLoading(false);

            //   console.log("Dashboard:",responseJson.client_dashboard.client_name);
              //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
            // if (json["response"] == "Record does not exist or not found") {
            //   setLoading(true);
            // } else {
            //   dispatch(ApiDataAction.SetListData(responseJson)); 
            //   dataa=responseJson;
            //   setData(responseJson);
            //   //console.log(json);
            
            // }
          })
          .catch((error) => console.error(error))
  
  
  
  
  
  
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
  
  },[]);



  const checkPhoneNumber=()=>{
    setLoading(true);
      fetch(URL+'/check_existing_phone/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "phone":formattedValue,
       })
      
         
      }).then( async (response) => {
       let data = await response.json();
       console.log("Exiting Phone Number",data)
       console.log("Exiting Phone Number",response.status)
       if(response.status==400){
        if(isEmail!=true){
          setLoading(false);

           alert("This Email Already Exists, Please Change the Email")
           setToastMessage("");
         }
         else{
         
            setToastMessage("");
            if(terms){
              SendOtp();     
  
            }
            else{
            setLoading(false);
  
              setToastMessage("Please Accept Terms & Conditions")
            }
          
          

         }
       }
      else{
    setLoading(false);

         setToastMessage(data.message)
        //  setIsLoading(false);
        //  alert(data.message);
       }
       
  
      
     })
      .catch ((error)=>
        console.log("Something went wrong", error)
      )
    
   
    
  }


  

  const addCompanyInfo = () => {
    // console.log("Phon number",formattedValue)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log("Gender",selectedValue);
    console.log("phone Number",formattedValue);
    if (firstName=="" && lastName=="" &&email == '' && password == '' &&  confirmPassword == '' && formattedValue == ''&&RiderAddress=="") {
      alert("Please Enter Signup Details")
    }
    else{
    if(email==""){
      setToastMessage("Please Enter Email");

      // alert("Please Enter Email")
    }
    else{
      if (reg.test(email) === false) {
          setToastMessage("Email is Not Correct");
      
          return false;
        }
        
      else if (password != confirmPassword) {
        setToastMessage("Password Does not match");
      } else {
        if(firstName==""){
          setToastMessage("Please Enter First Name");
        }
        else if(lastName==""){
          setToastMessage("Please Enter Last Name");
        }
         else if(packageId==""){
            setToastMessage("Please Select Package");
          }
        else if(RiderAddress==""){
          setToastMessage("Please Enter Address");
        }
        else if(formattedValue==""){
          setToastMessage("Please Enter Phone Number");
        }
        else if(password=="") {
          setToastMessage("Please Enter Password");

        }
        else if(password.length < 8) {
          setToastMessage("Password limit should be Greater than 7 Digits");

        }
        else{
          //Password Limit
      
          
            setToastMessage("");
          
          if (firstName!="" && lastName!="" &&email != '' && password != '' &&  confirmPassword != '' && formattedValue != ''&&RiderAddress!="") {
              console.log(toastMessage)
              if(toastMessage==""||toastMessage=="This phone number already exists as a delivery person"||toastMessage=="This phone number already exists"||toastMessage=="This phone number already exists as a client"||toastMessage=="Please Enter Phone Number"){
                checkPhoneNumber();
                setIsLoading(true);
              }
               
                
                
              // setToastMessage("");
              // alert("Its work")
            
             
              
            //     const res = fetch(URL+'/check_existing_email_phone/', {
            //     method: 'POST',
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json'
            //     },
            //     body:JSON.stringify({
            //       "email":email,
            //       "phone_number":formattedValue,
            //    })
              
                 
            //   }).then( async (response) => {
            //    let data = await response.json();
            //    console.log("signup",data)
            //    console.log("signup",response.status)
            //    if(response.status==400){
            //     //  navigation.navigate("VerificationCode" , {Email : email , Phone_No : formattedValue,EmailVerify:"EmailVerification", first_name: firstName,
            // //        last_name: lastName,
            // //        email:email,
            // //        phone_number:formattedValue,
            // //        password: password,
            // //        address: RiderAddress,
            // //   })
                 
            //    }
            //   else{
            //     //  setToastMessage(data.message)
            //     //  setIsLoading(false);
            //     //  alert(data.message);
            //    }
               
  
              
            //  })
            //   .catch ((error)=>
            //     console.log("Something went wrong", error)
            //   )
            //   const res = fetch(URL+'/delivery_person/delivery_person_registration/', {
            //     method: 'POST',
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json'
            //     },
            //     body:JSON.stringify({
                
               
            //        "first_name": firstName,
            //        "last_name": lastName,
            //        "email":email,
            //        "phone_number":formattedValue,
            //        "password": password,
            //        "package": 1,
            //        "current_location": "",
            //        "address": RiderAddress,
            //        "buying_capacity": 50000,
            //        "gender": "male",
            //        "image": "",
            //        "admin_approval_status":"pending"
                 
            //    })
              
                 
            //   }).then( async (response) => {
            //    let data = await response.json();
            //    console.log("signup",data)
            //    console.log("signup",response.status)
            //    if(response.status==200){
            //      navigation.navigate("VerificationCode" , {Email : email , Phone_No : formattedValue,EmailVerify:"EmailVerification"})
                 
            //    }
            //   else{
            //      setToastMessage(data.message)
            //      setIsLoading(false);
            //     //  alert(data.message);
            //    }
            //    if(data=="Phone Number already registered!"){
            //     setToastMessage(data)
            //     setIsLoading(false);
            //    }
  
            //    //send_Verification_Code()
            //    // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber,})
            //  })
            //   .catch ((error)=>
            //     console.log("Something went wrong", error)
            //   )
              
            } else {
              //alert("All fields are required")
              //setWrongEmail(false)
              setIsLoading(false);
      
              setToastMessage("All fields are required");
            }
          
        }
    }
    }
      
    
    }
  //  console.log("Phone Number",phone_No)

   
 setIsLoading(false)

   }
    


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
    
    <View style={styles.container}>
    {/* <ScrollView style={{backgroundColor:'white'}}> */}

{/* <View style={styles.spinnerv}> */}
{/* {
  state?
  <ActivityIndicator size={100} /> :
  <Text> loading... </Text>
} */}
{/* </View> */}


  <View style={styles.header}>
  <ImageBackground
      source={require('../assets/Splash.jpg')} 
      style={{width: "100%", height: "100%"}}
      >
      <Text style={{color:"white",
        fontSize:35,alignSelf:"center",marginTop:'15%',borderBottomWidth:1, borderBottomColor:'white',fontWeight:'bold'}}>
            SIGN UP
        </Text>
        <Text style={{color:Colors.yellowColor,marginVertical:15,
        fontSize:16,alignSelf:"center",marginTop:10}}>
          Enter Your Information and Register Yourself
        </Text>
      </ImageBackground>
  </View>
  
  
 
  <View style={styles.footer}>
 
    {/* <View style={styles.g_container}> */}
    {/* <KeyboardAvoidingView
           behavior="padding"
           keyboardVerticalOffset={50}
        > */}
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* <FormSignup type="SignUp"/> */}
          <View style={{flexDirection:'row',alignSelf:'center'}}>
          <TextInput
            style={styles.name_inputArea}
            placeholder="First Name"
            autoCapitalize="words"
            placeholderTextColor={Colors.textGreyColor}
            value={firstName}
            required={true}
            onChangeText={(value) => setFirstName(value)}
            initialValue=""
          />

          <TextInput
            style={styles.name2_inputArea}
            placeholder="Last Name"
            autoCapitalize="words"
            placeholderTextColor={Colors.textGreyColor}
            value={lastName}
            required={true}
            onChangeText={(value) => setLastName(value)}
            initialValue=""
          />
          </View>
          <TextInput
            style={styles.inputArea}
            placeholder="Email"
            required={true}
            autoCapitalize="none"
            placeholderTextColor={Colors.textGreyColor}
            keyboardType="email-address"
            errorMessage="Please enter a valid email address."
            value={email}
            onChangeText={(value) => setEmail(value)}
            onEndEditing={checkEmail}
            initialValue=""
          />

          <View style={styles.inputArea}>
          <TextInput
            style={{width:"95%"}}
            placeholder="Password"
            secureTextEntry={securePass}
            autoCapitalize="none"
            required={true}
            placeholderTextColor={Colors.textGreyColor}
            minLength={6}
            errorMessage="Please enter Minimum 6 characters password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            initialValue=""
          />
          <View style={{alignSelf:'center'}}>
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
          <View style={styles.inputArea}>
           <TextInput
            style={{width:"95%"}}
            placeholder="Confirm Password"
            secureTextEntry={secureConfirmPass}
            autoCapitalize="none"
            required={true}
            placeholderTextColor={Colors.textGreyColor}
            minLength={6}
            errorMessage="Please enter Minimum 6 characters password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            initialValue=""
          />
          <View style={{alignSelf:'center'}}>
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
          <TextInput
            style={styles.inputArea}
            placeholder="Address"
            autoCapitalize="none"
            placeholderTextColor={Colors.textGreyColor}
            value={RiderAddress}
            required={true}
            onChangeText={(value) => setRiderAddress(value)}
            initialValue=""
          />
          {/* </View> */}

          <View style={styles.DropDown_inputArea}>
            <Picker 
              mode="dropdown"
              // iosIcon={<Icon name="arrow-down" />}
              
              headerStyle={{ backgroundColor: Colors.themeColor }}
             headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={selectedValue}
              style={{ height: 40, width: 150, }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              
              itemStyle={{ backgroundColor: "white", color: Colors.themeColor, fontSize:17 }}
            >
              <Picker.Item label="Male" value="key" />
              <Picker.Item label="Female" value="key0" />
              {/* <Picker.Item label="Buy 2 Get 1" value="key1" />
              <Picker.Item label="Buy 2 Get 2" value="key2" />
              <Picker.Item label="Special Deal" value="key3" />
              <Picker.Item label="Deal for 2" value="key4" /> */}
            </Picker>
            </View>




          <View>
            <PhoneInput
            containerStyle={styles.phoneStyle}
            textContainerStyle={styles.textStyle}
            textInputStyle={{height:40}}
              ref={phoneInput}
              defaultValue={value}
              // initialCountry={"UK"}
              // withCountryNameButton="United Kingdom"
              defaultCode="GB"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setToastMessage("");
              }}
              // onEndEditing={checkPhoneNumber}
              // withDarkTheme
              // withShadow
              autoFocus={false}
            />
            </View>

            <View style = {{padding:10 }}>

<Card
  style={{
    padding: 10,
    borderRadius:10,
    backgroundColor: "#F2F1F3",
    elevation: 0,
    width:"90%",
    alignSelf:'center'
  }}
>
  <TouchableOpacity onPress={toggleBottomNavigationView2}>
    <View style={{flexDirection:'row'}}>
    <Text style={{ color: Colors.themeColor, fontSize: 12,fontWeight:'bold' }}>
      Select Package
    </Text>
    <FontAwesome name="chevron-down" color={Colors.themeColor} size={14} style={{marginLeft:5,color:Colors.themeColor,alignSelf:'center'}} />
    </View>
   

    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
      {packageName}
    </Text>
    {/* <Text style={{ fontSize: 12, color: "#666666" }}>
      {riderAddress}
    </Text> */}
  </TouchableOpacity>
</Card>
<BottomSheet
  visible={visible2}
 
  onBackButtonPress={toggleBottomNavigationView2}
 
  onBackdropPress={toggleBottomNavigationView2}

>
  
  <View style={styles.bottomNavigationView2}>
    {packageLoading ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
         
          marginTop: "20%",
        }}
      >
        <Text
          style={{
            color: Colors.themeColor,
            fontWeight: "bold",
            marginTop: 20,
            fontSize: 25,
            textAlign: "center",
          }}
        >
         Packages are Not Available
        </Text>
      </View>
    ) : (
      <FlatList
            data={packageData}
            keyExtractor={item => item.id}
            style={{width:'100%'}}
            renderItem={itemData => (
                <TouchableOpacity onPress={() =>
                  packagedDetail(
                    itemData.item.name,
                    itemData.item.no_of_invoices,
                    itemData.item.id
                  )
                } style={{width:'90%',alignSelf:'center',marginTop:10,bottom:5}}>
                <ImageBackground
   
   source={itemData.item.name=="Starter" ?require(`../assets/Starter.jpg`):itemData.item.name=="Green" ?require(`../assets/Green.jpg`):itemData.item.name=="Gold" ?require(`../assets/Gold.png`):itemData.item.name=="Platinum" ?require(`../assets/Platinum.png`):null}         
                        style={{ width: "100%", height:130}}
                        >
                         <View style={{height:"100%"}}>
                             <View style={{height:"48%",width:'75%',justifyContent:'center'}}>
                                
                                 <Text style={{color:'white',fontSize:18,textAlign:'center',fontWeight:'500',letterSpacing:1}}>{itemData.item.name.toUpperCase()}</Text>
         
                                 
                             </View>
                             <View style={{height:"53%",width:"100%",flexDirection:'row'}}>
                                 <View style={{width:"50%",justifyContent:'center'}}>
                                 {itemData.item.no_of_invoices=="-1"?<Text style={{color:'white',fontSize:17,textAlign:'center'}}>UNLIMITED</Text>:<Text style={{color:'white',fontSize:24,textAlign:'center'}}>{itemData.item.no_of_invoices}</Text>}
                                     
                                     <Text style={{color:'white',fontSize:10,textAlign:'center'}}>INVOICES</Text>
         
                                 </View>
                                 <View style={{width:"50%",justifyContent:'center'}}>
                                     <View style={{flexDirection:'row',justifyContent:'center'}}>
                                     <Text style={{color:'white',fontSize:24,textAlign:'center'}}>{itemData.item.price}</Text>
                                     <Text style={{color:'white',fontSize:14,paddingTop:10,paddingLeft:2}}>£</Text>
                                     </View>
                                     <Text style={{color:'white',fontSize:10,textAlign:'center'}}>PRICE</Text>
                                     
                                 </View>
                             </View>
                            
                         </View>
                            
         
                        </ImageBackground>
                
                </TouchableOpacity>
            )}
        />
    )}
  </View>
</BottomSheet>
</View>



            <View style={{flexDirection:'row',alignSelf:'center'}}>   
            <CheckBox
          value={terms}
          onValueChange={setTerms}
          boxType="square"
          onAnimationType="fade"
          onTintColor={Colors.themeColor}
          onCheckColor={Colors.themeColor}
          tintColors={{ true: Colors.themeColor, false: 'black' }}
          // style={{height:10,width:10}}
          style={{ transform: [{ scaleX: Platform.OS=="android"? 1:0.7 }, { scaleY: Platform.OS=="android"? 1:0.7 }] }}
        />
                <View style={{flexDirection:'row',alignSelf:"center",marginBottom:Platform.OS=="android"?null:7}}>
                  <Text style={{fontSize:14, marginRight:5 }}>Accept</Text> 
                  <TouchableOpacity onPress={()=>navigation.navigate("TermCondition")}>
                    <Text style={{fontSize:14,color:Colors.themeColor,fontWeight:'bold' }}>Terms & Conditions</Text> 

                  </TouchableOpacity>

                </View>

                {/* <Text> {cash} </Text> */}
        </View>
           

          {/* <TextInput
            style={styles.inputArea}
            placeholder="Contact No"
            required={true}
            autoCapitalize="none"
            placeholderTextColor="black"
            keyboardType="numeric"
            minLength={11}
            errorMessage="Please enter a valid Phone number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            initialValue=""
          /> */}
           {toastMessage!=""?<Text style={{color:Colors.themeColor,fontWeight:'bold',textAlign:'center',marginTop:10}}>{toastMessage}</Text>:null}
           {isLoading ? (
          <Spinner color={Colors.themeColor}
          //visibility of Overlay Loading Spinner
          visible={isLoading}
          // size="normal"
          // animation='fade'
          //Text with the Spinner
          // textContent={'Loading...'}
          //Text style of the Spinner Text
          // textStyle={styles.activityIndicator}
        />):(

          <TouchableOpacity
          // disabled={toastMessage==""?false:true}
          style={styles.signupButton}
          activeOpacity={0.7}
          onPress={addCompanyInfo}>
             {loading ? (
              <Spinner color={"white"} />
            ) : (
          <Text style={styles.signupButtonText}> SIGN UP</Text>
            )}
        </TouchableOpacity>
        )}


<View style={styles.signupContianer}>
      <Text style={styles.signupText}> Already have an Account!  </Text>
      

        <TouchableOpacity 
         onPress={ () => navigation.navigate("Login")} >
        <Text style={{color:Colors.darkRedColor}}>
         Login
          </Text>
      </TouchableOpacity>
                
    </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      
      
    {/* </View> */}
    
  </View>
  {/* </ScrollView> */}
 
 
{/* </ScrollView> */}
 
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  phoneStyle:{
  
    marginVertical:10,
    height: Platform.OS=="android"?40:60, 
    width:"90%",
    alignSelf:'center',
     backgroundColor: '#F2F1F3',
    borderRadius:25,
    paddingHorizontal:10,
    flexDirection:'row'
  },
  
  textStyle:{
  
    borderRadius:12,
    // paddingTop:5,
    //marginTop:10,
    alignContent:'center',
    backgroundColor: '#F2F1F3',
    //color:'black'
  },
  inputArea:{
    marginVertical:10,
    height: 40, 
    width:"90%",
    alignSelf:'center',
     backgroundColor: '#F2F1F3',
    borderRadius:25,
    paddingHorizontal:30,
    flexDirection:'row'
},
DropDown_inputArea:{
  
  marginVertical:10,
  height: 40, 
  width:"90%",
    alignSelf:'center',
   backgroundColor: '#F2F1F3',
  borderRadius:25,
  paddingHorizontal:Platform.OS=="android"? 20:15,
  flexDirection:'row'
},
name_inputArea:{
  marginVertical:10,
  height: 40, 
  width:"42%",
   backgroundColor: '#F2F1F3',
  borderRadius:25,
  paddingHorizontal:30,
},
name2_inputArea:{
  marginLeft:20,
  marginVertical:10,
  height: 40, 
  width:"42%",
   backgroundColor: '#F2F1F3',
  borderRadius:25,
  paddingHorizontal:30,
},
signupButtonText:{
  fontSize: 20,
color: '#ffffff',
fontWeight: 'bold',
textAlign: 'center',
},

  signupText: {
    alignSelf:'center',
    fontSize: 14,
fontWeight: 'bold',
// color:'rgba(255,255,255, 0.7)',
color: 'black',
    },
  //   radioButtonContainer:{
  //     alignSelf:'center',
  //     flexDirection: 'row',
  //     // paddingTop:10,
  //     // marginLeft:5,
  //    // marginRight:10
  
  // },

  signupButton: {
    height: 40,
  width: "90%",
backgroundColor: '#EE0202',
justifyContent:"center",
alignSelf:'center',
borderRadius: 25,
marginVertical: 20,
  },

  header: {
    flex:2,
    width:"100%",
    //backgroundColor:'#EE0202',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  footer: {
    flex: 6,
    width:"100%",
    backgroundColor: '#ffffff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingVertical: 10,
   
     
  },

  button: {
    height: 40,
    width: "90%",
  backgroundColor: Colors.themeColor,
  justifyContent:"center",
  borderRadius: 25,
  marginVertical: 20,
  },

  buttonText: {    
    color:'#ffffff',
    fontWeight:'bold',
    fontSize: 20
  },

  signupContianer:{
    flexGrow: 1,
justifyContent: 'center',
alignSelf:'center',
// alignItems: 'center',
flexDirection: 'row',

  },
  g_container: {
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
    },
    bottomNavigationView2: {
      backgroundColor: "#F2F1F3",
      width: "100%",
      height: "100%",
  
      // justifyContent: 'center',
      //alignItems: 'center',
    },

  
});

export default Signup;









