import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  LogBox,
  TextInput,
  Modal,Pressable,Alert
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


import {
  Container,
  Header,
  Spinner,
  CardItem,
  Title,
  Thumbnail,
  Content,
  Text,
  Button,
  Left,
  Body,
  Accordion,
  Right,
  View,
} from "native-base";
// import Toast from 'react-native-simple-toast'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Collapse,CollapseHeader,CollapseFooter, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
//import ViewShot from "react-native-view-shot";
import Colors from '../../ColorCodes/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import URL from "../../api/ApiURL";
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card';
import * as ConsolidateAction from '../../store/actions/Consolidate';
import MyAlert from '../MyAlert';


const Consolidate = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
  const RiderId=useSelector(state=>state.ApiData.RiderId);
  const [currentDate, setCurrentDate] = useState('');

  const [formattedDate,setFormattedDate]=useState("");
  var datee;
  var monthh;
  var yearr;
  const jogar=useSelector(state=>state.Consolidate.items);
  console.log(jogar["unit_sales_price"],"======")
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.Consolidate.items) {
      transformedCartItems.push({
        product_id: key,
        // id:items[key],
        delivery_person_id:state.Consolidate.items[key].delivery_person_id,
        supplier: state.Consolidate.items[key].supplier,
        unit_purchase_price: state.Consolidate.items[key].unit_purchase_price,
        profit_margin: state.Consolidate.items[key].profit_margin,
        unit_sales_price: state.Consolidate.items[key].unit_sales_price,
        profit_margin_choice: state.Consolidate.items[key].profit_margin_choice,
        portrage_price:state.Consolidate.items[key].portrage_price,
        
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    
  }
  );
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log("currentDate",currentDate)
    setShow(Platform.OS === 'ios');
    if(parseInt((currentDate.getFullYear()))<parseInt(yearr)||(currentDate.getMonth() + 1)<monthh||((currentDate.getMonth() + 1)==monthh&& (currentDate.getDate())<datee))
    {
      alert("Selected Date is Invalid!");
    }
    else{
      setDate(currentDate);
      
    setFormattedDate(currentDate.getDate()+"-"+(currentDate.getMonth() + 1)+ "-" +currentDate.getFullYear());
    console.log("date",formattedDate)
    }
    
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  console.log(cartItems.unit_sales_price,"---------")
  var unitSale=cartItems.unit_sales_price;
  console.log("CartItem: ",cartItems);

  const OnSubmit=()=>{
    console.log("Count",count);
    if(count==length||count>length){
        const res = fetch(URL+'/order/insert_purchase_details/', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            
            "delivery_date":formattedDate==""?currentDate:formattedDate,
            "purchase_details": cartItems
               
              
             
           })
          
             
          }).then( async (response) => {
           let data = await response.json();
           console.log("put",data)
           console.log("put",response.status)
           if(response.status==200){
             console.log("Its work")
                // dropDownAlertRef.alertWithType('success', 'Success', 'Your Detail was Submitted.');
                alert("Your Details has been Submitted.");
                // Toast.show("Your Details has been Submitted.", Toast.LONG);

            //  alert("Your Detail was Submitted")
             dispatch(ConsolidateAction.AllClear(1)),
              setCount(0);
             navigation.navigate("Dashboard")
           }
        
           //send_Verification_Code()
           // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
         })
          .catch ((error)=>
            console.log("Something went wrong", error)
          )
          
    }
    else{
      // dropDownAlertRef.alertWithType('error', '', "Please Fill all the Tables then Press Submit");

        alert("Please Fill all the Tables then Press Submit")
    }
    
  }
