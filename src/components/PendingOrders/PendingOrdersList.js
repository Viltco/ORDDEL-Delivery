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
} from "react-native";

import {
  Container,
  Header,
  Spinner,
  Card,
  CardItem,
  Title,
  Thumbnail,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right,
  View,
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
//import ViewShot from "react-native-view-shot";
import Colors from "../../ColorCodes/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import URL from "../../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";
import * as ApiDataAction from "../../store/actions/ApiData";
import MyHeader from "../../components/MyHeader";
const PendingOrdersList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  //   const PendingData=useSelector(state=>state.ApiData.PendingData);
  //   console.log("PendingData",PendingData)
  //   const { Shipper_ID } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);
  const [disvisible, setDisvisible] = useState(false);
  const [status, setStatus] = useState("");
  const [totalQty, setTotalQty] = useState("");
  //   setDisvisible(true)
  var my_data = "";
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs(["Failed child context type"]);
  }, []);
  useEffect(() => {
    //   console.log("hi---------------")
    setIsLoading(true);
    if (RiderId != 0) {
      fetch(
        URL +
          "/order/list_assigned_orders/?delivery_person_id=" +
          RiderId +
          "&choice=pending"
      )
        // fetch(URL+'/client_app/clients_list/33/')
        .then(async (response) => {
          let data = await response.json();
          console.log("status code", response.status);
          //   console.log("status code",data)
          if (response.status == 200) {
            console.log("Pending:", data.response.total_quantity);
            // dispatch(ApiDataAction.PendingData(data.response));
            if (data.response == "") {
              setIsLoading(false);
              setLoading(true);
            } else {
              setTotalQty(data.response.total_quantity);
              setData(data.response);
              setIsLoading(false);
              setLoading(false);
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

    // .finally(() => setIsLoading(false));
    setDisvisible(false);
    //console.log(data)
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <MyHeader name="PENDING ORDERS" nav={navigation}/> */}

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
                  inverted
                  style={{ alignSelf: "center" }}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => item.index_id.toString()}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ marginTop: 5, marginBottom: 5 }}
                      onPress={() => {
                        console.log("Id", item.id);
                        // navigation.navigate({
                        //     routeName: ('OrderStatus'),
                        //     params: {
                        //         OrderBox:item.order_box

                        //     }
                        //   });
                        navigation.navigate("OrderStatus", {
                          OrderBox: item.order_box,
                          OrderId: item.id,
                          Packages: item.no_of_items,
                          Quantity: item.total_quantity,
                        });
                      }}
                      // onPress = {() => navigation.navigate("PendingDetails" , {Due_Date : item.due_date , Invoice_Total : item.grand_total,Carrier_Name : item.carrier_company ,Load_Type : item.load_type,Origin_City : item.Origin_city,Destination_City : item.Destination_city,Delivery_Option : item.Delivery_Option,Cargo_Amount : item.Cargo_amount,Cargo_Type : item.Cargo_Type,Cargo_Product_Type : item.Cargo_Product_type,Cargo_Product_List : item.Cargo_Product_List,Booking_Status : item.booking_status})}
                      //   onPress={() =>
                      //     navigation.navigate("PaymentHistoryDetail")
                      //   }
                    >
                      <View
                        style={{
                          width: "95%",
                          height: 60,
                          backgroundColor: "white",
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
                            width: "60%",
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
                            {item.client_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: Colors.productGrey,
                              //   marginTop: "4%",
                            }}
                          >
                            {item.order_delivery_datetime.split(" ")[0]}

                            {/* {`${
                              item?.order_created_datetime
                                ?.split("T")[0]
                                ?.split("-")[2]
                            }-${
                              item?.order_created_datetime
                                ?.split("T")[0]
                                ?.split("-")[1]
                            }-${
                              item?.order_created_datetime
                                ?.split("T")[0]
                                ?.split("-")[0]
                            }`} */}
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
                              alignItems: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: Colors.productGrey,
                                fontWeight: "bold",
                              }}
                            >
                              {item.no_of_items} items
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Colors.productGrey,
                                fontWeight: "bold",
                              }}
                            >
                              {item.total_quantity} Packages
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </Content>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 300,
    backgroundColor: "#EE0202",
    justifyContent: "center",
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
});
export default PendingOrdersList;
