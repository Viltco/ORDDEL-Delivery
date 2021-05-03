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

//import ViewShot from "react-native-view-shot";
import Colors from '../ColorCodes/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import URL from "../api/ApiURL";
import { useSelector, useDispatch } from 'react-redux';

import * as ConsolidateAction from '../store/actions/Consolidate';



const PurchasedPayment = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
  const RiderId=useSelector(state=>state.ApiData.RiderId);
  const [currentDate, setCurrentDate] = useState('');
const [invoiceNumber,setInvoiceNumber]=useState("");
  const [formattedDate,setFormattedDate]=useState("");
  var datee;
  var monthh;
  var yearr;
  const [renderCheck,setRenderCheck]=useState(false);
  const [supplierName,setSupplierName]=useState("");
  const [amount,setAmount]=useState("");
  
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
      
    setFormattedDate(("0" + currentDate.getDate()).slice(-2)+"-"+("0" + (currentDate.getMonth() + 1)).slice(-2)+ "-" +currentDate.getFullYear());
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


const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeIcon,setChangeIcon]=useState(false);
  const [supplier,setSupplier]=useState("");
  var reg=/^([a-zA-Z0-9 _-]+)$/;
  const [length,setLength]=useState(0);
  var [count,setCount]=useState(0);
  


  const onPaid=(Amount,Supplier)=>{

    if (reg.test(invoiceNumber) === false) {
        alert("Invalid Invoice Number");
        setInvoiceNumber("");
          return false;
      }
      else{
        console.log("onPaid")
        fetch(URL+'/payment/submit_purchase_payment/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
        
           body : JSON.stringify({
        
            "delivery_person": RiderId,
        "supplier": Supplier,
        "amount": Amount,
        "invoice_number": invoiceNumber,
        "date": formattedDate==""?currentDate:formattedDate
          
          
          })
            
        
            
          }) .then(async (response) => {
            setLoading(true);
      
            let data = await response.json();
            console.log("on Paid Submit", data);
            console.log("Bank Detail", response.status);
            if (response.status == 200) {
                setRenderCheck(true);
            }
           
        
            
            
            // setResponse(json)
          }).catch((error)=>console.log(error))
      }



      
  }