//   const { Shipper_ID } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeIcon,setChangeIcon]=useState(false);
  const [supplier,setSupplier]=useState("");
  const [unitPurchasedPrice,setUnitPurchasedPrice]=useState(0);
  const [profitMargin,setProfitMargin]=useState(0);
  const [unitSalePrice,setUnitSalePrice]=useState(0);
  const [portagePrice,setPortagePrice]=useState(0);
  const [consoliDate,setConsoliDate]=useState("");
  const [length,setLength]=useState(0);
  var [count,setCount]=useState(0);
  const [noRecord,setNoRecord]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductName,setSelectedProductName]=useState("");
  const [selectedQty,setSelectedQty]=useState("");
  const [selectedUnit,setSelectedUnit]=useState("");
  const [selectedProductId,setSelectedProductId]=useState("");
  const [checked, setChecked] = useState('percentage');
  var reg = /^\d+(\.\d{1,2})?$/;
  var reg1 = /^\d+$/;
  const bgColor=[
    '#E21B1B',
    '#F7931E',
    '#8CC63F',
    '#6A68AD',
    '#62B4C0',
    '#9D7AAC'
  ];
  const [checkColor,setCheckColor]=useState(true);
  

  const checkPurchasedPrice=()=>{
    if(unitPurchasedPrice!=""){
      if(reg.test(unitPurchasedPrice) === false) {

        alert("Invalid Unit Purchased Price");
        setUnitPurchasedPrice("");
          return false;
      }
    }
    
  }
  const checkProfitMargin=()=>{
    if(profitMargin!=""){
      if(reg.test(profitMargin) === false) {

        alert("Invalid Profit Margin");
        setProfitMargin("");
          return false;
      }
    }
    
  }
  const checkPorteragePrice=()=>{
    if(portagePrice!=""){
      if(reg.test(portagePrice) === false) {

        alert("Invalid Porterage Price");
        setPortagePrice("");
          return false;
      }
    }
    
  }




  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  useEffect(() => {
    datee = new Date().getDate(); //Current Date
    monthh = new Date().getMonth() + 1; //Current Month
    yearr = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      datee + '-' +monthh+ '-' + yearr 
    );
    //   console.log("hi---------------")
    if(RiderId!=0){
      if(formattedDate=="")
    {
      fetch(URL+"/order/list_consolidate_purchases/"+RiderId+"/?order_delivery_datetime="+currentDate)
    // fetch(URL+'/client_app/clients_list/33/')
    .then( async (response) => {
        setIsLoading(true)
        let data = await response.json();
       
         // console.log("status code",response.status)
          console.log("Consolidate",data)
          if(response.status==200){
            console.log("Consolidate:",data);
            if(data.data=="No orders found against the given ID or provided date")
            {
                setLoading(true);
                setIsLoading(false)
            }
            else{
              setData(data);
          //console.log("length",data.data.length)
          setLoading(false)
          setIsLoading(false)
          setLength(data.data.length);
          }
            if(response.status==400){
            }
            
            
          }
          
          
          // console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
          
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error("From Consolidate",error))
    }
    else{
      fetch(URL+"/order/list_consolidate_purchases/"+RiderId+"/?order_delivery_datetime="+formattedDate)
    // fetch(URL+'/client_app/clients_list/33/')
    .then( async (response) => {
        setIsLoading(true)
        let data = await response.json();
       
         // console.log("status code",response.status)
         console.log("Consolidate",data)
          if(response.status==200){
            console.log("Consolidate:",data);
            if(data.data=="No orders found against the given ID or provided date")
            {
                setLoading(true);
                setIsLoading(false)
            }
            else {
                setData(data);
            //console.log("length",data.data.length)
            setLoading(false)
            setIsLoading(false)
            setLength(data.data.length);
            }
            
          }
          
          
          // console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
          
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error(error))
    }
    }
    
    
     // .finally(() => setIsLoading(false));
    

    //console.log(data)
  }, [changeIcon,isFocused,formattedDate]);
  
  return (
    <View style={{ flex:1,backgroundColor:"white"}}> 
    {/* <View style={{height:"70%"}}>  */}
      {/* <DropdownAlert ref={ref => dropDownAlertRef = ref} updateStatusBar={false} tapToCloseEnabled={true} errorColor={Colors.themeColor} closeInterval={1000} /> */}

     <View style={{padding:5,alignSelf:'center'}}>
<TouchableOpacity style = {{marginTop:15,marginBottom:5}} onPress={showDatepicker} >
<View style = {{
  width:320,
  height:40,
  backgroundColor:Colors.themeColor,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:"center",
  borderRadius:10,
  // flexDirection:'row',
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  // elevation: 5,
}}>
  

  {/* <View style={{alignSelf:'center'}}> */}
    {/* <Text style={{color:Colors.themeColor,fontSize:12}}>Delivery Date:</Text> */}
    <View style={{flexDirection:'row'}}>
      {formattedDate==""?<Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>{currentDate}</Text>: <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white"}}>{formattedDate}</Text>}
      <FontAwesome name="chevron-down" color={Colors.themeColor} size={14} style={{marginLeft:20,color:"white",alignSelf:'center'}} />
    </View>
    {/* <View style={{flexDirection:'row',width:320}}>
      <Text>Items</Text>
      <Text style={{}}>Quantity</Text>

    </View> */}
{/* </View> */}


</View>
</TouchableOpacity> 
{show && (
<DateTimePicker
testID="dateTimePicker"
value={date}
mode={'date'}
minimumDate={new Date()}
// is24Hour={true}
style={{color:Colors.themeColor}}
display="default"
dateFormat="day month year"
onChange={onChange}
/>
)}
</View>
      {/* {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
          }}
        >
          <FontAwesome name="exclamation-circle" color={Colors.themeColor} size={150} />
          <Text style={{ color: Colors.themeColor, fontWeight: "bold",marginTop:20, fontSize: 25 }}>
            NO RECORD
          </Text>
        </View>
      )} */}
      
      
      {isLoading ? (
        <Spinner color={Colors.themeColor}/>
      ) : (
        // console.log("data",data),
        <Content>
        <View >
       
        {loading?<View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
          }}
        >
          <FontAwesome name="exclamation-circle" color={Colors.themeColor} size={150} />
          <Text style={{ color: Colors.themeColor, fontWeight: "bold",marginTop:20, fontSize: 25 }}>
            NO RECORD
          </Text>
        </View>:
         <View style={{marginTop:10}}>
        {/* <Card style={{padding:5,marginLeft:10,width:'50%',backgroundColor:'white',elevation:0,alignSelf:'center'}}> */}


{/* </Card> */}
        <FlatList
          data={data.data}
          style={{alignSelf:'center'}}
          showsVerticalScrollIndicator={false}
          // keyExtractor={item => item.index_id.toString()}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
            <TouchableOpacity
        style = {{marginTop:5,marginBottom:5}}
            onPress={()=>{
                console.log("idddd",jogar[item.product_id])
                if (jogar[item.product_id]) {
      // dropDownAlertRef.alertWithType('error', '', item.product_name+" is already filled");

                    alert(item.product_name+" is already filled")
                }
                else{
                    setSelectedProductId(item.product_id),
                setSelectedProductName(item.product_name),
                setSelectedQty(item.qty),setSelectedUnit(item.unit),setModalVisible(!modalVisible)}}
                
                }
                
            >
                  <View style = {{width:"95%",height:60,backgroundColor:'white',alignSelf:"center",borderRadius:10,flexDirection:'row',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          }}>
             <View style = {{width:'70%',justifyContent:'center',paddingLeft:23}}>

             <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color:Colors.darkRedColor
                    //   marginTop: "4%",
                    }}
                  >
                      
                      {item.product_name} 
                  </Text>
             </View>
             <View style = {{width:'30%',justifyContent:'center',alignItems:'flex-end',paddingRight:23}}>

             <Text style={{ fontSize:12,color:Colors.textGreyColor}}>
                        Quantity
                    </Text>
                      <Text style={{fontSize:18,color:Colors.productGrey,fontWeight:"bold"}}>{item.qty} {item.unit}</Text>
             </View>


           </View>
               
               {/* <View
                style={{
                  flexDirection: "column",
                }}
              >
                  {/* <View style={{flexDirection: "column"}}> */}
                {/* <View style={{flexDirection:'row'}}>
                <View
                  style={{
                    padding: 10,
                    width: "85%",
                    // alignSelf: "center",
                    // alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                > */}
{/*                     
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color:Colors.darkRedColor
                    //   marginTop: "4%",
                    }}
                  > */}
                      
                    {/* {item.product_name} */}
                  {/* </Text> */}
                  
                 

                {/* </View>
                <View style={{flexDirection:'row',paddingLeft:15,borderColor:'green',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                <View style={{alignSelf:'center',}}>
                <Text style={{ fontSize:12,alignSelf:'flex-end', borderRadius:10,paddingHorizontal:10,color:Colors.textGreyColor}}>
                        Quantity
                    </Text> */}
                      {/* <Text style={{fontSize:18,alignSelf:'flex-end',marginRight:10,color:Colors.productGrey,fontWeight:"bold"}}>{item.qty} {item.unit}</Text> */}
                      {/* <Text style={{marginBottom:3,fontSize:12,alignSelf:'flex-end',marginRight:10,fontWeight:'bold'}}>QUANTITY</Text> */}
                      
                   
                    {/* <Text style={{ fontSize:12,alignSelf:'flex-end', color: "white",backgroundColor:Colors.darkRedColor,borderRadius:10,padding:5,}}>
                        Quantity
                    </Text> */}
                    {/* </View> */}
                    {/* <View
                    style={{
                      // width: 200,
                       flexDirection: "row",
                      alignItems: "center",
                      
                      marginTop: "1.5%",
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "grey" }}>
                    
                      {item.unit}
                    </Text>
                   
                  </View> */}
                  {/* </View>
              </View>
              </View> */}

             
            </TouchableOpacity> 
            
           
          )}
        />
        </View>}
        </View>
        <Modal
        animationType="slide"
        
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card style={{borderRadius:10,width:320,height:500,alignItems:'center',backgroundColor:"white"}}>
            <View style={{flexDirection:'row'}}>

                {/* <View style={{padding:12,marginLeft:10}}>
            <Image source={require('../../assets/icon.png')} style={{width:Platform.OS=='ios'? 50:40,height:Platform.OS=='ios'?70:60}} />

                </View> */}

              {/* <Entypo name="box" color='white' size={70} style={{justifyContent:'flex-start'}} /> */}
             {/* <View style={{justifyContent:'flex-end'}}> */}
             
             <View style={{flexDirection:'row',paddingTop:25,paddingBottom:5,justifyContent:'center',width:220,}}>
             <Text style={{fontSize:17,fontWeight:'bold',color:Colors.themeColor,textAlign:'center',width:"100%"}}>{selectedProductName.toUpperCase()}</Text>
            <Text style={{fontSize:17,fontWeight:'bold',color:Colors.themeColor,width:"40%"}}>{selectedQty} {selectedUnit.toUpperCase()}</Text>
            </View>
            
             {/* </View> */}
            </View>

            {/* <Text style={styles.s_verticleLine}></Text>  */}
            {/* <Text style={{color:'white',fontSize:16,fontWeight:'bold',textAlign:'right',paddingRight:20}}></Text> */}
            {/* <Text style={{color:'white',fontSize:22,fontWeight:'bold',textAlign:'right',paddingRight:20}}>{cartItems.unit_sales_price}</Text>  */}
             <View style={{padding:10}}>
           {/* <Card style={{}}> */}
            <TextInput
            style={styles.name_inputArea}
            placeholder="Supplier Name"
            autoCapitalize="none"
            placeholderTextColor="black"
            value={supplier}
            required={true}
            onChangeText={(value) => {
                setSupplier(value);
            }}
            initialValue=""
          />

            <TextInput
            style={styles.inputArea}
            placeholder="Unit Purchased Price"
            autoCapitalize="none"
            maxLength={6}
            placeholderTextColor="black"
            keyboardType='decimal-pad'
            value={unitPurchasedPrice}
            required={true}
            onChangeText={(value) => setUnitPurchasedPrice(value)}
            onEndEditing={checkPurchasedPrice}
            initialValue=""
          />
          

            <TextInput
            style={styles.inputArea}
            placeholder="Profit Margin"
            autoCapitalize="none"
            maxLength={6}
            placeholderTextColor="black"
            keyboardType='decimal-pad'
            value={profitMargin}
            required={true}
            onChangeText={(value) => {
                setProfitMargin(value);
                // console.log("ProfitMargin",profitMargin)
                // console.log(unitPurchasedPrice*item.qty+unitPurchasedPrice*item.qty/100*profitMargin,"======");
                
            }}
            onEndEditing={checkProfitMargin}
            initialValue=""
          />

          <TextInput
            style={styles.inputArea}
            placeholder="Porterage Price"
            autoCapitalize="none"
            maxLength={6}
            placeholderTextColor="black"
            keyboardType='decimal-pad'
            value={portagePrice}
            required={true}
            onChangeText={(value) => {
                setPortagePrice(value);
                // console.log("ProfitMargin",profitMargin)
                // console.log(unitPurchasedPrice*item.qty+unitPurchasedPrice*item.qty/100*profitMargin,"======");
                
            }}
            onEndEditing={checkPorteragePrice}
            initialValue=""
          />
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={styles.radioButtonContainer}>   
                <RadioButton
                color='#EE0202'
                value="percentage"
                status={ checked === 'percentage' ? 'checked' : 'unchecked' }
                onPress={() => {
                    setChecked('percentage')
                    console.log("Checked:",checked)
                }}
                />
                <Text style={{ paddingTop:10, fontSize:12, marginRight:5 }}>Profit in Percentage</Text> 
                {/* <Text> {cash} </Text> */}
        </View>
          <View style={styles.radioButtonContainer}>   
                <RadioButton
                color='#EE0202'
                value="value"
                status={ checked === 'value' ? 'checked' : 'unchecked' }
                onPress={() => {
                    setChecked('value')
                    console.log("Checked:",checked)
                }}
                />
                <Text style={{ paddingTop:10, fontSize:12, marginRight:5 }}>Profit in Per Unit</Text> 
                {/* <Text> {cash} </Text> */}
        </View>
       
           
          </View>
          </View>
          <View style={{flexDirection:'row',alignSelf:'center',marginBottom:15}}>
          <Text style={{fontSize:18,color:Colors.productGrey,textAlign:'center'}}>Unit Sale Price:  </Text>
          {checked=="value"?<Text style={{fontSize:20,fontWeight:'bold',color:Colors.themeColor}}>£ {parseFloat(((((unitPurchasedPrice*selectedQty)+(selectedQty*profitMargin))/selectedQty))+parseFloat(portagePrice)).toFixed(2)}</Text>:<Text style={{fontSize:20,fontWeight:'bold',color:Colors.themeColor}}>£ {parseFloat((((unitPurchasedPrice*selectedQty+unitPurchasedPrice*selectedQty/100*profitMargin)/selectedQty))+ parseFloat(portagePrice)).toFixed(2)}</Text>}
          </View>
          <Pressable
               style={styles.signupButton}
               activeOpacity={0.7}
              onPress={()=>{
                  if(supplier==""||unitPurchasedPrice==""||profitMargin=="" || portagePrice=="")
                  {
                    // dropDownAlertRef.alertWithType('error', '',"Please fill all fields");
                    // Toast.show("Please Fill All Fields.", Toast.LONG);
                    alert("Please Fill All Fields.");

                      // alert("Please fill all fields")
                  }
                  else if(reg.test(unitPurchasedPrice) === false) {

                    alert("Invalid Unit Purchased Price");
                    setUnitPurchasedPrice("");
                      return false;
                  }
                  else if(reg.test(profitMargin) === false) {

                    alert("Invalid Profit Margin");
                    setProfitMargin("");
                      return false;
                  }
                  else  if(reg.test(portagePrice) === false) {

                    alert("Invalid Porterage Price");
                    setPortagePrice("");
                      return false;
                  }
                  // else if(reg.test(unitPurchasedPrice) === false) {

                  //   alert("Invalid Unit Purchased Price");
                  //   setUnitPurchasedPrice("");
                  //     return false;
                  // }
                  // else if(reg.test() === false) {

                  //   alert("Invalid Unit Purchased Price");
                  //   setUnitPurchasedPrice("");
                  //     return false;
                  // }
                  
                  
                  else{
                    setModalVisible(!modalVisible)
                    //setUnitSalePrice(((unitPurchasedPrice*item.qty)+(unitPurchasedPrice*item.qty/100*profitMargin))),
                    dispatch(ConsolidateAction.AddConsolidateData(RiderId,selectedProductId,supplier,unitPurchasedPrice,profitMargin,selectedQty,unitPurchasedPrice*selectedQty,checked,portagePrice)),
                    alert(selectedProductName+" Record is saved"),

                // Toast.show(selectedProductName+" Record is saved", Toast.LONG);

                  // dropDownAlertRef.alertWithType('error', '',selectedProductName+" Record is saved");

                //   setUnitSalePrice(unitPurchasedPrice*selectedQty+unitPurchasedPrice*selectedQty/100*profitMargin);
                  setSupplier(""),
                  setUnitPurchasedPrice(""),
                  setProfitMargin(""),
                  setUnitSalePrice(""),
                  setPortagePrice(0)
                  setCount(count+1)
                  }
                
    
                }}
            >
              <Text style={styles.signupButtonText}>SAVE</Text>
            </Pressable>
            <Pressable
               style={{...styles.bu_signupButton,borderWidth:1}}
               activeOpacity={0.7}
              onPress={()=>{
                setModalVisible(!modalVisible),
                setSupplier(""),
                  setUnitPurchasedPrice(""),
                  setProfitMargin(""),
                  setUnitSalePrice(""),
                  setPortagePrice(0)
                }}
            >
              <Text style={styles.bu_signupButtonText}>CANCEL</Text>
            </Pressable>
           </Card>
        
 
            
          </View>
        </View>
      </Modal>
      {loading?null:<View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  // borderBottomWidth: 0.5,
                  // borderBottomColor: "grey",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color:Colors.productGrey,
                    width: "53%",
                    textAlign: "center",
                    // marginLeft: "10%",
                    fontWeight:'bold'
                  }}
                >
                  Total Packages
                </Text>
                <Text
                  style={{
                    color:Colors.productGrey,
                    width: "40%",
                    textAlign: "center",
                    paddingLeft: "8%",
                    fontWeight:'bold'
                  }}
                >
                  {data.total_packages}
                </Text>

                
              </View>}
      {/* <View style = {{
      width:"100%",
    height:40,
    backgroundColor:Colors.themeColor,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    // borderRadius:10,
    // flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  // elevation: 5,
}}>
  

  
    <View style={{flexDirection:'row',}}>
    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>Total Packages: </Text>
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>{data.total_packages}</Text>
      
    </View>
    


</View> */}
       {loading?null:<TouchableOpacity
          style={styles.c_signupButton}
          activeOpacity={0.7}
          onPress={OnSubmit}
          >

          <Text style={styles.c_signupButtonText}>SUBMIT</Text>
        </TouchableOpacity>}
        </Content> 
        
        
       
      )}
    {/* </View> */}
  {/* //   <View style={{height:"30%",justifyContent:'flex-end', */}
  {/* // bottom:0}}> */}
    
    {/* <View style = {{
      width:"100%",
    height:40,
    backgroundColor:Colors.themeColor,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    // borderRadius:10,
    // flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  // elevation: 5,
}}>
  

  
    <View style={{flexDirection:'row',}}>
    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>Total Packages: </Text>
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>{data.total_packages}</Text>
      
    </View>
    


</View> */}
    {/* </View> */}
    </View>
  );
};


