import React from 'react';
import {View,Image} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import InProgressOrderList from './InProgressOrdersList';
//import Consolidate from './Consolidate';
//import Colors from '../../ColorCodes/Colors';
//import URL from '../../api/ApiURL';
// import DropdownAlert from 'react-native-dropdownalert';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import MyHeader from '../../components/MyHeader';
import PurchasedPayment from './PurchasedPayment';
import PaidPayments from './PaidPayments';
import Colors from '../ColorCodes/Colors';
import { Container,Card,CardItem,Header,Content,Left,Footer ,Body, Right, Button,Drawer, Title,Text , Item,Input } from 'native-base';

const Tab= createMaterialTopTabNavigator();
// const func=({navigation})=>{
//     return(
//         <MyHeader name="IN PROGRESS ORDERS" nav={navigation}/>

//     )
// }
function MyTabs({navigation}) {
    // func({navigation});
  return (
      <View style={{flex:1}}>
      {/* <DropdownAlert ref={ref => dropDownAlertRef = ref} updateStatusBar={false} tapToCloseEnabled={true} errorColor={Colors.themeColor}/> */}

   {/* <MyHeader name="IN PROGRESS ORDERS" nav={navigation}/> */}
    <Tab.Navigator
    
      initialRouteName="Unpaid"
      
      tabBarOptions={{
        activeTintColor: Colors.themeColor,
        inactiveTintColor:Colors.textGreyColor,
        indicatorStyle: {
            backgroundColor: Colors.themeColor,
          },
        labelStyle: { fontSize: 16,fontWeight:'bold' },
        style: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen
        name="PurchasedPayment"
        component={PurchasedPayment}
        options={{ tabBarLabel: 'UNPAID' }}
      />
      <Tab.Screen
        name="PaidPayments"
        component={PaidPayments}
        options={{ tabBarLabel: 'PAID' }}
      />
      
    </Tab.Navigator>
     </View>
  );
}

export default MyTabs;