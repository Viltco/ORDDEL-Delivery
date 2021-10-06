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
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
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
import { Dimensions } from 'react-native';
// import Toast from 'react-native-simple-toast'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  Collapse,
  CollapseHeader,
  CollapseFooter,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
//import ViewShot from "react-native-view-shot";
import Colors from "../../ColorCodes/Colors";
import DropdownAlert from "react-native-dropdownalert";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import URL from "../../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card";
import * as ConsolidateAction from "../../store/actions/Consolidate";
import MyAlert from "../MyAlert";
import * as CounterAction from "../../store/actions/CountCheck";
import ConsolidatedItem from "../../Models/Consolidate";
import DateTimePickerModal from "react-native-modal-datetime-picker";



const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
  onPress={() => Keyboard.dismiss()}>
   {children}
  </TouchableWithoutFeedback>
  );


const Consolidate = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  const [currentDate, setCurrentDate] = useState("");
  const counterdata = useSelector((state) => state.CountCheck.counter);
  console.log(counterdata, "counter data ..........");

  const [formattedDate, setFormattedDate] = useState("");
  var datee;
  var monthh;
  var yearr;
  const jogar = useSelector((state) => state.Consolidate.items);
  const jogar1 = useSelector((state) => state.Consolidate.items);
  console.log(jogar, "1234......");
  //const counter= useSelector(state=> state.ConsolidateAction.counter)
  console.log(jogar["unit_sales_price"], "======");
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.Consolidate.items) {
      transformedCartItems.push({
        product_id: key,
        // id:items[key],
        delivery_person_id: state.Consolidate.items[key].delivery_person_id,
        supplier: state.Consolidate.items[key].supplier,
        unit_purchase_price: state.Consolidate.items[key].unit_purchase_price,
        profit_margin: state.Consolidate.items[key].profit_margin,
        unit_sales_price: state.Consolidate.items[key].unit_sales_price,
        profit_margin_choice: state.Consolidate.items[key].profit_margin_choice,
        portrage_price: state.Consolidate.items[key].portrage_price,
      });
    }
    return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });
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

  //New-------------------------------------
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
    month2 = month2 +1;
    var year2 = date.getFullYear();

    const formatedData = date2.toString().length == 1 ? `0${date2}` : date2;
    const formatedMonth =
      month2.toString().length == 1 ? `0${month2 }` : month2 ;

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
  //......-------------------------------------


  console.log(cartItems.unit_sales_price, "---------");
  var unitSale = cartItems.unit_sales_price;
  console.log("CartItem: ", cartItems);

  const OnSubmit = () => {
    console.log(counterdata, "Count....");
    console.log(length, "Length........");
    console.log(".........----------mmmm", formattedDate);
    //alert(count,'countttttttt........')
    //alert(length,'lenghtttt........')
    if (counterdata == length || counterdata > length) {
      const res = fetch(URL + "/order/insert_purchase_details/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_date: formattedDate == "" ? currentDate : formattedDate,
          purchase_details: cartItems,
        }),
      })
        .then(async (response) => {
          let data = await response.json();
          console.log("consolidate Api data response...... ", data);
          console.log("put", response.status);
          if (response.status == 200) {
            console.log("Its work");
            // dropDownAlertRef.alertWithType('success', 'Success', 'Your Detail was Submitted.');
            alert("Your details has been submitted.");

            dispatch(ConsolidateAction.AllClear(1)), setCount(0);
            dispatch(CounterAction.ClearCounter());

            navigation.navigate('PurchasedOrdersList');

          }

        })
        .catch((error) => console.log("Something went wrong", error));
    } else {

      alert("Please fill all product pricing details.");
    }
  };


  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [unitPurchasedPrice, setUnitPurchasedPrice] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [unitSalePrice, setUnitSalePrice] = useState(0);
  const [portagePrice, setPortagePrice] = useState(0);
  const [consoliDate, setConsoliDate] = useState("");
  const [length, setLength] = useState(0);
  var [count, setCount] = useState(0);
  const [noRecord, setNoRecord] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedQty, setSelectedQty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [checked, setChecked] = useState("value");


  var reg = /[\-\+]?[0-9]*(\.[0-9]+)?/
  var reg1 = /^\d+$/;
  const bgColor = [
    "#E21B1B",
    "#F7931E",
    "#8CC63F",
    "#6A68AD",
    "#62B4C0",
    "#9D7AAC",
  ];
  const [checkColor, setCheckColor] = useState(true);

  const [newDate, setNewDate] = useState("");
  const checkPurchasedPrice = () => {
    if (unitPurchasedPrice != "") {
      if (reg.test(unitPurchasedPrice) === false) {
        alert("Invalid unit purchased price");
        setUnitPurchasedPrice("");
        return false;
      }
    }
  };
  const checkProfitMargin = () => {
    if (profitMargin != "") {
      if (reg.test(profitMargin) === false) {
        alert("Invalid profit margin");
        setProfitMargin("");
        return false;
      }
    }
  };
  const checkPorteragePrice = () => {
    if (portagePrice != "") {
      if (reg.test(portagePrice) === false) {
        alert("Invalid porterage price");
        setPortagePrice("");
        return false;
      }
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  useEffect(() => {
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
            "/order/list_consolidate_purchases/" +
            RiderId +
            "/?order_delivery_datetime=" +
            currentDate
        )
          // fetch(URL+'/client_app/clients_list/33/')
          .then(async (response) => {
            setIsLoading(true);
            let data = await response.json();

            // console.log("status code",response.status)
            console.log("Consolidate", data);
            if (response.status == 200) {
              console.log("Consolidate:", data);
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


          })
          .catch((error) => console.error("From Consolidate", error));
      } else {
        fetch(
          URL +
            "/order/list_consolidate_purchases/" +
            RiderId +
            "/?order_delivery_datetime=" +
            formattedDate
        )
          // fetch(URL+'/client_app/clients_list/33/')
          .then(async (response) => {
            setIsLoading(true);
            let data = await response.json();

            // console.log("status code",response.status)
            console.log("Consolidate", formattedDate, "-------", data);
            if (response.status == 200) {
              console.log("Consolidate:", formattedDate, "-------", data);
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
  }, [changeIcon, isFocused, formattedDate]);

  return (


    <DismissKeyboard>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View style={{height:"70%"}}>  */}

        <View style={{justifyContent:"center", alignSelf:"center", paddingTop:14}}>
        <Text style={{fontSize:19, fontWeight:'bold', color:Colors.themeColor}}>Delivery Date</Text>
        </View>


      <View style={{ padding: 5, alignSelf: "center" }}>
        <TouchableOpacity
          style={{ marginTop: 10, marginBottom: 5}}
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
                  data={data.data}
                  style={{ alignSelf: "center" }}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => item.index_id.toString()}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ marginTop: 5, marginBottom: 5 }}
                      onPress={() => {
                        console.log("idddd", jogar[item.product_id]);
                        if (jogar[item.product_id]) {

                          alert(item.product_name + " is already filled");
                          //disabled={true}
                        } else {
                          setSelectedProductId(item.product_id),
                            setSelectedProductName(item.product_name),
                            setSelectedQty(item.qty),
                            setSelectedUnit(item.unit),
                            setModalVisible(!modalVisible);
                        }
                      }}
                    >
                      <View
                        style={{
                          width: "95%",

                          height: 60,
                          backgroundColor: jogar[item.product_id]
                            ? "#ffe6e6"
                            : "white",
                          alignSelf: "center",
                          borderRadius: 10,
                          flexDirection: "row",
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      >
                        <View
                          style={{
                            width: "70%",
                            justifyContent: "center",
                            paddingLeft: 23,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: Colors.darkRedColor,
                              //   marginTop: "4%",
                            }}
                          >
                            {item.product_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "30%",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingRight: 23,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "gray",
                            }}
                          >
                            Quantity
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Colors.productGrey,
                              fontWeight: "bold",
                            }}
                          >
                            {item.qty} {item.unit}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
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
           <KeyboardAvoidingView style={{ flex: 1 }}
  behavior={Platform.OS == "ios" ? "padding" : null} >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Card
                  style={{
                    borderRadius: 10,
                    width: 320,
                    height: 500,
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {/* <View style={{padding:12,marginLeft:10}}>
            <Image source={require('../../assets/icon.png')} style={{width:Platform.OS=='ios'? 50:40,height:Platform.OS=='ios'?70:60}} />

                </View> */}

                    {/* <Entypo name="box" color='white' size={70} style={{justifyContent:'flex-start'}} /> */}
                    {/* <View style={{justifyContent:'flex-end'}}> */}

                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 25,
                        paddingBottom: 5,
                        justifyContent: "center",
                        width: 220,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          color: Colors.themeColor,
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {selectedProductName.toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          color: Colors.themeColor,
                          width: "40%",
                        }}
                      >
                        {selectedQty} {selectedUnit.toUpperCase()}
                      </Text>
                    </View>

                    {/* </View> */}
                  </View>

                  {/* <Text style={styles.s_verticleLine}></Text>  */}
                  {/* <Text style={{color:'white',fontSize:16,fontWeight:'bold',textAlign:'right',paddingRight:20}}></Text> */}





                  <View style={{ padding: 10,   }}>
                    {/* <Card style={{}}> */}
                    <TextInput
                      style={styles.name_inputArea}
                      placeholder="Supplier Name"
                      autoFocus={true}
                      autoCapitalize="words"
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
                      keyboardType="decimal-pad"
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
                      keyboardType="decimal-pad"
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
                      keyboardType="decimal-pad"
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
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <TouchableOpacity
                        onPress = { () => {
                          setChecked("value");

                      }}
                        style={{
                          ...styles.radioButtonContainer,
                        }}
                      >
                        <RadioButton
                          // style={{ borderColor: "black", borderWidth: 1 }}
                          color="#EE0202"
                          value="value"
                          status={checked === "value" ? "checked" : "unchecked"}
                          onPress={() => {
                            // setChecked("value");
                            console.log("Checked:", checked);
                          }}
                        />
                        <Text
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            marginRight: 5,
                          }}
                        >
                          Profit Per Unit
                        </Text>
                        {/* <Text> {cash} </Text> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress = { () => {
                        setChecked("percentage")
                      }

                      }
                      style={styles.radioButtonContainer}>
                        <RadioButton
                          color="#EE0202"
                          value="percentage"
                          status={
                            checked === "percentage" ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            // setChecked("percentage");
                            console.log("Checked:", checked);
                          }}
                        />
                        <Text
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            marginRight: 5,
                          }}
                        >
                          Profit in Percentage
                        </Text>
                        {/* <Text> {cash} </Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>



                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.productGrey,
                        textAlign: "center",
                      }}
                    >
                      Unit Sale Price:{" "}
                    </Text>
                    {checked == "value" ? (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: Colors.themeColor,
                        }}
                      >
                        £{" "}
                        {isNaN(
                          parseFloat(
                            (unitPurchasedPrice * selectedQty +
                              selectedQty * profitMargin) /
                              selectedQty +
                              parseFloat(portagePrice)
                          ).toFixed(2)
                        ) == true
                          ? 0
                          : parseFloat(
                              (unitPurchasedPrice * selectedQty +
                                selectedQty * profitMargin) /
                                selectedQty +
                                parseFloat(portagePrice)
                            ).toFixed(2)
                            }
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: Colors.themeColor,
                        }}
                      >
                        £{" "}
                        {parseFloat(
                          (unitPurchasedPrice * selectedQty +
                            ((unitPurchasedPrice * selectedQty) / 100) *
                              profitMargin) /
                            selectedQty +
                            parseFloat(portagePrice)
                        ).toFixed(2)}
                      </Text>
                    )}
                  </View>
                  <Pressable
                    style={styles.signupButton}
                    activeOpacity={0.7}
                    onPress={() => {
                      if (
                        supplier == "" ||
                        unitPurchasedPrice == "" ||
                        profitMargin == "" ||
                        portagePrice == ""
                      ) {
                        // dropDownAlertRef.alertWithType('error', '',"Please fill all fields");
                        // Toast.show("Please Fill All Fields.", Toast.LONG);
                        alert("Please fill all fields.");

                        // alert("Please fill all fields")
                      } else if (reg.test(unitPurchasedPrice) === false) {
                        alert("Invalid unit purchased price");
                        setUnitPurchasedPrice("");
                        return false;
                      } else if (reg.test(profitMargin) === false) {
                        alert("Invalid profit margin");
                        setProfitMargin("");
                        return false;
                      } else if (reg.test(portagePrice) === false) {
                        alert("Invalid porterage price");
                        setPortagePrice("");
                        return false;
                      }

                      else {
                        setModalVisible(!modalVisible);
                        //setUnitSalePrice(((unitPurchasedPrice*item.qty)+(unitPurchasedPrice*item.qty/100*profitMargin))),
                        dispatch(
                          ConsolidateAction.AddConsolidateData(
                            RiderId,
                            selectedProductId,
                            supplier,
                            unitPurchasedPrice,
                            profitMargin,
                            selectedQty,
                            unitPurchasedPrice * selectedQty,
                            checked,
                            portagePrice
                          )
                        ),
                          alert(selectedProductName + " record is saved"),

                          setSupplier(""),
                          setUnitPurchasedPrice(""),
                          setProfitMargin(""),
                          setUnitSalePrice(""),
                          setPortagePrice(0);
                        //setCount(count+1)
                        dispatch(CounterAction.AllCounter(1));
                      }
                    }}
                  >
                    <Text style={styles.signupButtonText}>SAVE</Text>
                  </Pressable>
                  <Pressable
                    style={{ ...styles.bu_signupButton, borderWidth: 1 }}
                    activeOpacity={0.7}
                    onPress={() => {
                      setModalVisible(!modalVisible),
                        setSupplier(""),
                        setUnitPurchasedPrice(""),
                        setProfitMargin(""),
                        setUnitSalePrice(""),
                        setPortagePrice(0);
                    }}
                  >
                    <Text style={styles.bu_signupButtonText}>CANCEL</Text>
                  </Pressable>
                </Card>
              </View>
            </View>
            </KeyboardAvoidingView>
          </Modal>











          {loading ? null : (
            <View
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
                  color: Colors.productGrey,
                  width: "53%",
                  textAlign: "center",
                  // marginLeft: "10%",
                  fontWeight: "bold",
                }}
              >
                Total Packages
              </Text>
              <Text
                style={{
                  color: Colors.productGrey,
                  width: "40%",
                  textAlign: "center",
                  paddingLeft: "8%",
                  fontWeight: "bold",
                }}
              >
                {data.total_packages}
              </Text>
            </View>
          )}

          {loading ? null : (
            <TouchableOpacity
              style={styles.Create_Delivery_N_Voice}
              activeOpacity={0.7}
              onPress={OnSubmit}
            >
              <Text style={styles.c_signupButtonText}>Create Delivery Note and Invoice </Text>
            </TouchableOpacity>
          )}
        </Content>
      )}

    </View>

    </DismissKeyboard>

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
    marginVertical: 4,
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
    marginVertical: 4,
    // textAlign:'right',
    height: 40,
    width: 300,
    backgroundColor: "#F2F1F3",
    borderRadius: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
    marginTop: 10,

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
  Create_Delivery_N_Voice: {
    height: 40,
    width: 270,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    alignSelf: "center",
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
    // height:"100%"
    // marginBottom: 100,

    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    // borderRadius: 20,
    padding: 35,
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
});
export default Consolidate;