const styles = StyleSheet.create({

signupButtonText:{
  fontSize: 20,
color: "white",
fontWeight: '700',
textAlign: 'center',
},
bu_signupButtonText:{
    fontSize: 20,
  color: Colors.themeColor,
  fontWeight: 'bold',
  textAlign: 'center',
  },
inputArea:{
    marginVertical:4,
    textAlign:'right',
    height: 40, 
    width:300,
     backgroundColor: '#F2F1F3',
    borderRadius:25,
    paddingHorizontal:30,
    flexDirection:'row',
    marginTop:10
    
    //padding:40,
},
name_inputArea:{
  marginVertical:4,
  // textAlign:'right',
  height: 40, 
  width:300,
   backgroundColor: '#F2F1F3',
  borderRadius:25,
  paddingHorizontal:30,
  flexDirection:'row',
  marginTop:10
  
  //padding:40,
},
verticleLine: {
    // marginRight:30,
    // marginTop:10,
    //alignSelf:'center',
    // alignContent:'center',
    // alignItems:'center',
    // justifyContent:'center',
    height: 1,
    width: '133%',
    // alignSelf:'center',
    backgroundColor: Colors.textGreyColor,
  },
  s_verticleLine: {
    // marginRight:30,
    // marginTop:10,
    //alignSelf:'center',
    // alignContent:'center',
    // alignItems:'center',
    // justifyContent:'center',
    height: 3,
    width: '100%',
    // alignSelf:'center',
    backgroundColor: 'white',
  },
  signupText: {
    fontSize: 14,
fontWeight: 'bold',
// color:'rgba(255,255,255, 0.7)',
color: 'black',
    },

  signupButton: {
      marginTop:5,
    height: 30,
  width: 150,
backgroundColor: Colors.themeColor,
justifyContent:"center",
alignSelf:'center',
borderRadius: 25,
// marginVertical: 20,
  },
  bu_signupButton: {
    marginTop:10,
  height: 30,
width: 150,
backgroundColor: 'white',
borderColor:Colors.themeColor,
borderWidth:2,
justifyContent:"center",
alignSelf:'center',
borderRadius: 25,
// marginVertical: 20,
},
  


  signupContianer:{
    flexGrow: 1,
justifyContent: 'center',
alignItems: 'center',
flexDirection: 'row',

  },
  uploadButton: {
    height: 40,
  width: 300,
  borderWidth:2,
  flexDirection:'row',
  borderColor:Colors.themeColor,
backgroundColor: 'white',
alignSelf:'center',
borderRadius: 25,
  },
  uploadButtonText:{
    fontSize: 20,
    marginTop:5,
  color: Colors.themeColor,
  fontWeight: 'bold',
  justifyContent:'center',
  marginLeft:"20%"

  },
  c_signupButtonText:{
    fontSize: 16,
  color: '#ffffff',
  fontWeight: '700',
  textAlign: 'center',
  },
  radioButtonContainer:{
    flexDirection: 'row',
    paddingTop:10,
    marginLeft:5,
   // marginRight:10

},
  
    c_signupText: {
      alignSelf:'center',
      fontSize: 14,
  fontWeight: 'bold',
  // color:'rgba(255,255,255, 0.7)',
  color: 'black',
      },
  
    c_signupButton: {
      height: 40,
    width: 170,
  backgroundColor: Colors.themeColor,
  justifyContent:"center",
  alignSelf:'center',
  borderRadius: 25,
  marginVertical: 30,
    },
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
  
});
export default Consolidate;