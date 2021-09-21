import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
 
} from 'react-native';
// import Firebase from '@react-native-firebase/app'
// import loadData from './src/components/Login'
import Colors from './src/ColorCodes/Colors';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


// import PushNotification from "react-native-push-notification";
// import AsyncStorage from '@react-native-community/async-storage'
//import ShipmentBooking from './src/components/shipment/ShipmentBooking';
import profile_Data from './src/store/reducers/profile_Data';
import ApiData from './src/store/reducers/ApiData';
import MyStack from './src/navigation/MyStack';
import Consolidate from './src/store/reducers/Consolidate';
import DeliveryNote from './src/store/reducers/DeliveryNote';
import OrderBox from './src/store/reducers/OrderBox';
import Payment from './src/store/reducers/payment';
import CountCheck from './src/store/reducers/CountCheck';


const rootReducer = combineReducers({  
  // products: productsReducer,
  // cart: cartReducer,
  // orders: ordersReducer,
  // mealReducer:mealReducer,
  // changeInProfile:changeInProfile,
  // loading:loading,
  OrderBox,OrderBox,
  Consolidate:Consolidate,
  ApiData:ApiData,
  profile_Data:profile_Data,
  DeliveryNote:DeliveryNote,
  Payment:Payment,
  CountCheck: CountCheck

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {


  return (
    <>
    {/* <SafeAreaView style={styles.topSafeArea} />
    <SafeAreaView style={styles.bottomSafeArea}> */}
    <StatusBar translucent barStyle="light-content" backgroundColor={Colors.themeColor}  />
    <Provider store={store}>
 <MyStack/>
 </Provider>
 {/* </SafeAreaView> */}
 </>
  );
  
};
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

export default App;