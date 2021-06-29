import React, { useState } from "react";
import {
  CommonActions,
  NavigationContainer,
  useRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  NativeModules,
  processColor,
  Image,
} from "react-native";
import Colors from "../ColorCodes/Colors";
import { Component } from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Drawer/DrawerContent";
import FirstView from "../FirstView";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import VerificationCode from "../components/verification/VerificationCode";
import TopTabNavigator from "..//components/InProgressOrders/TopTabNavigator";
import LandingScreen from "../components/LandingScreen";
import InProgressListOrders from "../components/InProgressOrders/InProgressOrdersList";
import PendingOrdersList from "../components/PendingOrders/PendingOrdersList";
import EmailVerification from "../components/EmailVerification";
import CompletedOrdersList from "../components/CompletedOrders/CompletedOrdersList";
import OrderStatus from "../components/OrdersStatus";
import MyHeader from "../components/MyHeader";
import PurchasedOrdersList from "../components/PurchasedOrdersList";
import DeliveryNote from "../components/DeliveryNote";
import PurchasedOrderStatus from "../components/PurchasedOrderStatus";
import Invoice from "../components/Invoice";
import Support from "../components/Support";
import Profile from "../components/Profile";
import ForgotPassword from "../components/ForgotPassword";
import ShowInvoice from "../components/ShowInvoice";
import ForgotPasswordVerification from "../components/ForgotPasswordVerification";
import ChangeForgotPassword from "../components/ChangeForgotPassword";
import ChangePasswordByEmail from "../components/ChangePasswordByEmail";
import Packages from "../components/Packages";
import PaymentMethods from "../components/PaymentMethods";
import TermCondition from "../components/Terms&Conditions";
import BuisnessDetail from "../components/BuisnessDetails/BuisnessDetail";
import EditBuisnessDetail from "../components/BuisnessDetails/EditBuisnessDetail";
import NewBuisnessDetail from "../components/BuisnessDetails/NewBuisnessDetail";
import MyAlert from "../components/MyAlert";
import BankDetails from "../BankDetails/BankDetails";
import PurchasedPayment from "../components/PurchasedPayment";
//import PurchasedPayment from '../components/PurchasedPayment';
import PaymentTopTapNavigator from "../components/PaymentTopTapNavigator";
import PaidPayments from "../components/PaidPayments";

const Stack = createStackNavigator();

