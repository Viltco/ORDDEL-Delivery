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
  Modal,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

//import ViewShot from "react-native-view-shot";
import Colors from "../ColorCodes/Colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import URL from "../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";

import * as ConsolidateAction from "../store/actions/Consolidate";
import PreviewCart from "./PreviewCart";
import CartItem from "./CartItem";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PurchasedPayment = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  //const cardItemsArray = useSelector((state) => {return state.OrderBox.cardItemsArray});
  //const {id, name ,address} = route.params
  const dispatch = useDispatch();
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  const RiderName = useSelector((state) => state.ApiData.riderName);
  const RiderAddress = useSelector((state) => state.ApiData.RiderAddress);
  const RiderLast = useSelector((state) => state.ApiData.LastName);
  const RiderFirst = useSelector((state) => state.ApiData.FirstName);
  var fullName = RiderFirst + " " + RiderLast;
  console.log(fullName, "name.......addsd");

  console.log(RiderName, " rider name..........");
  console.log(RiderAddress, "rider add...........");
  console.log(RiderId, " iddddddd");
  //const [currentDate, setCurrentDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState("");
  //const [formattedDate,setFormattedDate]=useState("");
  var datee;
  var monthh;
  var yearr;
  const [renderCheck, setRenderCheck] = useState(false);
  //const [supplierName,setSupplierName]=useState("");
  const [amount, setAmount] = useState("");

  var Count = 0;

  //const ClientId = useSelector((state) => state.ApiData.ClientId);
  //const ClientName = useSelector((state) => state.ApiData.ClientName);

  const units = useSelector((state) => state.ApiData.ProductList);
  const products = useSelector((state) => state.ApiData.ProductList);

  const PoNumber = useSelector((state) => state.ApiData.PoNumber);
  const OrderId = useSelector((state) => state.ApiData.OrderId);
  //console.log("cartItems  ", cardItemsArray);
  console.log("OrderId", OrderId);

  const [currentDate, setCurrentDate] = useState("");
  const [note, setNote] = useState("");

  const [riderName, setRiderName] = useState("");
  //const [riderAddress, setRiderAddress] = useState("");
  const [riderId, setRiderId] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [businessData, setBusinessData] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  //const [loading, setLoading] = useState(false);
  const [riderLoading, setRiderLoading] = useState(false);
  const [AddressName, setAddressName] = useState("");
  const [businessName, setBusinessName] = useState("");
  // const [time,setTime]=useState("12:56:00");
  const [formattedTime, setFormattedTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const [supplierName,setSupplierName]=useState("");

  const [supplierId, setSupplierId] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log("currentDate", currentDate);
    setShow(Platform.OS === "ios");
    if (
      parseInt(currentDate.getFullYear()) < parseInt(yearr) ||
      currentDate.getMonth() + 1 < monthh ||
      (currentDate.getMonth() + 1 == monthh && currentDate.getDate() < datee)
    ) {
      alert("Selected date is invalid!");
    } else {
      setDate(currentDate);

      setFormattedDate(
        ("0" + currentDate.getDate()).slice(-2) +
          "-" +
          ("0" + (currentDate.getMonth() + 1)).slice(-2) +
          "-" +
          currentDate.getFullYear()
      );
      console.log("date", formattedDate);
    }
  };
  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  //New-----------------//
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // setNewDate(date.split("T")[0]);\
    var date2 = date.getDate();
    var month2 = date.getMonth();

    // add line to resolve month 010 problem 
    var month2= month2 + 1;
    var year2 = date.getFullYear();

    const formatedData = date2.toString().length == 1 ? `0${date2}` : date2;
    const formatedMonth = month2.toString().length == 1? `0${month2}` : month2;

    console.log(month2, ' ---  month lenght --- ');
    setFormattedDate(formatedData + "-" + formatedMonth + "-" + year2);


    // ("0" + formattedDate.getDate()).slice(-2) +
    //                 "-" +
    //                 ("0" + (formattedDate.getMonth() + 1)).slice(-2) +
    //                 "-" +
    //                 formattedDate.getFullYear() 

    // setFormattedDate(date);
    console.warn(
      "A date has been picked: ",
      date,
      "   ",
      date2,
      "   ",
      month2,
      "   ",
      year2
    );
    hideDatePicker();
  };

  // ---------------------------//
  const [status, setStatus] = useState("");
  const [supplierTime, setSupplierTime] = useState("");
  const [supplierDate, setSupplierDate] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [supplier, setSupplier] = useState("");
  var reg = /^([a-zA-Z0-9 _-]+)$/;
  const [length, setLength] = useState(0);
  var [count, setCount] = useState(0);
  var showOrder;

  //const preveiwData =()

  const sendOrder = (item) => {
    setSupplier(item);
    showOrder = item;
    console.log(showOrder, "showOrder.............");
    console.log(item, "itemmmmmmmmm");

    setModalVisible(!modalVisible);

    // alert("Thanks,Your Order is Placed,")
  };

  const onPaid = () => {
    console.log(showOrder, "again showorder............");
    if (reg.test(invoiceNumber) === false) {
      alert("Invalid invoice number");
      setInvoiceNumber("");
      return false;
    } else {
      console.log("UnPaid");
      console.log("id", riderId);
      console.log("supplier", supplierId);
      console.log("ammount", amount);
      console.log("datetime:Raw", supplierDate);
      fetch(URL + "/payment/submit_purchase_payment/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          delivery_person: RiderId,
          supplier: supplierId,
          invoice_number: invoiceNumber,
          purchase_datetime: supplierDate,
        }),
      })
        .then(async (response) => {
          setLoading(true);

          let data = await response.json();
          console.log("on Paid Submit", data);
          console.log("Bank Detail", response.status);
          if (response.status == 200) {
            setRenderCheck(true);
          }

          // setResponse(json)
        })
        .catch((error) => console.log(error));
    }
  };

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
    setCurrentDate(datee + "-" + monthh + "-" + yearr);
    //   console.log("hi---------------")
    if (RiderId != 0) {
      if (formattedDate == "") {
        fetch(
          URL +
            "/payment/suppliers_list/?delivery_person_id=" +
            RiderId +
            "&date=" +
            datee +
            "-" +
            monthh +
            "-" +
            yearr +
            "&supplier_payment_status=paid"
        )
          // fetch(URL+'/client_app/clients_list/33/')
          .then(async (response) => {
            setIsLoading(true);
            let data = await response.json();

            // console.log("status code",response.status)
            console.log("Consolidate", data);
            if (response.status == 200) {
              console.log("Unpaid:", data);
              if (
                data.data ==
                "No orders found against the given ID or provided date"
              ) {
                setLoading(true);
                setIsLoading(false);
              } else {
                setData(data);
                //console.log("length",data.data.length)
                setLoading(false);
                setIsLoading(false);
                setLength(data.data.length);
              }
              if (response.status == 400) {
              }
            }

            // console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
            // if (json["response"] == "Record does not exist or not found") {
            //   setLoading(true);
            // } else {

            //   //console.log(json);
            // }
          })
          .catch((error) => console.error("From Consolidate", error));
      } else {
        fetch(
          URL +
            "/payment/suppliers_list/?delivery_person_id=" +
            RiderId +
            "&date=" +
            formattedDate +
            "&supplier_payment_status=paid"
        )
          // fetch(URL+'/client_app/clients_list/33/')
          .then(async (response) => {
            setIsLoading(true);
            let data = await response.json();

            // console.log("status code",response.status)
            console.log("Unpaid", data);
            if (response.status == 200) {
              console.log("Consolidate:", data);
              if (data == "") {
                setLoading(true);
                setIsLoading(false);
              } else {
                setData(data);
                //console.log("length",data.data.length)
                setLoading(false);
                setIsLoading(false);
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
          .catch((error) => console.error(error));
      }
    }

    // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [changeIcon, isFocused, formattedDate, renderCheck]);

  const modifyDate = (item) => {
    setSupplierDate(item);
    //   let data=item.gDetailDS.activeFrom;
    //   // alert(data.getDate())
    // let myDate=("0" + data.getDate()).slice(-2);
    // let myMonth=("0" + (data.getMonth() + 1)).slice(-2);
    // let myYear=data.getFullYear();

    // let myHour=("0" + data.getHours()).slice(-2);
    // let myMinute=("0" + data.getMinutes()).slice(-2);

    // setSupplierDate(myDate+"-"+myMonth+"-"+myYear);
    // setSupplierTime(myHour+":"+myMinute);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ padding: 5, alignSelf: "center" }}>
        <TouchableOpacity
          style={{ marginTop: 15, marginBottom: 5 }}
          onPress={showDatePicker}
        >
          <View
            style={{
           
              width: 320,
              height: 40,
              backgroundColor: Colors.themeColor,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: 10,
              // flexDirection:'row',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              // elevation: 5,
            }}
          >
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            {/* <Text>{Date}</Text> */}
            {/* <View style={{alignSelf:'center'}}> */}
            {/* <Text style={{color:Colors.themeColor,fontSize:12}}>Delivery Date:</Text> */}
            <View style={{ flexDirection: "row" }}>
              {formattedDate == "" ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    letterSpacing: 2,
                  }}
                >
                  {currentDate}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {/* {("0" + formattedDate.getDate()).slice(-2) +
                    "-" +
                    ("0" + (formattedDate.getMonth() + 1)).slice(-2) +
                    "-" +
                    formattedDate.getFullYear()} */}
                  {formattedDate}
                </Text>
              )}
              <FontAwesome
                name="chevron-down"
                color={Colors.themeColor}
                size={14}
                style={{ marginLeft: 20, color: "white", alignSelf: "center" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{ padding: 5, alignSelf: "center" }}>
        <TouchableOpacity
          style={{ marginTop: 15, marginBottom: 5 }}
          onPress={showDatepicker}
        >
          <View
            style={{
              width: 320,
              height: 40,
              backgroundColor: Colors.themeColor,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: 10,
              // flexDirection:'row',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              // elevation: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {formattedDate == "" ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    letterSpacing: 2,
                  }}
                >
                  {currentDate}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {formattedDate}
                </Text>
              )}
              <FontAwesome
                name="chevron-down"
                color={Colors.themeColor}
                size={14}
                style={{ marginLeft: 20, color: "white", alignSelf: "center" }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            // minimumDate={new Date()}
            // is24Hour={true}
            style={{ color: Colors.themeColor }}
            display="default"
            dateFormat="day month year"
            onChange={onChange}
          />
        )}
      </View> */}

      {isLoading ? (
        <Spinner color={Colors.themeColor} />
      ) : (
        // console.log("data",data),
        <Content>
          <View>
            {loading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20%",
                }}
              >
                <FontAwesome
                  name="exclamation-circle"
                  color={Colors.themeColor}
                  size={150}
                />
                <Text
                  style={{
                    color: Colors.themeColor,
                    fontWeight: "bold",
                    marginTop: 20,
                    fontSize: 25,
                  }}
                >
                  NO RECORD
                </Text>
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <FlatList
                  data={data}
                  keyboardShouldPersistTaps="always"
                  //   inverted
                  style={{ alignSelf: "center" }}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => item.index_id.toString()}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) =>
                    item.supplier_check != "True" && (
                      <TouchableOpacity
                        // disabled={item.supplier_check == "True" ? true : false}
                        //style={styles.signupButton}
                        activeOpacity={0.7}
                        //disabled={sendButtonCheck}
                        onPress={() => {
                          sendOrder(item.order_products);
                          setSupplierDate(item.datetime);
                          setStatus(item.supplier_payment_status);
                          // setDateTime(item.datetime);
                          setInvoiceNumber(item.invoice_number);
                          setSupplierName(item.supplier_name);
                          setAmount(item.amount);
                          setSupplierId(item.supplier);
                        }}
                        //onPress={()=>{ console.log(item.order_products,'dataaaaaaaa'); }}
                      >
                        {/* {loading ? (
                <Spinner color={"white"} />
              ) 
              : 
              (
                <Text style={styles.signupButtonText}>SEND ORDER</Text>
              )
              } */}

                        {/* // card main veiw */}
                        <View
                          style={{
                            
                            width: "95%",
                            height: 100,
                            backgroundColor: "white",
                            alignSelf: "center",
                            borderRadius: 10,
                            flexDirection: "row",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3.84,
                            elevation: 4,
                            marginBottom: "2%",
                            paddingTop: "2%",
                          }}
                        >
                          {/* touchable cards  */}

                          <View
                            style={{
                              
                              width: "60%",
                              justifyContent: "center",
                              paddingLeft: 23,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                                color: Colors.darkRedColor,
                                //   marginTop: "4%",
                              }}
                            >
                              {item.supplier_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "40%",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              paddingRight: 23,
                            }}
                          >
                            <View
                              style={{
                               
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Colors.productGrey,
                                  fontWeight: "bold",
                                }}
                              >
                                Amount
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Colors.productGrey,
                                  fontWeight: "bold",
                                }}
                              >
                                £ {parseFloat(item.amount).toFixed(2)}
                              </Text>
                              <TouchableOpacity
                                style={{
                                  padding: 2,
                                  width: 70,
                                  // padding:10,
                                  marginTop: 5,
                                  backgroundColor:
                                    item.supplier_payment_status == "paid"
                                      ? Colors.textGreyColor
                                      : Colors.themeColor,

                                  borderRadius: 5,
                                }}
                                activeOpacity={0.7}
                                disabled={
                                  item.supplier_payment_status == "paid"
                                    ? true
                                    : false
                                }
                                onPress={() => {
                                  onPaid();
                                }}
                                //   onPress={OnSubmit}
                              >
                                <Text style={styles.paidText}>
                                  {item.supplier_payment_status.toUpperCase()}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                />

                {/* </TouchableOpacity> */}
              </View>
            )}
          </View>
        </Content>
      )}
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
            <View
              style={{
                width: "95%",
                height: Platform.OS == "android" ? "95%" : "90%",
                backgroundColor: "white",
                alignSelf: "center",
                borderRadius: 10,
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 0,
              }}
            >
              {/* <Card style={{borderRadius:10,width:"90%",height:"90%",alignItems:'center',backgroundColor:"white"}}> */}
              <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                style={{ padding: 10 }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    padding: "3%",
                    paddingBottom: "2%",
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.themeColor,
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    PREVIEW
                  </Text>
                </View>
                <View
                  style={{
                    padding: 3,
                    paddingBottom: 5,
                    alignSelf: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: "60%",
                      backgroundColor: "#e6e6e6",
                      alignSelf: "center",
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      // shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 0,
                      padding: 10,
                      // marginLeft:5
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.themeColor,
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Supplier name
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {supplierName}
                      {/* {supplierName} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {supplierDate.split(" ")[0]}
                      {/* {supplierName} */}
                    </Text>
                  </View>
                </View>

                {/* <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  padding: 5,
                  paddingTop:0
                }}
              >
                

                <View style = {{width:"50%",backgroundColor:'#e6e6e6',alignSelf:"center",borderRadius:10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 0,
          padding:10,
          
          }}>
                  <View style={{ padding: 5 }}>
                    
                      <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                        Date:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {supplierDate}
                      </Text>
                    
                  </View>
                </View>

                <View style = {{width:"50%",backgroundColor:'#e6e6e6',alignSelf:"center",borderRadius:10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 0,
          padding:10,
          marginLeft:5
          }}>
                  <View style={{ padding: 5 }}>
                    
                      <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                        Time:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)}
                      </Text>
                    
                  </View>
                </View>
              </View> */}

                <View
                  style={{
                    justifyContent:"center",
                    flexDirection: "row",
                    marginTop: 10,
                    // borderColor: "black",
                    // borderWidth: 1,
                  }}
                >
                  {/* <Text style={{color:Colors.themeColor,fontWeight:"bold",marginLeft:"1%",width:"20%",textAlign:"left"}}>Invoice</Text> */}
                  <Text
                    style={{
                   
                      color: Colors.themeColor,
                      fontWeight: "bold",
                      //marginLeft: "2%",
                      width: "21%",
                      textAlign: "left",
                      // borderWidth: 1,
                      // borderColor: "black",
                    }}
                  >
                    Product
                  </Text>
                  {/* <Text style={{color:Colors.themeColor,fontWeight:"bold",textAlign:"center",width:"22%",marginLeft:18}}>Porterage Price</Text> */}
                  <Text
                    style={{
                  
                      color: Colors.themeColor,
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "21%",
                      marginLeft: 5,
                      // borderWidth: 1,
                      // borderColor: "black",
                    }}
                  >
                    Quantity
                  </Text>
                  <Text
                    style={{
                   
                      color: Colors.themeColor,
                      fontWeight: "bold",
                      textAlign: "right",
                      width: "21%",
                      marginLeft: 1,
                    }}
                  >
                    {/* Last month Avg.Price */}
                    Amount
                  </Text>

                  <Text
                    style={{
                 
                      color: Colors.themeColor,
                      fontWeight: "bold",
                      textAlign: "right",
                      width: "27%",
                      textAlign:"center",
                      paddingLeft:"3%",
                      marginLeft: 1,
                    }}
                  >
                    {/* Last month Avg.Price */}
                    Porterage Price 
                  </Text>


                </View>
                <View style={{ padding: 2 }}>
                  {/* <FlatList
                          nestedScrollEnabled
                          //data={.order_products}
                          data={}
                          // sort={true}
                          // inverted={true}
                          keyExtractor={(item) => item.id}
                          renderItem={(itemData) => (
                            //<CardItem
                            <PreviewCart
                              id={itemData.product_name }
                              quantity={itemData.quantity_total}
                              total_amount={itemData.amount}
                              //name={itemData.product_name}
                              //unit={itemData.order_products.unit}
                              price={itemData.portrage_price}
                              // addable
                              // onAddPress={() => {
                              //   dispatch(
                              //     cartActions.addToQtty(itemData.item.id)
                              //   );
                              // }}
                              // // deletable
                              // onRemove={() => {
                              //   dispatch(
                              //     cartActions.removeFromCart(itemData.item.id)
                              //   );
                              // }}
                              // // removeable
                              // onDelete={() => {
                              //   dispatch(
                              //     cartActions.deleteProduct(itemData.item.id)
                              //   );
                              // }}
                            />
                          )}
                        /> */}

                  {/* [{"datetime": "2021-05-11T07:44:08.104141Z", "id": 89, "portrage_price": 2, 
"product_name": "Garlic loose-China", "profit_margin": 2, "profit_margin_choice": "percentage",
 "purchased_quantity_total": 5, "quantity_total": 5, "supplier_invoice_number": null,
 "supplier_payment_status": "unpaid", "unit_purchase_price": 22, "quantity_total": 24.44}] */}

                  {/* {id, product_name, quantity_total, purchased_quantity_total, 
unit_sale_price, datetime, profit_margin, portrage_price, 
unit_purchase_price, supplier_invoice_number, supplier_payment_status, profit_margin_choice} */}

                  {/* {"amount": "122.2", "datetime": "2021-05-11T07:44:08.104141Z", "invoice_number": null,
 "order_products": [[Object]], "supplier": "47", "supplier_name": null, "supplier_payment_status": "unpaid"} */}

                  <FlatList
                    nestedScrollEnabled
                    //data={[{ key: 'a', name:'haseeb' }, { key: 'b',name:'haseebi' }]}
                    //data={showOrder}
                    // inverted={true}
                    data={supplier}
                    keyExtractor={(item) => item.id}
                    renderItem={
                      ({ item }) => (
                        <PreviewCart
                          //id={item.id }
                          quantity={
                            item.purchased_quantity_total == 0
                              ? item.quantity_total
                              : item.purchased_quantity_total
                          }
                          //amount={itemData.amount}
                          name={item.product_name}
                          //unit={item.order_products.unit}
                          // portrage_price={item.portrage_price}
                          // price={item.unit_purchase_price}
                          portrage_price={item.unit_portrage_price_total}
                          price={item.purchase_price_per_unit}
                          portragePprice={item.unit_portrage_price_total}
                        />
                      )
                      //<Text>{item.id} {item.product_name}</Text>
                    }

                    //renderItem={({ item }) => <Text>{item.key} {item.name}</Text>}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 30,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.themeColor,
                      fontWeight: "bold",
                      textAlign: "center",
                      // width: "25%",
                      // marginLeft: "6%",
                      // textAlign: "left",
                    }}
                  >
                    Total Paid:
                  </Text>
                  {/* <Text style={{color:Colors.themeColor,width:Platform.OS=="android"?"20%":"20%",marginRight:"23%" ,fontWeight:'bold',fontSize:14,textAlign:"right"}}>£ {parseFloat(454).toFixed(2)}</Text> */}
                  <Text
                    style={{
                      color: Colors.themeColor,
                      // marginRight: "23%",
                      fontWeight: "bold",
                      fontSize: 14,
                      // textAlign: "right",
                    }}
                  >
                    £ {parseFloat(amount).toFixed(2)}
                  </Text>
                </View>

                <View style={{ marginTop: "20%", alignItems: "center" }}>
                  <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                    Invoice Number#
                  </Text>
                  <Text
                    style={{
                      height: 40,
                      width: "80%",
                      backgroundColor: "#F2F1F3",
                      textAlign: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      paddingTop: 7,
                    }}
                  >
                    {invoiceNumber}
                  </Text>
                  {/* <TextInput

            style={styles.name_inputArea}
            //editable={invoiceNumber==null?true:false}
            placeholder="Invoice Number"
            autoCapitalize="none"
            placeholderTextColor={invoiceNumber==null?"grey":"black"}
            value={invoiceNumber}
            required={true}
            //disabled={true}
            // onChangeText={(value) => {
            //     setInvoiceNumber(value);
            // }}
            initialValue=""
          /> */}
                </View>

                <View style={{ marginTop: "10%", alignSelf: "center" }}>
                  {status == "unpaid" ? (
                    <Pressable
                      style={styles.signupButton1}
                      activeOpacity={0.7}
                      onPress={onPaid}
                    >
                      {loading ? (
                        <Spinner color={"white"} size={20} />
                      ) : (
                        <Text style={styles.signupButtonText1}>UNPAID</Text>
                      )}
                    </Pressable>
                  ) : null}
                  <Pressable
                    style={{
                      ...styles.bu_signupButton1,
                      borderWidth: 1,
                      marginBottom: "10%",
                    }}
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.bu_signupButtonText1}>OK</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  signupButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  bu_signupButtonText: {
    fontSize: 20,
    color: Colors.themeColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputArea: {
    // marginVertical:4,
    textAlign: "right",
    height: 40,
    width: 300,
    backgroundColor: "#F2F1F3",
    borderRadius: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
    marginTop: 10,

    //padding:40,
  },
  name_inputArea: {
    //   marginVertical:0,
    // textAlign:"center",
    // alignSelf:"center",
    height: 40,
    width: "80%",
    backgroundColor: "#F2F1F3",
    //backgroundColor: 'black',
    borderRadius: 5,
    // paddingHorizontal:20,
    // marginVertical:5
    //marginTop:10,
    //marginRight:'120%'
    //marginRight:10
  },
  verticleLine: {
    height: 1,
    width: "133%",
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
    width: "100%",
    // alignSelf:'center',
    backgroundColor: "white",
  },
  signupText: {
    fontSize: 14,
    fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },

  signupButton: {
    marginTop: 5,
    height: 30,
    width: 150,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    // marginVertical: 20,
  },
  bu_signupButton: {
    marginTop: 10,
    height: 30,
    width: 150,
    backgroundColor: "white",
    borderColor: Colors.themeColor,
    borderWidth: 2,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    // marginVertical: 20,
  },

  signupContianer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadButton: {
    height: 40,
    width: 300,
    borderWidth: 2,
    flexDirection: "row",
    borderColor: Colors.themeColor,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 25,
  },
  uploadButtonText: {
    fontSize: 20,
    marginTop: 5,
    color: Colors.themeColor,
    fontWeight: "bold",
    justifyContent: "center",
    marginLeft: "20%",
  },
  c_signupButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    marginLeft: 5,
    // marginRight:10
  },

  c_signupText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },

  c_signupButton: {
    height: 40,
    width: 170,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    marginVertical: 30,
  },

  paidText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    //color:'rgba(255,255,255, 0.7)',
    color: "white",
  },

  paidButton: {
    padding: 2,
    width: 70,
    // padding:10,
    marginTop: 5,
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
    height: "100%",
    width: "100%",

    backgroundColor: "rgba(0,0,0,0.3)",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bu_signupButton1: {
    marginTop: 10,
    height: 30,
    width: 150,
    backgroundColor: "white",
    borderColor: Colors.themeColor,
    borderWidth: 2,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    // marginVertical: 20,
  },
  signupButtonText1: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  bu_signupButtonText1: {
    fontSize: 20,
    color: Colors.themeColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton1: {
    marginTop: 5,
    height: 30,
    width: 150,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    // marginVertical: 20,
  },
});
export default PurchasedPayment;
