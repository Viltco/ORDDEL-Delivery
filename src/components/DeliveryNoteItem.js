import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
// import CurrencyFormatter from "react-native-currency-format";

const DeliveryNoteItem = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        marginTop: 10,
        alignItems: "space-around",
        width: "100%",
        marginBottom: 1,
        //paddingRight: 10,
        //borderWidth: 1
      }}
    >
      <View style={{ width: "35%" }}>
        <Text
          style={{
            marginLeft: 2,
            color: Colors.productGrey,
            fontWeight: "bold",
            textAlign: "left",
        //borderWidth: 1

          }}
        >
          {props.name}
        </Text>
      </View>


      <View style={{ width: "30%", alignItems: "center",
      //borderWidth: 1
       }}>
        <Text style={{ color: Colors.productGrey }}> {props.unit}</Text>
      </View>

      <View style={{ width: "35%" }}>
        <Text style={{ color: Colors.productGrey, textAlign: 'center' ,
        //borderWidth: 1
        }}>
          {props.quantity}
        </Text>
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
    marginLeft: 20,
  },

  button: {
    marginLeft: 15,
  },
});

export default DeliveryNoteItem;
