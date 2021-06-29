import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
import MyHeader from "../components/MyHeader";
import { Col } from "native-base";
import URL from "../api/ApiURL";
import * as ApiDataAction from "../store/actions/ApiData";
import Toast from "react-native-simple-toast";

import { useSelector, useDispatch } from "react-redux";

const ForgotPasswordVerification = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [password, setPassword] = useState("");

  const search_Email = () => {
    console.log("ph o", email);

    fetch(URL + "/get_email_phone/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: email,
        user_type: "delivery_person",
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        if (data["message"] == "user not found") {
          Toast.show(data["message"]);
        }
        console.log("signup", data["message"]);
        setNewEmail(data.data.email);
        setPassword(data.data.phone);
        // console.log("signup", response["message"]);

        if (response.status == 200) {
          dispatch(ApiDataAction.SetEmail(email));

          navigation.navigate("ForgotPassword", {
            email: email,
            phone: data.data.phone,
          });
        } else {
          // alert(data.message);
          Toast.show(response.status);

          //  alert(data.message);
        }
        //send_Verification_Code()
        // navigation.navigate("Ver

        //setResponse(json);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <View style={{ height: "30%" }}>
        <ImageBackground
          source={require("../assets/Splash.jpg")}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            FORGOT
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            PASSWORD
          </Text>
        </ImageBackground>
      </View>

      {/* <View
        style={{
          height: "10%",
          width: "85%",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.productGrey,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Select your which contact details you want
        </Text>
        <Text
          style={{
            color: Colors.productGrey,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          to use for verification code
        </Text>
      </View>

      <View
        style={{
          width: "80%",
          height: "15%",
          alignSelf: "center",
          borderRadius: 10,

          flexDirection: "row",
          backgroundColor: "#E2E2E2",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "15%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/sms.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            width: "70%",
            height: "100%",
            paddingLeft: 20,

            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors.textGreyColor }}>Via Sms</Text>
          <Text
            style={{
              color: Colors.productGrey,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            030*****56
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "80%",
          height: "15%",
          alignSelf: "center",
          borderRadius: 10,
          marginTop: 20,

          flexDirection: "row",
          backgroundColor: "#E2E2E2",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "15%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/forgotemail.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            width: "70%",
            height: "100%",
            paddingLeft: 20,

            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors.textGreyColor }}>Via Email</Text>
          <Text
            style={{
              color: Colors.productGrey,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            ****al@gmail.com
          </Text>
        </View>
      </View> */}
      <View style={styles.inputArea}>
        <TextInput
          style={{ width: 250 }}
          placeholder="Enter Your Email"
          autoCapitalize="none"
          required={true}
          placeholderTextColor={Colors.productGrey}
          minLength={6}
          errorMessage="Please enter Minimum 6 characters password"
          value={email}
          onChangeText={(value) => setEmail(value)}
          initialValue=""
        />
      </View>

      <TouchableOpacity onPress={search_Email} style={styles.button}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          NEXT
        </Text>
      </TouchableOpacity>
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
  button: {
    height: 40,
    width: 270,
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: "center",
  },
  inputArea: {
    marginVertical: 5,
    alignSelf: "center",

    height: 40,
    width: "85%",
    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
    marginTop: 80,
  },
});

export default ForgotPasswordVerification;
