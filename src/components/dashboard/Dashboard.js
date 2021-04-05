

import React,{useState ,useEffect} from 'react';
import { StyleSheet, View,ImageBackground , TouchableOpacity,Image, ScrollView,StatusBar,SafeAreaView,BackHandler,Alert, Platform} from 'react-native'
import { Container,Card,CardItem,Header,Content,Left,Footer ,Body, Right, Button,Drawer, Title,Text , Item,Input,Spinner } from 'native-base';

// import { ScrollView } from 'react-native-gesture-handler';
//import PreviousShipments from '../shipment/PreviousShipments'
import { useSelector, useDispatch } from 'react-redux';
import * as ApiDataAction from '../../store/actions/ApiData';
import AsyncStorage from '@react-native-community/async-storage'
import URL from '../../api/ApiURL';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyHeader from '../../components/MyHeader';
//import {useRoute, useFocusEffect} from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../ColorCodes/Colors';
// import { SafeAreaView } from 'react-native-safe-area-context';
const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();

  const RiderId=useSelector(state=>state.ApiData.RiderId);
  const RiderName=useSelector(state=>state.ApiData.RiderName);
  const RiderPackage=useSelector(state=>state.ApiData.RiderPackage);
  const CompletedOrders=useSelector(state=>state.ApiData.CompletedOrders);
  const ProgressOrders=useSelector(state=>state.ApiData.ProgressOrders);
  const PendingOrders=useSelector(state=>state.ApiData.PendingOrders);
  const RemainingInvoices=useSelector(state=>state.ApiData.RemainingInvoices);
  const TotalInvoices=useSelector(state=>state.ApiData.TotalInvoices);
  const UsedInvoices=useSelector(state=>state.ApiData.UsedInvoices);
  const RiderImage = useSelector((state) => state.ApiData.RiderImage);
  const [imageLoading,setImageLoading]=useState(false);
  console.log("riderId",RiderId)
  const [data,setData]=useState("");
   //const { params } = route.params
 var dataa=0;

 console.log("Rider Image",RiderImage);


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
  }, [route]),
);
   useEffect(() => {
    // setImageLoading(true);
    //   console.log("hi---------------")
    if(RiderId!=0){
      fetch(URL+'/delivery_person/delivery_person_dashboard/'+RiderId+'/')
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
            console.log("Dashboard:",responseJson);
            // if(responseJson.message!='Incorrect Delivery Person ID')
            // console.log("Dashboard:",responseJson.Rider_dashboard.Rider_name);
            //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
          // if (json["response"] == "Record does not exist or not found") {
          //   setLoading(true);
          // } else {
            dispatch(ApiDataAction.SetListData(responseJson)); 
            dataa=responseJson;
            setData(responseJson);
          //   //console.log(json);
          // }
        })
        .catch((error) => console.error(error))


        if(RiderImage==""){
          setImageLoading(true);
            
            fetch(URL + "/delivery_person/get_delivery_person_logo/"+RiderId+"/")
          // fetch(URL+'/client_app/clients_list/33/')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(
              " Getting Image:",
              responseJson
            );
            dispatch(ApiDataAction.SetImage(responseJson.image));
            setImageLoading(false);
            // setImageCheck(false);
            // setImage(responseJson.image);
          })
          .catch((error) => console.error(error));
          }
    }
    
      
    
    
    
     // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [isFocused]);
  // const dispatch = useDispatch();
  // const [listResponse,setListResponse]=useState("");
  // const ClientId=useSelector(state=>state.ApiData.ClientId);
