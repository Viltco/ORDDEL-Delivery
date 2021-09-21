import React, { useState, useEffect } from "react";
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
  Platform,
} from "react-native";

import {
  Container,
  Header,
  Spinner,
  Card,
  CardItem,
  Title,
  Thumbnail,
  Item,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right,
  View,
} from "native-base";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
// import Toast from 'react-native-simple-toast'
//import ViewShot from "react-native-view-shot";
import Colors from "../ColorCodes/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import URL from "../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";
import * as ApiAction from "../store/actions/ApiData";
import MyHeader from "../components/MyHeader";
import CartItem from "../components/CartItem";
import { BottomSheet } from "react-native-btr";
function OrdersStatus({ navigation, route }) {
  const { OrderBox, OrderId, Packages, Quantity } = route.params;
  const packages = Packages;
  const [boxData, setBoxData] = useState("");
  const [boxDetail, setBoxDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dataStatus, setDataStatus] = useState("");
  const [note, setNote] = useState("");
  const [disvisible, setDisvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [clientImage, setClientImage] = useState("");
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const OId = OrderId;
  const OrderBoxId = OrderBox;
  const totalQuantity = Quantity;

  const setting = () => {
    toggleBottomNavigationView();

    // if(dataStatus=="in_progress")
    // {

    // }
  };

  const reject = () => {
    setIsLoading(true);
    fetch(URL + "/delivery_person/update_order_status/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: OId,
        delivery_person_action: "rejected",
      }),
    })
      .then(async (response) => {
        let data = await response.json();

        //    console.log("signup",response.status)
        console.log("Riderrrrrrrrrrrrrrrrrr", data);

        if (response.status == 200) {
          setIsLoading(false);
          console.log("Riderrrrrrrrrrrrrrrrrr", data);
          navigation.navigate("Dashboard");
        } else {
          console.log("Riderrrrrrrrrrrrrrrrrr", data);

          // Toast.show(data.message, Toast.LONG);

          alert(data.message);
        }
        //send_Verification_Code()
        // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
      })
      .catch((error) => console.log("Something went wrong", error));
    // toggleBottomNavigationView();
    setDisvisible(true);
  };

  const accept = () => {
    setIsLoading(true);
    fetch(URL + "/delivery_person/update_order_status/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: OId,
        delivery_person_action: "accepted",
      }),
    })
      .then(async (response) => {
        let data = await response.json();

        //  console.log("signup",response.status)
        if (response.status == 200) {
          setIsLoading(false);
          navigation.navigate("Dashboard");
        } else {
          // Toast.show(data.message, Toast.LONG);

          alert(data.message);
        }
        //send_Verification_Code()
        // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
      })
      .catch((error) => console.log("Something went wrong", error));
    // toggleBottomNavigationView();
    setDisvisible(true);
  };
  const purchase = () => {
    setIsLoading(true);
    navigation.navigate("DeliveryNote", {
      data: boxData,
      dataDetail: boxDetail,
      OID: OId,
      OrderBoxId: OrderBoxId,
      totalQuantity: totalQuantity,
    });
    // toggleBottomNavigationView();
    setDisvisible(true);
  };

  const getImage = (id) => {
    // console.log("Client Id::::::::",clientId)
    // if(clientId!=""){
    fetch(URL + "/client_app/get_client_logo/" + id + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(" Getting Image of client:", responseJson);
        setClientImage(responseJson.image);
        //   dispatch(ApiDataAction.SetImage(responseJson.image));
        //   setImageLoading(false);
        // setImageCheck(false);
        // setImage(responseJson.image);
      })
      .catch((error) => console.error(error));
    // }
  };

  useEffect(() => {
    // getToken();
    //   console.log("hi---------------")
    // console.log(PoNumber,"-----");
    // console.log(OrderId,"------")
    setIsLoading(true);
    fetch(URL + "/order/list_order/" + OrderBoxId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("OrderBoxDetail:", responseJson.order);
        setDeliveryNote(responseJson.order.delivery_notes);
        setBoxData(responseJson.order);
        setBoxDetail(responseJson.order.order_products);
        setIsLoading(false);
        setDataStatus(responseJson.order.status);
        getImage(responseJson.order.client_id);
        console.log(boxDetail, "-------");
        setIsLoading(false);
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
      .catch((error) => console.error(error));
    setDisvisible(false);
    // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [OrderBoxId, disvisible]);
  // console.log("Order Box Id:",OrderBoxId);
  // console.log("Order Box Id:",boxDetail);
  return (
    <View style={{ flex: 1 }}>
      {/* <MyHeader name="ORDERS STATUS" nav={navigation}/> */}
      <ScrollView>
        {isLoading ? (
          <Spinner color={Colors.themeColor} />
        ) : (
          <Content>
            <View style={styles.footer}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "3%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingTop: Platform.OS == "ios" ? 15 : 15,
                    paddingLeft: 15,
                  }}
                >
                  <Image
                    source={
                      clientImage == null || clientImage == ""
                        ? require("../assets/profilelogo.png")
                        : { uri: clientImage }
                    }
                    style={{
                      width: Platform.OS == "ios" ? 90 : 80,
                      height: Platform.OS == "ios" ? 90 : 80,
                      borderRadius: 60,
                    }}
                  />
                  {/* <Image source={require('../assets/profilelogo.png')} style={{width:Platform.OS=='ios'? 90:80,height:Platform.OS=='ios'? 90:80}}  /> */}
                </View>

                <View
                  style={{
                    paddingTop: Platform.OS == "ios" ? 0 : 0,
                    paddingLeft: 12,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.textGreyColor,
                      fontSize: Platform.OS == "android" ? 20 : 22,
                      alignSelf: "center",
                      width: 230,
                    }}
                  >
                    {boxData.client}
                  </Text>
                  <Text style={{ fontSize: 13, marginTop: 2 }}>
                    Order No: {boxData.purchase_order_no}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: Colors.textGreyColor,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 100,
                  borderColor: Colors.textGreyColor,
                  borderWidth: 5,
                  marginTop: "3%",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.themeColor,
                    marginTop: "20%",
                    fontWeight: "bold",
                    fontSize: 12,
                    margin:'2%'
                  }}
                >
                
                Date & Time
                  {/* {boxData.order_delivery_datetime} */}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.themeColor,
                    //marginTop: "35%",
                    fontWeight: "bold",
                    fontSize: Platform.OS == "android" ? 12 : 11,
                  }}
                >
                  {boxData.order_delivery_datetime}
                </Text>
              </View>
              <View style={{ alignSelf: "center", marginLeft: "5%" }}>
                <View
                  style={{
                    backgroundColor: Colors.themeColor,
                    height: Platform.OS == "android" ? 17 : 15,
                    borderRadius: 4,
                    width: "40%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {dataStatus.toUpperCase()}
                  </Text>
                </View>
                <Text style={{ color: Colors.productGrey, fontSize: 14 }}>
                  Delivery Address:{" "}
                </Text>
                <Text style={{ fontSize: 16, width: 210 }}>
                  {boxData.business_address}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text
                style={{
                  color: Colors.themeColor,
                  width: "30%",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginLeft: "1%",
                }}
              >
                Product
              </Text>
              <Text
                style={{
                  color: Colors.themeColor,
                  width: "20%",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Unit
              </Text>
              <Text
                style={{
                  color: Colors.themeColor,
                  width: "20%",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Quantity
              </Text>
              <Text
                style={{
                  color: Colors.themeColor,
                  fontSize: 17,
                  fontWeight: "bold",
                  marginRight: 20,
                  width: "25%",
                  textAlign: "right",
                }}
              >
                Last Month Avg.Price
              </Text>
            </View>
            {/* <View style={{borderBottomColor:Colors.textGreyColor,borderBottomWidth:2,}}> */}
            <View style={{ marginBottom: 10 }}>
              <FlatList
                data={boxDetail}
                keyExtractor={(item) => item.product_id}
                renderItem={(itemData) => (
                  <CartItem
                    id={itemData.item.product_id}
                    quantity={itemData.item.quantity}
                    total_amount={itemData.item.total_amount}
                    name={itemData.item.product_name}
                    unit={itemData.item.product_unit}
                    price={itemData.item.avg_price}
                  />
                )}
              />
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
                    color: Colors.themeColor,
                    width: "21%",
                    textAlign: "left",
                    marginLeft: "1%",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    color: Colors.themeColor,
                    width: "75%",
                    textAlign: "center",
                    // paddingLeft: "15%",
                    fontWeight: "bold",
                  }}
                >
                  {totalQuantity}
                </Text>
              </View>
            </View>
            {deliveryNote == "" ? null : (
              <Card
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "#E2E2E2",
                  elevation: 0,
                  marginTop: 20,
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: Colors.productGrey, textAlign: "center" }}
                >
                  Note: {deliveryNote}
                </Text>
              </Card>
            )}
            {dataStatus == "in progress" ? null : (
              <View style={{ alignSelf: "center", marginTop: 20 }}>
                {dataStatus == "in progress" ||
                dataStatus == "purchased" ? null : (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      disabled={
                        dataStatus == "in progress" || dataStatus == "purchased"
                          ? true
                          : false
                      }
                      onPress={accept}
                    >
                      <Text style={styles.buttonText}>ACCEPT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.r_button} onPress={reject}>
                      <Text style={styles.buttonText}>REJECT</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* {dataStatus=='pending'?null:
            <TouchableOpacity onPress={purchase} style={styles.button}>
                <Text style={styles.buttonText}>Deliver Note</Text>
            </TouchableOpacity>} */}
              </View>
            )}
            {/* <View style={{alignSelf:'center',marginTop:40}}>
            <TouchableOpacity onPress={setting} disabled={dataStatus=="purchased"?true:false} style={styles.button}>
            <Text style={styles.buttonText}>{dataStatus.toUpperCase()}</Text>
            </TouchableOpacity>
        </View> */}
            <BottomSheet
              visible={visible}
              //setting the visibility state of the bottom shee
              onBackButtonPress={toggleBottomNavigationView}
              //Toggling the visibility state on the click of the back botton
              onBackdropPress={toggleBottomNavigationView}
              //Toggling the visibility state on the clicking out side of the sheet
            >
              {/*Bottom Sheet inner View*/}
              <View style={styles.bottomNavigationView}>
                <View style={{ alignSelf: "center" }}>
                  {dataStatus == "in progress" ? null : (
                    <TouchableOpacity
                      style={styles.button}
                      disabled={
                        dataStatus == "in progress" || dataStatus == "purchased"
                          ? true
                          : false
                      }
                      onPress={accept}
                    >
                      <Text style={styles.buttonText}>ACCEPTED</Text>
                    </TouchableOpacity>
                  )}
                  {dataStatus == "pending" ? null : (
                    <TouchableOpacity
                      disabled={
                        dataStatus == "purchased" || dataStatus == "pending"
                          ? true
                          : false
                      }
                      onPress={purchase}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>PURCHASED</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </BottomSheet>
          </Content>
        )}
        {/* </View> */}

        {/* )}
        {/* <View style={{flexDirection:'row'}}>
            <Text style={{color:Colors.themeColor,marginLeft:"35%"}}>Total Price:</Text>
            <Text style={{color:Colors.themeColor,marginLeft:50}}>78656/-</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}

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
    fontWeight: "bold",
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
    flex: 1,
    width: "100%",
    //backgroundColor:'#EE0202',
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    backgroundColor: "#ffffff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    //paddingVertical: 10,
    // paddingHorizontal: 60,
  },
  g_container: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    marginVertical: 15,
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderColor: Colors.textGreyColor,
    borderWidth: 2,

    borderRadius: 5,
    paddingHorizontal: 30,
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 10,
  },
  r_button: {
    height: 40,
    width: 300,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
    // marginVertical: 20,
  },
  s_button: {
    height: 40,
    width: 300,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    borderRadius: 25,
    //   marginVertical: 5,
  },

  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 90,
    // justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default OrdersStatus;
