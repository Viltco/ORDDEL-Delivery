// import React,{useState ,useEffect} from 'react';
// import { StyleSheet, View,ImageBackground , TouchableOpacity,Image, ScrollView,StatusBar,SafeAreaView} from 'react-native'
// import { Container,Card,CardItem,Header,Content,Left,Footer ,Body,Icon, Right, Button,Drawer, Title,Text , Item,Input } from 'native-base';

// import URL from '../api/ApiURL';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Colors from '../ColorCodes/Colors';

// function BuisnessDetail({route ,navigation}) {
//     return (
//         <View style = {{height:"15%"}}>
//         <Header iosBarStyle="light-content"
//              androidStatusBarColor={Colors.themeColor} style = {{backgroundColor:Colors.themeColor,borderBottomColor:'#ffffff00',marginTop:Platform.OS=='android'? null:null,height:150}}>

//                <Left>
//                  <Button
//                  onPress={() => navigation.openDrawer()}
//                  transparent>
//                 <Ionicons name="menu" size={35} color="white" />
//                  </Button>
//                </Left>
//                {/* <Body> */}
//                  <Title style = {{color:'white',fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>BUISNESS DETAILS</Title>
//                {/* </Body> */}
//               <Right>
//                 <Image source={require('../assets/colorLogo.png')} style={{width:Platform.OS=='ios'? 50:40,height:Platform.OS=='ios'? 50:40}} />
//               </Right>

//              </Header>
//              {/* <Header searchBar rounded>
//           <Item>
//             <Icon name="ios-search" />
//             <Input placeholder="Search" />
//             <Icon name="ios-people" />
//           </Item>
//           <Button transparent>
//             <Text>Search</Text>
//           </Button>
//         </Header> */}
//          </View>
//     )
// }

// export default BuisnessDetail

import React from "react";
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
  BackHandler,
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
import MyHeader from "../../components/MyHeader";
import { useRoute, useFocusEffect } from "@react-navigation/native";

//import * as ApiAction from "../../store/actions/ApiData";