function MyStack() {
  const Drawer = createDrawerNavigator();

  function MyDrawer({ route, navigation }) {
    //const {Company_Data} = route.params

    return (
      //  <>
      // <SafeAreaView style={styles.topSafeArea} />
      // <SafeAreaView style={styles.bottomSafeArea}>
      // <StatusBar barStyle="default" backgroundColor="#0f70b7" />
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ width: 280 }}
        options={{ headerShown: false }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            title: "DASHBOARD",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        {/* <Drawer.Screen name="TopTabNavigator" component={TopTabNavigator} options={{headerShown: false}} /> */}
        {/* <Drawer.Screen name="PendingOrdersList" component={PendingOrdersList} /> */}
        {/* <Drawer.Screen name="OrderStatus" component={OrderStatus} /> */}
        {/* <Drawer.Screen name="CompletedOrdersList" component={CompletedOrdersList} options={{headerShown: false}}/> */}
        <Drawer.Screen
          name="MyHeader"
          component={MyHeader}
          options={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}
        />
        {/* <Drawer.Screen name="DeliveryNote" component={DeliveryNote} options={{headerShown: false}}/> */}
        {/* <Drawer.Screen name="PurchasedOrderStatus" component={PurchasedOrderStatus} options={{headerShown: false}}/> */}
        {/* <Drawer.Screen name="Invoice" component={Invoice} options={{headerShown: false}}/> */}
        {/* <Drawer.Screen name="Support" component={Support} options={{headerShown: false}}/> */}
        {/* <Drawer.Screen name="ShowInvoice" component={ShowInvoice} options={{headerShown: false}}/> */}
        <Drawer.Screen
          name="ForgotPasswordVerification"
          component={ForgotPasswordVerification}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        {/* <Drawer.Screen name="PurchasedOrdersList" component={PurchasedOrdersList} options={{headerShown: false}}/> */}
      </Drawer.Navigator>

      //  </SafeAreaView>
      //   </>
    );
  }
  return (
    //   <>
    // <SafeAreaView style={styles.topSafeArea} />
    // <SafeAreaView style={styles.bottomSafeArea}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FirstView"
          component={FirstView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/> */}
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TopTabNavigator"
          component={TopTabNavigator}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "IN PROGRESS ORDERS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Packages"
          component={Packages}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "PACKAGES",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="InProgressListOrders"
          component={InProgressListOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompletedOrdersList"
          component={CompletedOrdersList}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "COMPLETED ORDERS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight:
              // <View style={{height:'100%',width:'20%',justifyContent:'center'}}>
              () => (
                <Image
                  source={require("../assets/colorLogo.png")}
                  style={{
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == "ios" ? 40 : 50,
                  }}
                />
              ),

            // </View>
          }}
        />
        <Stack.Screen
          name="TermCondition"
          component={TermCondition}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "TERMS & CONDITIONS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight:
              // <View style={{height:'100%',width:'20%',justifyContent:'center'}}>
              () => (
                <Image
                  source={require("../assets/colorLogo.png")}
                  style={{
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == "ios" ? 40 : 50,
                  }}
                />
              ),

            // </View>
          }}
        />
        <Stack.Screen
          name="PendingOrdersList"
          component={PendingOrdersList}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "PENDING ORDERS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight:
              // <View style={{height:'100%',width:'20%',justifyContent:'center'}}>
              () => (
                <Image
                  source={require("../assets/colorLogo.png")}
                  style={{
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == "ios" ? 40 : 50,
                  }}
                />
              ),

            // </View>
          }}
        />
        <Stack.Screen
          name="OrderStatus"
          component={OrderStatus}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "ORDER STATUS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        {/* <Stack.Screen name="PurchasedPayment" component={PurchasedPayment} options={{
     headerShown: true,
     title:"PURCHASE PAYMENTS",
     headerTitleStyle:{
       color:"white",
       alignSelf:'center'
     },
     headerStyle:{
      backgroundColor:Colors.themeColor,
    },
    headerTintColor: '#ffffff',
    headerRight: ()=><Image source={require('../assets/colorLogo.png')} style={{width:Platform.OS=='ios'? 40:50,height:Platform.OS=='ios'? 40:50}} />
 
   }}/> */}

        <Stack.Screen
          name="PaymentTopTapNavigator"
          component={PaymentTopTapNavigator}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "Purchased Record",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="BankDetails"
          component={BankDetails}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "BANK DETAILS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="MyHeader"
          component={MyHeader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PurchasedOrdersList"
          component={PurchasedOrdersList}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "PURCHASED ORDERS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="DeliveryNote"
          component={DeliveryNote}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "DELIVERY NOTE",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerLeft: null,
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="PurchasedOrderStatus"
          component={PurchasedOrderStatus}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "ORDERS STATUS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Invoice"
          component={Invoice}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "INVOICE",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerLeft: null,
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethods}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "PAYMENT METHODS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            // headerLeft: null,
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "SUPPORT",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "PROFILE",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "FORGOT PASSWORD",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ChangePasswordByEmail"
          component={ChangePasswordByEmail}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "CHANGE PASSWORD",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ChangeForgotPassword"
          component={ChangeForgotPassword}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "CHANGE PASSWORD",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="EditBuisnessDetail"
          component={EditBuisnessDetail}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "EDIT DETAILS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="BuisnessDetail"
          component={BuisnessDetail}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "BUSINESS DETAILS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="NewBuisnessDetail"
          component={NewBuisnessDetail}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "ADD DETAILS",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="ForgotPasswordVerification"
          component={ForgotPasswordVerification}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "FORGOT PASSWORD",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ShowInvoice"
          component={ShowInvoice}
          options={{
            headerBackTitleVisible: false,

            headerShown: true,
            title: "INVOICE",
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: Colors.themeColor,
            },
            headerTintColor: "#ffffff",
            headerRight: () => (
              <Image
                source={require("../assets/colorLogo.png")}
                style={{
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                }}
              />
            ),
          }}
        />

        {/* <Stack.Screen name="BuisnessDetail" component={BuisnessDetail}  options={{headerShown: false}}/>
   <Stack.Screen name="NewBuisnessDetail" component={NewBuisnessDetail} 
   options={{headerShown: false}} />
   <Stack.Screen name="ShippmentAddresses" component={ShippmentAddresses} options={{headerShown: false}}/>
   <Stack.Screen name="NewShippmentAddress" component={NewShippmentAddress} options={{headerShown: false}}/>
   <Stack.Screen name="BankDetail" component={BankDetail} options={{headerShown: false}}/>
   <Stack.Screen name="NewBankDetail" component={NewBankDetail} options={{headerShown: false}}/> */}

        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //   </SafeAreaView>
    //   </>
  );
}
const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    // backgroundColor: 'blue'
  },
  bottomSafeArea: {
    flex: 1,
    // backgroundColor: 'red'
  },
});
export default MyStack;
