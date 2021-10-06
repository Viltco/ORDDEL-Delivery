import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Form,
  Label,
  Button,
  Text,
  Spinner,
  Picker,
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Colors from "../ColorCodes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";

function BankDetails({ navigation }) {
  const RiderId = useSelector((state) => state.ApiData.RiderId);
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [bankName, setBankName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonCheck, setButtonCheck] = useState(false);

  var seeku = false;

  const [acc, setAcc] = useState(false);
  const [sort, setSort] = useState(false);

  const [accountNumberMsg, setAccountNumberMsg] = useState(false);
  const [sortCodeMsg, setSortCodeMsg] = useState(false);
  const [accountTitleMsg, setAccountTitleMsg] = useState(false);
  const [bankNameMsg, setBankNameMsg] = useState(false);

  const [accountNumberMsg1, setAccountNumberMsg1] = useState(false);
  const [sortCodeMsg1, setSortCodeMsg1] = useState(false);
  const [accountNumberMsg2, setAccountNumberMsg2] = useState(false);
  const [sortCodeMsg2, setSortCodeMsg2] = useState(false);

  const [bankNameCheck, setBankNameCheck] = useState(false);
  const [accountNumberCheck, setAccountNumberCheck] = useState(false);
  const [sortCodeCheck, setSortCodeCheck] = useState(false);
  const [accountTitleCheck, setAccountTitleCheck] = useState(false);
  const [bankDetail, setBankDetail] = useState("");
  var reg = /^\d+$/;
  var reg1 = /^[a-zA-Z ]*$/;
  useEffect(() => {
    setIsLoading(true);

    if (RiderId != "") {
      fetch(
        URL +
          "/delivery_person/list_bank_details/delivery_person/" +
          RiderId +
          "/"
      )
        // fetch(URL+'/client_app/clients_list/33/')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Bank Detail", responseJson);

          if (responseJson.bank_details != "") {
            setBankDetail(responseJson.bank_details);
            console.log("Bank Detail 2", bankDetail);
          }

          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const checkName = () => {
    if (bankName != "") {
      if (reg1.test(bankName) === false) {
        // setToastMessage("Email is Not Correct");
        alert("Invalid Bank Name");
        setBankName("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      }
    }
  };

  const checkNumber = () => {
    if (accountNumber != "") {
      if (reg.test(accountNumber) === false) {
        // setToastMessage("Email is Not Correct");
        alert("Invalid Account Number");
        setAccountNumber("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      }
      if (accountNumber.length < 8) {
        // setButtonCheck(false);
        // setAccountNumberMsg2(true);
        // setLoading(false);
        alert("Invalid Account Number");
        setAccountNumber("");
        // setToastMessage("Password limit should be Greater than 8 Digits");
      }
    }
  };

  const checkTitle = () => {
    if (accountTitle != "") {
      if (reg1.test(accountTitle) === false) {
        // setToastMessage("Email is Not Correct");
        alert("Invalid Account Title");
        setAccountTitle("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      }
    }
  };

  const checkSortCode = () => {
    if (sortCode != "") {
      if (reg.test(sortCode) === false) {
        // setToastMessage("Email is Not Correct");
        alert("Invalid Sort Code");
        setSortCode("");
        // setButtonCheck(false);
        // setAccountNumberMsg1(true);
        // setLoading(false);
        return false;
      }
      if (sortCode.length < 6) {
        // setButtonCheck(false);
        // setSortCodeMsg2(true);
        alert("Invalid Sort Code");
        setSortCode("");
        // setLoading(false);
        // setToastMessage("Password limit should be Greater than 8 Digits");
      }
    }
  };

  const update = () => {
    // if(bankName!=""){
    //   if (reg1.test(bankName) === false) {
    //     // setToastMessage("Email is Not Correct");
    //     alert("Invalid Bank Name");
    //     setBankName("");
    //     // setButtonCheck(false);
    //     // setAccountNumberMsg1(true);
    //     // setLoading(false);
    //     return false;
    //   }
    // }
    // if(accountTitle!=""){
    //   if (reg1.test(accountTitle) === false) {
    //     // setToastMessage("Email is Not Correct");
    //     alert("Invalid Account Title");
    //     setAccountTitle("");
    //     // setButtonCheck(false);
    //     // setAccountNumberMsg1(true);
    //     // setLoading(false);
    //     return false;
    //   }
    // }

    if (
      bankName == "" &&
      accountNumber == "" &&
      accountTitle == "" &&
      sortCode == ""
    ) {
      alert("Nothing to Change");
    } else {
      if (accountNumber != "" && reg.test(accountNumber) === false) {
        // setToastMessage("Email is Not Correct");
        setButtonCheck(false);
        alert("Invalid Account Number");
        setAcc(true);
        // setAccountNumberMsg1(true);
        setLoading(false);
        return false;
      } else {
        if (accountNumber != "" && accountNumber.length < 8) {
          setButtonCheck(false);
          alert("Invalid Account Number");
          setAcc(true);
          // setAccountNumberMsg2(true);
          setLoading(false);
          // setToastMessage("Password limit should be Greater than 8 Digits");
        } else {
          if (sortCode != "" && reg.test(sortCode) === false) {
            // setToastMessage("Email is Not Correct");
            setButtonCheck(false);
            alert("Invalid Sort Code");
            setSort(true);
            // setSortCodeMsg1(true);
            setLoading(false);
            return false;
          } else {
            if (sortCode != "" && sortCode.length < 6) {
              setButtonCheck(false);
              alert("Invalid Sort Code");
              setSort(true);
              // setSortCodeMsg2(true);
              setLoading(false);
              // setToastMessage("Password limit should be Greater than 8 Digits");
            } else {
              const res = fetch(
                URL +
                  "/delivery_person/update_bank_details/" +
                  bankDetail[0]["id"],
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    bank_name: bankName == "" ? bankDetail.bank_name : bankName,
                    account_title:
                      accountTitle == ""
                        ? bankDetail.account_title
                        : accountTitle,
                    credit_card_no:
                      accountNumber == ""
                        ? bankDetail.credit_card_no
                        : accountNumber,
                    sort_code: sortCode == "" ? bankDetail.sort_code : sortCode,
                    delivery_person: RiderId,
                  }),
                }
              )
                .then(async (response) => {
                  setLoading(true);

                  let data = await response.json();
                  console.log("Bank Detail", data);
                  console.log("Bank Detail", response.status);
                  if (response.status == 200) {
                    //navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
                    setLoading(false);

                    setBankName("");
                    setAccountNumber("");
                    setAccountTitle("");
                    setSortCode("");
                    setButtonCheck(false);
                    // dropDownAlertRef.alertWithType('success', '', 'Bussiness Details are added successfully.');
                    // Toast.show("Bussiness Details are added successfully", Toast.LONG);
                    alert("Bank Details are Updated successfully");
                    navigation.navigate("Dashboard");
                  } else {
                    setLoading(false);
                    setButtonCheck(false);
                    alert(data.message);
                    // Toast.show(data.message, Toast.LONG);

                    //setLoading(false);
                  }
                  //send_Verification_Code()
                  // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
                })
                .catch((error) => console.log("Something went wrong", error));
            }
          }
        }
        // setAccountNumberMsg1(false);
        // setLoading(false);
      }
    }
    // else if(sortCode!=""){
    //   if (reg.test(sortCode) === false) {
    //     // setToastMessage("Email is Not Correct");
    //     setButtonCheck(false);
    //     alert("Invalid Sort Code");
    //     setSort(true);
    //     // setSortCodeMsg1(true);
    //     setLoading(false);
    //     return false;
    //   }
    //   else{
    //     setSortCodeMsg1(false);
    //     setLoading(false);
    //   }
    //   if(sortCode.length < 6) {
    //     setButtonCheck(false);
    //     alert("Invalid Sort Code");
    //     setSort(true);
    //     // setSortCodeMsg2(true);
    //     setLoading(false);
    //     // setToastMessage("Password limit should be Greater than 8 Digits");

    //   }
    //   else{

    //     setSortCodeMsg2(false);
    //     setLoading(false);
    //   }
    // }
    // else{
    //   console.log("From If update")

    //   // if((bankName!=""||accountNumber!=""||accountTitle!=""||sortCode!="")&&(bankNameMsg==false&&accountTitleMsg==false&&accountNumberMsg==false&&accountNumberMsg1==false&&accountNumberMsg2==false&&sortCodeMsg==false&&sortCodeMsg1==false&&sortCodeMsg2==false)){

    //     console.log("From If update")
    //     // console.log("Bank Idddddd: ",bankDetail[0]["id"])

    // }

    // }
    // else{
    //   alert("Nothing to Change")
    // }
  };

  const onSubmit = () => {
    console.log("hello mr. jojo");
    setLoading(true);
    setButtonCheck(true);
    if (bankName == "" || bankName == " ") {
      setBankNameMsg(true);
      setLoading(false);
      seeku = true;
      setButtonCheck(false);
    } else {
      setBankNameMsg(false);
      setLoading(false);
      seeku = false;
    }
    if (accountTitle == "" || accountTitle == " ") {
      setAccountTitleMsg(true);
      setLoading(false);
      seeku = true;
      setButtonCheck(false);
    } else {
      setAccountTitleMsg(false);
      setLoading(false);
      seeku = false;
    }
    if (accountNumber == "" || accountNumber == " ") {
      setButtonCheck(false);
      setAccountNumberMsg(true);
      seeku = true;
      setLoading(false);
    } else {
      setAccountNumberMsg(false);
      setLoading(false);
      seeku = false;
    }
    if (sortCode == "" || sortCode == " ") {
      setButtonCheck(false);
      setSortCodeMsg(true);
      seeku = true;
      setLoading(false);
    } else {
      setSortCodeMsg(false);
      setLoading(false);
      seeku = false;
    }

    if (accountNumber != "") {
      if (reg.test(accountNumber) === false) {
        // setToastMessage("Email is Not Correct");
        setButtonCheck(false);
        setAccountNumberMsg1(true);
        seeku = true;
        setLoading(false);
        return false;
      } else {
        setAccountNumberMsg1(false);
        setLoading(false);
        seeku = false;
      }
    }

    if (sortCode != "") {
      if (reg.test(sortCode) === false) {
        // setToastMessage("Email is Not Correct");
        setButtonCheck(false);
        seeku = true;
        setSortCodeMsg1(true);
        setLoading(false);
        return false;
      } else {
        setSortCodeMsg1(false);
        setLoading(false);
        seeku = false;
      }
    }

    if (accountNumber.length < 8) {
      setButtonCheck(false);
      // alert("Invalid Account Number");
      // setAcc(true);
      console.log("from Account Length if ------------------------");
      seeku = true;
      setAccountNumberMsg2(true);
      console.log(
        "from Account Length if ------------------------",
        accountNumberMsg2
      );
      setLoading(false);
      // setToastMessage("Password limit should be Greater than 8 Digits");
    } else {
      setAccountNumberMsg2(false);
      seeku = false;
      setLoading(false);
      if (sortCode.length < 6) {
        setButtonCheck(false);
        setSortCodeMsg2(true);
        seeku = true;
        setLoading(false);
        // setToastMessage("Password limit should be Greater than 8 Digits");
      } else {
        setSortCodeMsg2(false);
        seeku = false;
        setLoading(false);
        if (
          bankName != "" &&
          accountNumber != "" &&
          accountTitle != "" &&
          sortCode != "" &&
          bankNameMsg == false &&
          accountTitleMsg == false &&
          accountNumberMsg == false &&
          accountNumberMsg1 == false &&
          accountNumberMsg2 == false &&
          sortCodeMsg == false &&
          sortCodeMsg1 == false &&
          sortCodeMsg2 == false &&
          seeku == false
        ) {
          const res = fetch(URL + "/delivery_person/create_bank_details/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bank_name: bankName,
              account_title: accountTitle,
              credit_card_no: accountNumber,
              sort_code: sortCode,
              delivery_person: RiderId,
            }),
          })
            .then(async (response) => {
              setLoading(true);

              let data = await response.json();
              console.log("Bank Detail", data);
              console.log("Bank Detail", response.status);
              if (response.status == 201) {
                //navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
                setLoading(false);

                setBankName("");
                setAccountNumber("");
                setAccountTitle("");
                setSortCode("");
                setButtonCheck(false);
                // dropDownAlertRef.alertWithType('success', '', 'Bussiness Details are added successfully.');
                // Toast.show("Bussiness Details are added successfully", Toast.LONG);
                alert("Bank Details are added successfully");
                navigation.navigate("Dashboard");
              } else {
                setLoading(false);
                setButtonCheck(false);
                alert(data.message);
                // Toast.show(data.message, Toast.LONG);

                //setLoading(false);
              }
              //send_Verification_Code()
              // navigation.navigate("VerificationCode" , {Email : email , Phone_No : phoneNumber})
            })
            .catch((error) => console.log("Something went wrong", error));
          setLoading(false);

          //console.log("res",res)
        }
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <Spinner color={Colors.themeColor} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ paddingTop: Platform.OS == "android" ? "30%" : "20%" }}
          >
            <TextInput
              style={styles.n_inputArea}
              // underlineColorAndroid="rgba(0, 0, 0, 0)"
              // autoFocus={true}
              placeholder={
                bankDetail == "" ? "Bank Name" : bankDetail[0]["bank_name"]
              }
              autoCapitalize="words"
              placeholderTextColor={Colors.productGrey}
              keyboardType="email-address"
              value={bankName}
              onChangeText={(value) => {
                //   setEmailMsg(false);
                // setBankNameCheck(true);
                setBankNameMsg(false);
                setBankName(value);
                //   setToastMessage("");
              }}
              onEndEditing={checkName}
              initialValue=""
            />
            {bankNameMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Please Enter Bank Name
                </Text>
              </Animatable.View>
            )}

            <TextInput
              style={styles.n_inputArea}
              // underlineColorAndroid="rgba(0, 0, 0, 0)"
              // autoFocus={true}
              placeholder={
                bankDetail == ""
                  ? "Account Title"
                  : bankDetail[0]["account_title"]
              }
              autoCapitalize="words"
              placeholderTextColor={Colors.productGrey}
              // keyboardType="email-address"
              value={accountTitle}
              onChangeText={(value) => {
                //   setEmailMsg(false);
                // setAccountNumberCheck(true);
                setAccountTitleMsg(false);
                setAccountTitle(value);
                //   setToastMessage("");
              }}
              onEndEditing={checkTitle}
              initialValue=""
            />
            {accountTitleMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Please Enter Account Title
                </Text>
              </Animatable.View>
            )}

            <TextInput
              style={styles.n_inputArea}
              // underlineColorAndroid="rgba(0, 0, 0, 0)"
              // autoFocus={true}
              placeholder={
                bankDetail == ""
                  ? "Account Number"
                  : bankDetail[0]["credit_card_no"]
              }
              // autoCapitalize="words"
              placeholderTextColor={Colors.productGrey}
              keyboardType="numeric"
              maxLength={8}
              value={accountNumber}
              onChangeText={(value) => {
                //   setEmailMsg(false);
                setAccountNumberMsg(false);
                setAccountNumberMsg1(false);
                setAccountNumberMsg2(false);
                setAccountNumber(value);
                //   setToastMessage("");
              }}
              onEndEditing={checkNumber}
              initialValue=""
            />
            {accountNumberMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Please Enter Account Number
                </Text>
              </Animatable.View>
            )}
            {accountNumberMsg1 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Invalid Account Number
                </Text>
              </Animatable.View>
            )}
            {accountNumberMsg2 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Invalid Account Number
                </Text>
              </Animatable.View>
            )}

            <TextInput
              style={styles.n_inputArea}
              // underlineColorAndroid="rgba(0, 0, 0, 0)"
              // autoFocus={true}
              placeholder={
                bankDetail == "" ? "Sort Code" : bankDetail[0]["sort_code"]
              }
              autoCapitalize="none"
              placeholderTextColor={Colors.productGrey}
              // keyboardType="email-address"
              keyboardType="numeric"
              maxLength={6}
              value={sortCode}
              onChangeText={(value) => {
                //   setEmailMsg(false);
                setSortCodeMsg(false);
                setSortCodeMsg1(false);
                setSortCodeMsg2(false);
                setSortCode(value);
                //   setToastMessage("");
              }}
              onEndEditing={checkSortCode}
              initialValue=""
            />
            {sortCodeMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Please Enter Sort Code
                </Text>
              </Animatable.View>
            )}
            {sortCodeMsg1 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Invalid Sort Code
                </Text>
              </Animatable.View>
            )}
            {sortCodeMsg2 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C", marginLeft: 40 }}>
                  Invalid Sort Code
                </Text>
              </Animatable.View>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.c_signupButton}
              activeOpacity={0.7}
              onPress={bankDetail == "" ? onSubmit : update}
              disabled={buttonCheck}
            >
              {loading ? (
                <Spinner color={"white"} />
              ) : bankDetail == "" ? (
                <Text style={styles.c_signupButtonText}>SUBMIT</Text>
              ) : (
                <Text style={styles.c_signupButtonText}>UPDATE</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  n_inputArea: {
    marginVertical: 5,
    // marginTop: 20,
    height: 50,
    width: "85%",
    alignSelf: "center",
    backgroundColor: "#F2F1F3",
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
    // marginHorizontal:30
  },
  c_signupButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    marginLeft: 5,
    // marginRight:10
  },

  c_signupText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },

  c_signupButton: {
    height: 40,
    width: 170,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    marginVertical: 30,
  },
});

export default BankDetails;
