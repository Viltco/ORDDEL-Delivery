import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
//import Colors from "../ColorCodes/Colors";


const PreviewCart = (props) => {
  const MyIcon1 = <FontAwesome name="minus" size={15} color="#EE0202" solid />;
  const MyIcon2 = <FontAwesome name="plus" size={15} color="#EE0202" solid />;

 

  return (
    <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey',marginTop:20,alignItems:'space-around',width:'95%',marginTop:5,marginBottom:1,paddingRight:10}}>

        {/* <View style = {{width:'15%',alignItems:'center'}}>
        <Text style={{color:Colors.productGrey,textAlign:'center'}}>{props.id}</Text>
        </View> */}

        <View style = {{width:'35%'}}>
            <Text style={{marginLeft:15,color:Colors.productGrey,fontWeight:'bold'}}>{props.name}</Text>
        </View>
        {/* <View style = {{width:'18%',alignItems:'center'}}>
        
        <Text style={{color:Colors.productGrey,textAlign:'center'}}>{props.amount}</Text>
        </View> */}
        
        <View style = {{width:'20%'}}>
        
            {props.portrage_price==0?<Text style={{color:Colors.productGrey,textAlign:"right",}}>£ 0</Text>:<Text style={{color:Colors.productGrey,textAlign:"right",}}>£ {parseFloat(props.portrage_price).toFixed(2)}</Text>}
        </View>

        <View style = {{width:'15%', marginLeft:10}}>
        
        <Text style={{color:Colors.productGrey,textAlign:'right',marginLeft:5}}>{props.quantity}</Text>
    </View>


        <View style = {{width:'20%',marginLeft:25}}>
        
            {/* <Text style={{color:Colors.productGrey,textAlign:"right",}}>£ {props.portrage_price}</Text> */}
            {props.price==0?<Text style={{color:Colors.productGrey,textAlign:"right",}}>£ 0</Text>:<Text style={{color:Colors.productGrey,textAlign:"right",}}>£ {parseFloat(props.price).toFixed(2)}</Text>}
       
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    marginTop: 12,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#EE0202",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 15,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#EE0202",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 4,
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "orange",
    fontWeight: "bold",
  },

  rupees: {
    color: "black",
    //fontFamily: 'open-sans-bold',
    fontSize: 16,
  },

  deleteButton: {
    marginLeft: 10,
  },

  button: {
    marginLeft: 15,
  },
});

export default PreviewCart;
