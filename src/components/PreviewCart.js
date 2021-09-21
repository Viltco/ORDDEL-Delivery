import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
//import Colors from "../ColorCodes/Colors";

const PreviewCart = (props) => {
  const MyIcon1 = <FontAwesome name="minus" size={15} color="#EE0202" solid />;
  const MyIcon2 = <FontAwesome name="plus" size={15} color="#EE0202" solid />;

  return (
    <View
      style={{
        
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        marginTop: 20,
       // alignItems: "space-around",
        width: "90%",
        marginTop: 5,
        marginBottom: 1,
        //paddingRight: 10,
        //marginLeft: 20,
      }}
    >
      {/* <View style = {{width:'15%',alignItems:'center'}}>
        <Text style={{color:Colors.productGrey,textAlign:'center'}}>{props.id}</Text>
        </View> */}

      <View
        style={{
        
          width: "28%",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign:"center",
            // marginLeft: 15,
            color: Colors.productGrey,
            fontWeight: "bold",
          }}
        >
          {props.name}
        </Text>
      </View>
      <View
        style={{
      
          width: "26%",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign:"center",
            color: Colors.productGrey,
            fontWeight: "bold",
          }}
        >
          {props.quantity}
        </Text>
      </View>
      {/* <View style = {{width:'18%',alignItems:'center'}}>
        
        <Text style={{color:Colors.productGrey,textAlign:'center'}}>{props.amount}</Text>
        </View> */}

      {/* <View style={{ width: "20%" }}>
        {props.portrage_price == 0 ? (
          <Text style={{ color: Colors.productGrey, textAlign: "right" }}>
            £ 0
          </Text>
        ) : (
          <Text style={{ color: Colors.productGrey, textAlign: "right" }}>
            £ {parseFloat(props.portrage_price).toFixed(2)}
          </Text>
        )}
      </View> */}


      <View
        style={{
   
          width: "24%",
          // marginLeft: 25,
          justifyContent: "center",
          //alignItems: "flex-end",
        }}
      >
        {/* <Text style={{color:Colors.productGrey,textAlign:"right",}}>£ {props.portrage_price}</Text> */}
        {props.price == 0 ? (
          <Text style={{ color: Colors.productGrey, textAlign:"center" }}>
            £ 0
          </Text>
        ) : (
          <Text style={{ color: Colors.productGrey, textAlign: "center" }}>
            £ {parseFloat(props.price).toFixed(2)}
          </Text>
        )}
      </View>

      <View
        style={{
          
          width: "24%",
          // marginLeft: 25,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* <Text style={{color:Colors.productGrey,textAlign:"right",}}>£ {props.portrage_price}</Text> */}
        {props.portragePprice == 0 ? (
          <Text style={{ color: Colors.productGrey, textAlign:"center" }}>
            £ 0
          </Text>
        ) : (
          <Text style={{ color: Colors.productGrey, textAlign: "center" }}>
            £ {parseFloat(props.portragePprice).toFixed(2)}
          </Text>
        )}
      </View>


      {/* <View
        style={{
          borderWidth:1,
          borderColor:"black",
          width: "24%",
          // marginLeft: 10,
          justifyContent: "center",
          alignItems: "center",
          // borderWidth: 1,
          // borderColor: "black",
        }}
      >
        <Text
          style={{
            textAlign:"center",
            color: Colors.productGrey,
            textAlign: "right",
           // marginLeft: 5,
          }}
        >
          {props.portragePprice}
        </Text>
      </View> */}
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