// import { ScrollView } from 'react-native-gesture-handler';
// import PreviousShipments from '../shipment/PreviousShipments'
// import AsyncStorage from '@react-native-community/async-storage'
// import URL from '../../api/ApiURL'
// import { SafeAreaView } from 'react-native-safe-area-context';
var check=true;





  
    
  //   if(check==true){
  //   fetch(URL+'/client_app/clients_list/'+ClientId+'/')
    
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     //console.log("List: ",responseJson)
  //     setListResponse(responseJson);
  //     check=false;
  //   }) .catch ((error)=>
  //   console.log("Something went wrong", error)
  // )
  //   }
  //   //console.log("listItem",listResponse)
  //   dispatch(ApiDataActions.SetListData(listResponse));
    
    
  
  


  //const [data, setData] = useState([]);
  
  // useEffect(() => {
  //   fetch(URL+'/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=pending')
  //     .then((response) => response.json())
  //     .then((response) => setCountPending(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("Pending",countpending)
  //     if(countpending == ""){
  //       console.log(countpending);
  //       setCountPending("0")
  //     }


  //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=in_progress')
  //     .then((response) => response.json())
  //     .then((response) => setInProgress(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("InProgress",InProgress)
  //     if(InProgress == ""){
  //       setInProgress('0')
  //     }

  //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=complete')
  //     .then((response) => response.json())
  //     .then((response) => setCountCompleted(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("Completed",countCompleted)
  //     if(countCompleted == ""){
  //       setCountCompleted('0')
  //     }


      
      
  // }, []);



  
  return (
    <>
    <SafeAreaView style={styles.topSafeArea} />
    <SafeAreaView style={styles.bottomSafeArea}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.themeColor} />
    {/* <MyHeader name="DASHBOARD" nav={navigation}/> */}
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.header}>
      {/* <View style={{flex:2}}> */}

      
    {/* </View> */}
    
    <View style={{flexDirection:'row',alignSelf:'center',paddingTop:20,alignItems:'center',justifyContent:'center',width:"100%"}}>
    {imageLoading ? (
                  <Spinner color="white" />
                ) : (
    <View style={{marginLeft:10}}>
   
      <Image source={RiderImage==null||RiderImage==""?require('../../assets/profilelogo.png'):{uri:RiderImage}} 
      style={{ width:Platform.OS=='ios'? 110:110,height:Platform.OS=='ios'? 110:110,borderRadius:100}}  
      />
      
    </View>
    )}
    <View style={{paddingLeft:12}}>
      <View style={{backgroundColor:Colors.yellowColor,width:Platform.OS=="android"?63:70,height:15, borderRadius:2}}>
      <Text style={{color:Colors.darkRedColor,fontSize:12,alignSelf:'center',fontWeight:'bold'}}>{RiderPackage.toUpperCase()}</Text>
      </View>
      
      <Text style={{color:'white',fontWeight:'bold',fontSize:Platform.OS=='android'? 20:22,width:210,marginBottom:2}}>{RiderName}</Text>
    <Text style={{height: 2,
  width: "95%",
  backgroundColor: Colors.yellowColor,}}></Text>

      <View style={{flexDirection:'row',paddingTop:8}}>
        <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5,height:33,width:40}}>
        {RemainingInvoices==-1?<Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?16:16,padding:6}}>∞</Text>:<Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?16:16,padding:6}}>{RemainingInvoices}</Text>}
        </View>
        <Text style={{color:'white',height:40,fontSize:Platform.OS=='android'? 13:13,marginLeft:5,width:Platform.OS=='android'?75:75,fontWeight:'bold'}}>Remaining Invoices</Text>
        <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5,height:33,width:40}}>
        <Text style={{color:Colors.themeColor,fontWeight:'bold',textAlign:'center',fontSize:Platform.OS=='android'?16:16,padding:6}}>{UsedInvoices}</Text>
        </View>
        <Text style={{color:'white',width:70,height:40,fontSize:Platform.OS=='android'? 13:13,marginLeft:5,fontWeight:'bold'}}>Used Invoices</Text>
      

      </View>

    </View>
    </View>

    </View>

    <View style={styles.footer}>
      <View style={{width:'100%'}}>
    <View style={{flexDirection:'row',alignItems:'space-around',padding:35,justifyContent:'space-around'}}>
    <View style={{flexDirection:'column'}}>
    <View style={{flexDirection:'row',alignSelf:'center'}}>
      <View style = {{alignSelf:'center'}}>
    <MaterialIcons  name="hourglass-top" style={{color:Colors.themeColor,}} size={Platform.OS=='android'?35:40} />
    </View>
    <Text style={{fontSize:Platform.OS=='android'? 50:45}}>{ProgressOrders}</Text>

    </View>
    <View>
    <Text style={{width:90,textAlign:'center',fontWeight:'bold',fontSize:13,color:Colors.productGrey}}>IN PROGRESS ORDERS</Text>
    </View>
    </View>
    
    <Text style={{height: '100%',
  width: 1,
  backgroundColor: Colors.textGreyColor,marginLeft:"2%"}}></Text>
    <View style={{flexDirection:'column'}}>
    <View style={{flexDirection:'row',alignSelf:'center'}}>
    <View style = {{alignSelf:'center'}}>
    <MaterialCommunityIcons name="check-box-multiple-outline" color = {Colors.themeColor} size={Platform.OS=='android'?35:40} />
    </View>
    <Text style={{fontSize:Platform.OS=='android'? 50:45}}>{CompletedOrders}</Text>
    </View>
    <Text style={{width:90,textAlign:'center',fontWeight:'bold',fontSize:13,color:Colors.productGrey}}>COMPLETED ORDERS</Text>
    </View>
    <Text style={styles.verticleLine}></Text>

    <View style={{flexDirection:'column',}}>
    <View style={{flexDirection:'row',alignSelf:'center'}}>
    {/* <Image source={require('../../assets/red_pending.png')} style={{width:Platform.OS=='ios'? 60:30,height:Platform.OS=='ios'? 65:30,alignSelf:'center'}}  /> */}
    <View style = {{alignSelf:'center'}}>

    <MaterialCommunityIcons  name="clock-time-four-outline" style={{color:Colors.themeColor}} size={Platform.OS=='android'?35:40} />
     </View>
    {/* <MaterialCommunityIcons name="check-box-multiple-outline" color = {Colors.themeColor} size={Platform.OS=='android'?50:70} /> */}
    <Text style={{fontSize:Platform.OS=='android'? 50:45}}>{PendingOrders}</Text>
    </View>
    <Text style={{width:70,textAlign:'center',fontWeight:'bold',fontSize:13,color:Colors.productGrey}}>PENDING ORDERS</Text>
    </View>
    </View>
    </View>

    <View style={{flexDirection:'column',alignItems:'center',}}>
    <View style={{flexDirection:'row',paddingHorizontal:25}}>
    {/* <TouchableOpacity
    onPress = { ()=>alert("This screen is not exist yet")}
    style = {{justifyContent:'center',marginLeft:20,backgroundColor:Colors.themeColor,padding:10,borderRadius:18}}>
          <View style={{alignSelf:'center',flexDirection:'row'}}>
          <Ionicons name="ios-add-circle-outline" color ='white' size={Platform.OS=='android'?25:30} style={{alignSelf:'center'}}/>
          <Text style={{color:'white',fontWeight:'bold',justifyContent:'center',marginLeft:5,fontSize:20}}>Create New Order</Text>
          </View>
    </TouchableOpacity> */}
  <TouchableOpacity
    onPress = { ()=>navigation.navigate("PendingOrdersList")}
        style = {{justifyContent:'center',backgroundColor:Colors.themeColor,padding:20,borderRadius:12,width:'50%'}}>
          <View style={{alignSelf:'center',flexDirection:'column'}}>
      <Image source={require('../../assets/pending.png')} style={{width:Platform.OS=='ios'? 60:40,height:Platform.OS=='ios'? 60:40,alignSelf:'center'}}  />

          {/* <MaterialCommunityIcons name="check-box-multiple-outline" color = 'white' style={{alignSelf:'center'}}  size={Platform.OS=='android'?40:50} /> */}
          <Text style={{color:'white',fontWeight:'bold',width:150,textAlign:'center',fontSize:16,marginTop:5}}>Pending Orders</Text>
          </View>
    </TouchableOpacity>
    
    <TouchableOpacity
    onPress = {()=>navigation.navigate("TopTabNavigator")}
        style = {{justifyContent:'center',marginLeft:'2%',backgroundColor:Colors.themeColor,padding:20,borderRadius:12,width:'50%'}}>
          <View style={{alignSelf:'center',flexDirection:'column'}}>
          <MaterialIcons name="hourglass-top" color = 'white' size={Platform.OS=='android'?40:50} style={{alignSelf:'center'}} />
          <Text style={{color:'white',fontWeight:'bold',width:150,textAlign:'center',fontSize:16,marginTop:5}}>In Progress Orders</Text>
          </View>
    </TouchableOpacity>

    