//   useEffect(() => {
//     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// }, [])
  useEffect(() => {
      setIsLoading(true);
    datee = ("0" + new Date().getDate()).slice(-2); //Current Date
    monthh = ("0" + (new Date().getMonth() + 1)).slice(-2); //Current Month
    yearr = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      datee + '-' +monthh+ '-' + yearr 
    );
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii---------------",currentDate)
    if(RiderId!=0){
      if(formattedDate=="")
    {
        console.log("Frommmmmmmmmmmmmmmm apiiiiiiiiii---------------",formattedDate)
      fetch(URL+"/payment/suppliers_list/?delivery_person_id="+RiderId+"&date="+datee + '-' +monthh+ '-' + yearr)
    // fetch(URL+'/client_app/clients_list/33/')
    .then( async (response) => {
        setIsLoading(true)
        let data = await response.json();
       
         // console.log("status code",response.status)
          console.log("Supplier",response.status)
          if(response.status==200){
            console.log("supplierrrrrrrr:",data);
            setRenderCheck(false);
            if(data=="")
            {
                setLoading(true);
                setIsLoading(false)
            }
            else{
              setData(data);
          //console.log("length",data.data.length)
          setLoading(false)
          setIsLoading(false)
        //   setLength(data.data.length);
          }
            if(response.status==400){
            }
              
          }
          
      })
      .catch((error) => console.error("From Supplier",error))
    }
    else{
        console.log("hiiewieui---------------",formattedDate)
      fetch(URL+"/payment/suppliers_list/?delivery_person_id="+RiderId+"&date="+formattedDate)
    // fetch(URL+'/client_app/clients_list/33/')
    .then( async (response) => {
        setIsLoading(true)
        let data = await response.json();
       
         // console.log("status code",response.status)
         console.log("Supplier",data)
          if(response.status==200){
            setRenderCheck(false);
            // console.log("Consolidate:",data);
            if(data=="")
            {
                setLoading(true);
                setIsLoading(false)
            }
            else {
                setData(data);
            //console.log("length",data.data.length)
            setLoading(false)
            setIsLoading(false)
           
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
  }, [changeIcon,isFocused,formattedDate,renderCheck]);
  
  return (
    <View style={{ flex:1,backgroundColor:"white",height:"100%",width:"100%"}}> 
    

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
  

    <View style={{flexDirection:'row'}}>
      {formattedDate==""?<Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white",letterSpacing:2}}>{currentDate}</Text>: <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:"white"}}>{formattedDate}</Text>}
      <FontAwesome name="chevron-down" color={Colors.themeColor} size={14} style={{marginLeft:20,color:"white",alignSelf:'center'}} />
    </View>
    


</View>
</TouchableOpacity> 
{show && (
<DateTimePicker
testID="dateTimePicker"
value={date}
mode={'date'}
// minimumDate={new Date()}
// is24Hour={true}
style={{color:Colors.themeColor}}
display="default"
dateFormat="day month year"
onChange={onChange}
/>
)}
</View>
      
      
      
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
              <FlatList
          data={data}
          keyboardShouldPersistTaps="always"
        //   inverted
          style={{alignSelf:'center',}}
          showsVerticalScrollIndicator={false}
          // keyExtractor={item => item.index_id.toString()}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (


<View style = {{width:"95%",height:100,backgroundColor:'white',alignSelf:"center",borderRadius:10,flexDirection:'row',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 4,
          marginBottom:"2%",
          paddingTop:"2%"
          }}>
             <View style = {{width:'60%',justifyContent:'center',paddingLeft:23}}>

             <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign:"center",
                      color:Colors.darkRedColor
                    //   marginTop: "4%",
                    }}
                  >
                      
                   {item.supplier}
                      
                  </Text>
                  <TextInput
            style={styles.name_inputArea}
            editable={item.invoice_number==null?true:false}
            placeholder="Invoice Number"
            autoCapitalize="none"
            placeholderTextColor="black"
            value={item.invoice_number}
            required={true}
            onChangeText={(value) => {
                setInvoiceNumber(value);
            }}
            initialValue=""
          />
             </View>
             <View style = {{width:'40%',justifyContent:'center',alignItems:'flex-end',paddingRight:23}}>
             <View style = {{justifyContent:'center',alignItems:"center"}}>

             <Text style={{fontSize:12,color:Colors.productGrey,fontWeight:"bold"}}>

                  Amount


                </Text>
             <Text style={{fontSize:12,color:Colors.productGrey,fontWeight:"bold"}}>

             £ {parseFloat(item.amount).toFixed(2)}


                      </Text>
                      <TouchableOpacity
              style={{padding:2,
                width: 70,
                // padding:10,
                marginTop:5,
              backgroundColor: item.supplier_payment_status=="paid"?Colors.textGreyColor:Colors.themeColor,
              
              borderRadius: 5,
        }}
              activeOpacity={0.7}
              disabled={item.supplier_payment_status=="paid"?true:false}
              onPress={()=>{
                  onPaid(item.amount,item.supplier);
              }}
            //   onPress={OnSubmit}
              >
                <Text style={styles.paidText}>{item.supplier_payment_status.toUpperCase()}</Text>
              </TouchableOpacity>
                      
              </View>
              
                     
             </View>


           </View>
           )}
           />








      
                  {/* <View style = {{width:"95%",height:120,backgroundColor:'white',
                  alignSelf:"center",borderRadius:10,flexDirection:'row',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding:4
          }}>
              <View style = {{ justifyContent:'flex-start' }}> 

             <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color:Colors.darkRedColor,
                      marginTop:2,
                      marginBottom:10, 
                      paddingLeft:20
                      //marginTop: "4%",
                    }}
                  >       
                      Name 
                  </Text>
            


             <View style = {{width:'30%',
             //marginRight:30,
             //alignSelf:'center',
             alignItems:'flex-start'
            }}>

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
             </View>
             </View>

           

            <View style={{}}>
               <Text style={{ fontSize:12,color:Colors.textGreyColor }}>
                        Quantity
                  </Text>
              <Text style={{fontSize:18,color:Colors.productGrey,fontWeight:"bold"}}>data</Text>
              
              <TouchableOpacity
              style={styles.paidButton}
              activeOpacity={0.7}
            //   onPress={OnSubmit}
              >
                <Text style={styles.paidText}>paid</Text>
              </TouchableOpacity>


            </View>
           
           </View>  */}
               

             
            {/* </TouchableOpacity> 
            
           
          )}
        /> */}


        </View>}
        </View>
        
      {/* {loading?null:<View
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

                
              </View>} */}
      
       {/* {loading?null:<TouchableOpacity
          style={styles.c_signupButton}
          activeOpacity={0.7}
        //   onPress={OnSubmit}
          >

          <Text style={styles.c_signupButtonText}>SUBMIT</Text>
        </TouchableOpacity>} */}
        </Content> 
        
        
       
      )}
   
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
    // marginVertical:4,
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
//   marginVertical:0,
  // textAlign:'right',
  height: 40, 
  width:"100%",
   backgroundColor: '#F2F1F3',
   //backgroundColor: 'black',
  borderRadius:5,
  paddingHorizontal:20,
  marginVertical:5
  //marginTop:10,
  //marginRight:'120%'
  //marginRight:10 
},
verticleLine: {
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

    paidText: {
      alignSelf:'center',
      fontSize: 16,
  fontWeight: 'bold',
  //color:'rgba(255,255,255, 0.7)',
  color: 'white',
      },

    paidButton: {
        padding:2,
        width: 70,
        // padding:10,
        marginTop:5,
      backgroundColor: Colors.themeColor,
      
      borderRadius: 5,

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
export default PurchasedPayment;