const BuisnessDetail = ({ navigation,route }) => {

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
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  //   const { Shipper_ID } = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  useEffect(() => {
    //   console.log("hi---------------")
    LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component",
    ]);

    setIsLoading(true);
    fetch(URL + "/delivery_person/list_business/delivery_person/" + RiderId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Buisness Detail:", responseJson);
        // console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
        setData(responseJson.delivery_person_businesses);
        if (responseJson.delivery_person_businesses == "") {
          setIsLoading(false);
          setLoading(true);
        } else {
          setLoading(false);
        }
        setIsLoading(false);
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error(error));
    // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [isFocused]);

  return (
    <View style={{ flex: 1, height: "100%" }}>
      {/* <MyHeader name="BUSINESS DETAIL" nav={navigation} /> */}

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={styles.uploadButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("NewBuisnessDetail")}
        >
          <Text style={styles.uploadButtonText}>Add New Business</Text>
        </TouchableOpacity>
      </View>
      {loading && (
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
            // size={Platform.OS == "ios" ? 250 : 150}

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
      )}

      {isLoading ? (
        <Spinner color={Colors.themeColor} />
      ) : (
        (console.log("data", data),
        (
          <Content>
            <View style={{ marginTop: 10 }}>
              <FlatList
                data={data}
                inverted
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: "center", padding: 10 }}
                // keyExtractor={item => item.index_id.toString()}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <Card style={{ borderRadius: 15 }}>
                    <TouchableOpacity
                      style={{ width: "100%" }}
                      onPress={() => {
                        // dispatch(
                        //   BusinessDate.updateBuisnessDetail(
                        //     item.name,
                        //     item.nature,
                        //     item.type,
                        //     item.address
                        //   )
                        // );
                        navigation.navigate("EditBuisnessDetail", {
                          BName: item.name,
                          BAdress: item.address,
                          BNature: item.nature,
                          BType: item.type,
                          ID: item.id,
                        });
                      }}

                      // onPress={()=>{
                      //     console.log("Id",item.id)
                      //     // navigation.navigate({
                      //     //     routeName: ('OrderStatus'),
                      //     //     params: {
                      //     //         OrderBox:item.order_box

                      //     //     }
                      //     //   });
                      //     navigation.navigate("OrderStatus",{OrderBox:item.order_box,OrderId:item.id,Packages:item.no_of_items});
                      // }}
                      // onPress = {() => navigation.navigate("PendingDetails" , {Due_Date : item.due_date , Invoice_Total : item.grand_total,Carrier_Name : item.carrier_company ,Load_Type : item.load_type,Origin_City : item.Origin_city,Destination_City : item.Destination_city,Delivery_Option : item.Delivery_Option,Cargo_Amount : item.Cargo_amount,Cargo_Type : item.Cargo_Type,Cargo_Product_Type : item.Cargo_Product_type,Cargo_Product_List : item.Cargo_Product_List,Booking_Status : item.booking_status})}
                      //   onPress={() =>
                      //     navigation.navigate("PaymentHistoryDetail")
                      //   }
                    >
                      {/* {console.log("Business_name",item.business_details[0]['name'])} */}
                      <View
                        style={{
                          //   borderRadius: 10,
                          //   backgroundColor: "white",
                          //   overflow: "hidden",

                          flexDirection: "column",
                          //   justifyContent: "flex-start",
                          //   alignSelf: "center",

                          //   marginTop: 10,
                          //   shadowColor: "#000",
                          //   shadowOffset: { width: 0, height: 2 },
                          //   shadowOpacity: 0.25,
                          //   shadowRadius: 3.84,
                          //   elevation: 5,
                        }}
                      >
                        {/* <View style={{flexDirection: "column"}}> */}
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              padding: 10,
                              width: "100%",
                              // alignSelf: "center",
                              // alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: Colors.darkRedColor,
                                //   marginTop: "4%",
                              }}
                            >
                              {item.name}
                            </Text>

                            <View
                              style={{
                                // width: 200,
                                flexDirection: "row",
                                alignItems: "center",

                                marginTop: "1.5%",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "grey",
                                  width: 240,
                                }}
                              >
                                {item.address}
                              </Text>
                            </View>

                            {/* </View> */}
                            {/* <View
                    style={{
                      width: "80%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: -5,
                    }}
                  >
                    
                  </View> */}
                          </View>
                          <View style={{ alignSelf: "center" }}>
                            {/* <Text style={{marginBottom:3,fontSize:14,alignSelf:'flex-end',marginRight:10,fontWeight:'bold'}}>{item.type}</Text> */}
                            {/* <Text style={{ fontSize:12,alignSelf:'flex-end', color: "white",backgroundColor:Colors.darkRedColor,borderRadius:10,padding:5,}}>
                        {item.status}
                    </Text> */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Card>
                  //       <Card style={{borderRadius:15}}>
                  //       <TouchableOpacity
                  //       style={{width:"85%"}}
                  //       >
                  //           {/* {console.log("Business_name",item.business_details[0]['name'])} */}
                  //         <View
                  //           style={{
                  //             flexDirection: "column",
                  //             width:'100%'
                  //           }}
                  //         >
                  //             {/* <View style={{flexDirection: "column"}}> */}
                  //           <View style={{flexDirection:'row',width:'100%'}}>
                  //           <View
                  //             style={{
                  //               padding: 10,
                  //               width: "80%",
                  //               // alignSelf: "center",
                  //               // alignItems: "center",
                  //               justifyContent: "flex-start",
                  //             }}
                  //           >

                  //             <Text
                  //               style={{
                  //                 fontSize: 20,
                  //                 fontWeight: "bold",
                  //                 color:Colors.darkRedColor
                  //               //   marginTop: "4%",
                  //               }}
                  //             >

                  //               {item.name}
                  //             </Text>

                  //             <View
                  //               style={{
                  //                 // width: 200,
                  //                  flexDirection: "row",
                  //                 alignItems: "center",

                  //                 marginTop: "1.5%",
                  //               }}
                  //             >
                  //               <Text style={{ fontSize: 14, color: "grey",width:200 }}>

                  //                 {item.nature}
                  //               </Text>

                  //             </View>

                  //               {/* </View> */}
                  //             {/* <View
                  //               style={{
                  //                 width: "80%",
                  //                 flexDirection: "row",
                  //                 alignItems: "center",
                  //                 justifyContent: "center",
                  //                 marginTop: -5,
                  //               }}
                  //             >

                  //             </View> */}

                  //           </View>
                  //           <View style={{padding:10,width:'25%'}}>
                  //                 <Text style={{marginBottom:3,fontSize:14,textAlign:"center",color:Colors.textGreyColor}}>Type</Text>
                  //               <Text style={{ fontSize:14,textAlign:"center", color: "white",backgroundColor:Colors.darkRedColor,borderRadius:5,paddingHorizontal:5,}}>
                  //                   {item.type}
                  //               </Text>
                  //               </View>
                  //         </View>
                  //         </View>

                  //         {/* <Card>
                  //       <CardItem>
                  //         <Left>
                  //         <Text style = {{color:'#0f70b7',fontSize:19,fontWeight:'bold'}}>{item.carrier_company}</Text>

                  //          </Left>
                  //           <Body>

                  //           </Body>

                  //         <Right><Text style =  {{fontSize:12,fontWeight:'bold'}}>Rs:{item.grand_total}/-</Text></Right>
                  //       </CardItem>

                  //       <CardItem style = {{borderTopWidth:1,borderTopColor:'lightgray'}}>
                  //         <Left>
                  //         <Text style = {{color:'gray'}}>{item.Origin_city}</Text>

                  //         </Left>
                  //         <Body>

                  //         <Image
                  //   style={{height:15,width:150,alignSelf:'center'}}
                  //   source={require('../../assets/route.png')}
                  // />

                  //         </Body>
                  //         <Right>
                  //         <Text style = {{color:'gray'}}>{item.Destination_city}</Text>

                  //         </Right>
                  //       </CardItem>

                  //       {/* <CardItem>
                  //         <Left>
                  //         <Text style = {{color:'gray'}}>{item.Origin_city}</Text>
                  //         </Left>
                  //         <Body>

                  //         </Body>
                  //         <Right>
                  //         <Text style = {{color:'gray'}}>{item.Destination_city}</Text>
                  //         </Right>
                  //       </CardItem> */}

                  //          {/* </Card>   */}
                  //       </TouchableOpacity>
                  //       </Card>
                )}
              />
            </View>
          </Content>
        ))
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
export default BuisnessDetail;