</View>
<View style={{flexDirection:'row',paddingHorizontal:25,marginTop:'2%',marginBottom:"2%"}}>
<TouchableOpacity
    onPress = { ()=>navigation.navigate("PurchasedOrdersList")}
        style = {{justifyContent:'center',backgroundColor:Colors.themeColor,padding:20,borderRadius:12,width:'50%'}}>
          <View style={{alignSelf:'center',flexDirection:'column'}}>
      <Image source={require('../../assets/purchased.png')} style={{width:Platform.OS=='ios'? 40:40,height:Platform.OS=='ios'? 40:40,alignSelf:'center'}}  />

          {/* <MaterialCommunityIcons name="check-box-multiple-outline" color = 'white' style={{alignSelf:'center'}}  size={Platform.OS=='android'?40:50} /> */}
          <Text style={{color:'white',fontWeight:'bold',width:150,textAlign:'center',fontSize:16,marginTop:5}}>Purchased & Priced</Text>
          </View>
    </TouchableOpacity>
<TouchableOpacity
    onPress = { ()=>navigation.navigate("CompletedOrdersList")}
        style = {{justifyContent:'center',marginLeft:'2%',backgroundColor:Colors.themeColor,padding:20,borderRadius:12,width:'50%'}}>
          <View style={{alignSelf:'center',flexDirection:'column'}}>
          <MaterialCommunityIcons name="check-box-multiple-outline" color = 'white' style={{alignSelf:'center'}}  size={Platform.OS=='android'?40:50} />
          <Text style={{color:'white',fontWeight:'bold',width:150,textAlign:'center',fontSize:16,marginTop:5}}>Completed Orders</Text>
          </View>
    </TouchableOpacity>
    
    {/* </View> */}
   
   </View>
   </View>

    {/* <View style={{flexDirection:'row',marginTop:'2%',paddingHorizontal:25,marginBottom:'2%'}}>

    <TouchableOpacity
    onPress = { ()=>alert("This screen is not exist yet")}
        style = {{justifyContent:'center',backgroundColor:Colors.themeColor,padding:20,borderRadius:12,width:'50%'}}>
          <View style={{alignSelf:'center',flexDirection:'column'}}>
      <Image source={require('../../assets/supplier.png')} style={{width:Platform.OS=='ios'? 60:40,height:Platform.OS=='ios'? 60:40,alignSelf:'center'}}  />

          {/* <MaterialCommunityIcons name="check-box-multiple-outline" color = 'white' style={{alignSelf:'center'}}  size={Platform.OS=='android'?40:50} /> */}
          {/* <Text style={{color:'white',fontWeight:'bold',width:150,textAlign:'center',fontSize:16,marginTop:5}}>Suppliers Orders</Text> */}
          {/* </View> */}
    {/* </TouchableOpacity> */}
    {/* </View> */} 

   



    </View>

   

    </ScrollView>
     </SafeAreaView>
  </>

  );
};

const styles = StyleSheet.create({
 image : {
  height:'90%',
  width:'100%',
  justifyContent:'center',
  
   
 
 },
 header: {
  flex: 2,
  paddingBottom:20,
  backgroundColor: Colors.darkRedColor,
},
verticleLine: {
  // marginRight:30,
  // marginTop:10,
  height: '100%',
  width: 1,
  backgroundColor: Colors.textGreyColor,
},

footer: {
  flex: 6.5,
  width:"100%",
  backgroundColor: '#ffffff',
  // borderTopLeftRadius: 30,
  // borderTopRightRadius: 30,
  // paddingVertical: 10,
  //paddingHorizontal:Platform.OS === 'android' ?20:40
   
},
 topSafeArea: {
  flex: 0, 
  // backgroundColor: 'blue'
}, 
bottomSafeArea: {
  flex: 1, 
  // backgroundColor: 'red'
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

export default Dashboard;
