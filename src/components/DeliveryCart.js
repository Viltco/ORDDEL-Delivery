import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../ColorCodes/Colors';
import * as DeliveryNoteAction from '../store/actions/DeliveryNote';
import { useSelector, useDispatch } from 'react-redux';
import * as OrderBox from '../store/actions/OrderBox';


const DeliveryCart = props => {
    const dispatch = useDispatch();
    var [count,setCount]=useState(0);
    const counter=useSelector(state=>state.OrderBox.count);
        // dispatch(DeliveryNoteAction.add(props.id,props.quantity));
        let reg = /^\d+$/;
const [check,setCheck]=useState(false);
    // console.log(props.responseData ,"Cart -------------------")

const updateQuantity=()=>{
    
     

if(qtty!=""){
  // if(qtty!=props.quantity){
    // if(qtty>props.quantity){
    //     setQtty(props.quantity.toString())
    //     alert("Ordered Quantity is Less then this Quantity");
    // }
    // else
    if(qtty==props.quantity.toString())
    {
        // setQtty(props.quantity)
        alert("This is Already Entered");
    }
    if (reg.test(qtty) === false) {
      alert("Invalid Quantity");
      setQtty(props.quantity.toString());
        return false;
    }
    if(qtty==0){
      if(counter!=props.responseData.length){
          dispatch(OrderBox.zero());
          // setCount(count++);
          // console.log("count@@@@@@@@@@@@",count);
      }
      if(counter==props.responseData.length||counter==props.responseData.length){
                  if (reg.test(qtty) == false) {
                    for(var i = 0 ; i < props.responseData.length ; i++){
          
                      if(props.id == props.responseData[i].product_id){
                          //state.data[i].quantity = Quantity
                          
                      props.responseData[i].quantity = props.quantity.toString();
                         
                      // console.log(props.responseData,"----------------------Sum New")
                      }
                     
                  }
                  return false;
                   } 
                  // setQtty(value);
                  // if(qtty!=0){
                    dispatch(DeliveryNoteAction.AddDeliveryData(props.id,props.quantity.toString(),props.totalQty,props.quantity));
        
                  // }
                  setQtty(props.quantity.toString());
                  alert("All Quantities Should Not be 0");
                  
                  // }
                }
                else{
                  for(var i = 0 ; i < props.responseData.length ; i++){

                    if(props.id == props.responseData[i].product_id){
                        //state.data[i].quantity = Quantity
                       
                    props.responseData[i].quantity = qtty;
                     
                    // console.log(props.responseData,"----------------------Sum New")
                    }
                //}
                 } 
                // setQtty(value);
                dispatch(DeliveryNoteAction.AddDeliveryData(props.id,qtty,props.totalQty,props.quantity));
                }
    } 
    else{
      
        for(var i = 0 ; i < props.responseData.length ; i++){

            if(props.id == props.responseData[i].product_id){
                //state.data[i].quantity = Quantity
               
            props.responseData[i].quantity = qtty;
            // dispatch(OrderBox.add());
            // console.log(props.responseData,"----------------------Sum New")
            }
        //}
         } 
        // setQtty(value);
        dispatch(DeliveryNoteAction.AddDeliveryData(props.id,qtty,props.totalQty,props.quantity));
        // dispatch(OrderBox.add());
        // console.log("Counterrrrrrrrrrrrr",counter);
    }
// }
}

   

}
  const MyIcon1 = <FontAwesome name="minus" size={15} color="#EE0202" solid />;
  const MyIcon2 = <FontAwesome name="plus" size={15} color="#EE0202" solid />;
    const [qtty,setQtty]=useState("");
    console.log("Qtty",qtty);
    // const [quantity,setQuantity]=useState(props.quantity);
  //const mealId = useSelector(state => state.cart.items.id);
// setQuantity(props.quantity);
  //const availableMeals=useSelector(state=>state.mealReducer.selectedMeal);
  //const availableMeals=useSelector(state=>state.selectedMeal);
  //console.log(availableMeals,'  selected')
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  //const dispatch = useDispatch();
  //const mealId = props.navigation.getParam('mealId');
  //console.log(mealId,"  mealID  ")
// console.log(props.id,"============")
  return (


    <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey',alignItems:'space-around',width:'100%', marginLeft:10, paddingRight:10  }}>

        <View style = {{width:'40%'}}>
            <Text style={{marginLeft:2,color:Colors.productGrey,fontWeight:'bold',textAlign:'left'}}>{props.name}</Text>
        </View>
        <View style = {{width:'30%',alignItems:'center'}}>
        
        <Text style={{color:Colors.productGrey}}>{props.unit}</Text>
        </View>
        {/* <View style = {{width:'20%',alignItems:'center'}}>
        
            <Text style={{color:Colors.productGrey}}>{props.quantity}</Text>
        </View> */}
        <View style={{width:'20%', }}>

    <TextInput
    style={{alignSelf:'center',color:Colors.productGrey,paddingBottom:0,textAlign:"right"}}
    placeholder={props.quantity.toString()}
    autoCapitalize="none"
    keyboardType="numeric"
    maxLength={2}
    placeholderTextColor={Colors.productGrey}
    value={qtty}
    // required={true}
    onChangeText={(value) => {
        
      setQtty(value);
      setCheck(true);
       
    }}
    //onEndEditin={bobo}
    onEndEditing= {updateQuantity}
    // initialValue=""
/>
</View>

        
        {/* <View style = {{width:'25%',alignItems:'center'}}>
        
            <Text style={{color:Colors.productGrey}}>£ {props.price}</Text>
        </View> */}
        
    </View>


  );
};

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    marginTop:12,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: "#EE0202",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius:15
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  quantity:{
    color: "#EE0202",
    fontWeight:'bold',
    fontSize: 18,
    marginRight: 4,
  },
 
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color:'orange',
    fontWeight:'bold'
  },

  rupees: {

    color:'black',
    //fontFamily: 'open-sans-bold',
    fontSize: 16,
  },

  deleteButton: {
    marginLeft: 20
  },
  
  button: {
    marginLeft:15,
  },
});

export default DeliveryCart;









// import React,{useEffect,useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   TextInput
// } from 'react-native';
// import  Ionicons  from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Colors from '../ColorCodes/Colors';
// import * as DeliveryNoteAction from '../store/actions/DeliveryNote';
// import * as OrderBox from '../store/actions/OrderBox';
// import { useSelector, useDispatch } from 'react-redux';
// var count=0;


// const DeliveryCart = props => {
//   const counter=useSelector(state=>state.OrderBox.count);
//   console.log("Counterrrrrrrrrrrrrrrrrrrrr",counter)
//     const dispatch = useDispatch();
//         // dispatch(DeliveryNoteAction.add(props.id,props.quantity));
//   // const [counter,setCounter]=useState(0);
  
// const [check,setCheck]=useState(false);
//     // console.log(props.responseData ,"Cart -------------------")

// const updateQuantity=()=>{
//   let reg = /^\d+$/;
//   console.log("lengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",props.responseData.length);

// if(qtty!=""){
//   if (reg.test(qtty) === false) {
//     alert("Invalid Quantity");
//     setQtty(props.quantity.toString());
//     return false;
//   }
//   else{
//     if(qtty==props.quantity.toString())
//     {
//         // setQtty(props.quantity)
//         alert("This is Already Entered");
//     }
//     else{
//       if(qtty==0){
//         if(counter!=props.responseData.length){
//           dispatch(OrderBox.zero());
//         }
        
//         // count=count+1;
//         // console.log("count",count);
//       }
//       console.log("counterr......",counter);
//       console.log("Length......",props.responseData.length)
//       if(qtty==0){
//         if(counter==props.responseData.length||counter==props.responseData.length){
//           if (reg.test(qtty) == false) {
//             for(var i = 0 ; i < props.responseData.length ; i++){
  
//               if(props.id == props.responseData[i].product_id){
//                   //state.data[i].quantity = Quantity
                  
//               props.responseData[i].quantity = props.quantity.toString();
                 
//               // console.log(props.responseData,"----------------------Sum New")
//               }
             
//           }
//           return false;
//            } 
//           // setQtty(value);
//           // if(qtty!=0){
//             dispatch(DeliveryNoteAction.AddDeliveryData(props.id,qtty,props.totalQty,props.quantity));

//           // }
//           setQtty(props.quantity.toString());
//           alert("All Quantities Should Not be 0");
          
//           // }
//         }
//         else{
//           for(var i = 0 ; i < props.responseData.length ; i++){
  
//             if(props.id == props.responseData[i].product_id){
//                 //state.data[i].quantity = Quantity
                
//             props.responseData[i].quantity = props.quantity.toString();
               
//             // console.log(props.responseData,"----------------------Sum New")
//             }
//         //}
//          } 
//         // setQtty(value);
//         // if(qtty!=0){
//           dispatch(DeliveryNoteAction.AddDeliveryData(props.id,qtty,props.totalQty,props.quantity));

//         // }
//         }
//       }
//       else{
        

//         for(var i = 0 ; i < props.responseData.length ; i++){
  
//           if(props.id == props.responseData[i].product_id){
//               //state.data[i].quantity = Quantity
              
//           props.responseData[i].quantity = qtty;
//           dispatch(OrderBox.add());
             
//           // console.log(props.responseData,"----------------------Sum New")
//           }
//       //}
//        } 
//       // setQtty(value);
//       dispatch(DeliveryNoteAction.AddDeliveryData(props.id,qtty,props.totalQty,props.quantity));
//       }
      
        
//     }
//   }
//   // if(qtty!=props.quantity){
//     // if(qtty>props.quantity){
//     //     setQtty(props.quantity.toString())
//     //     alert("Ordered Quantity is Less then this Quantity");
//     // }
//     // else 
    
// // }
// }


   

// }
//   const MyIcon1 = <FontAwesome name="minus" size={15} color="#EE0202" solid />;
//   const MyIcon2 = <FontAwesome name="plus" size={15} color="#EE0202" solid />;
//     const [qtty,setQtty]=useState("");
//     console.log("Qtty",qtty);
//     // const [quantity,setQuantity]=useState(props.quantity);
//   //const mealId = useSelector(state => state.cart.items.id);
// // setQuantity(props.quantity);
//   //const availableMeals=useSelector(state=>state.mealReducer.selectedMeal);
//   //const availableMeals=useSelector(state=>state.selectedMeal);
//   //console.log(availableMeals,'  selected')
//   //const selectedMeal = MEALS.find(meal => meal.id === mealId);
//   //const dispatch = useDispatch();
//   //const mealId = props.navigation.getParam('mealId');
//   //console.log(mealId,"  mealID  ")
// // console.log(props.id,"============")
//   return (


//     <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey',alignItems:'space-around',width:'100%',paddingRight:10}}>

//         <View style = {{width:'40%',alignItems:'center'}}>
//             <Text style={{marginLeft:5,color:Colors.productGrey,fontWeight:'bold',textAlign:'center'}}>{props.name}</Text>
//         </View>
//         <View style = {{width:'30%',alignItems:'center'}}>
        
//         <Text style={{color:Colors.productGrey}}>{props.unit}</Text>
//         </View>
//         {/* <View style = {{width:'20%',alignItems:'center'}}>
        
//             <Text style={{color:Colors.productGrey}}>{props.quantity}</Text>
//         </View> */}
//         <View style={{width:'20%',alignSelf:"center"}}>

//     <TextInput
//     style={{alignSelf:"center",color:Colors.productGrey,paddingBottom:0}}
//     placeholder={props.quantity.toString()}
//     autoCapitalize="none"
//     keyboardType="numeric"
//     maxLength={2}
//     placeholderTextColor={Colors.productGrey}
//     value={qtty}
//     // required={true}
//     onChangeText={(value) => {
//       // if(value==0){
//       //   alert("Quantity Should Not Be 0");
//       // }
//       // else{
//         setQtty(value);
//         setCheck(true);
//       // }
      
       
//     }}
//     //onEndEditin={bobo}
//     onEndEditing= {updateQuantity}
//     // initialValue=""
// />
// </View>
 
        
//         {/* <View style = {{width:'25%',alignItems:'center'}}>
        
//             <Text style={{color:Colors.productGrey}}>£ {props.price}</Text>
//         </View> */}
        
//     </View>




//     // <View style={styles.cartItem}>
//     //   <View style={styles.itemData}>
//     //     <Text style={styles.quantity}>{props.quantity} </Text>
//     //     <Text style={styles.title}>{props.name}  </Text>
        
//     //   </View>
//     //   <View style={styles.itemData}>
//     //     <Text style={styles.rupees}> Rs.{props.amount.toFixed(2)}</Text>
        
//     //     {props.deletable && (
//     //       <TouchableOpacity
//     //         onPress={props.onRemove}
//     //         style={styles.deleteButton}
//     //       >
//     //         <Ionicons
//     //           name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
//     //           size={23}
//     //           color="#EE0202"
//     //         />
//     //         {/* {MyIcon1} */}
//     //       </TouchableOpacity>
//     //     )}

//     //     {/* {props.addable && (
//     //       <TouchableOpacity
//     //         onPress={props.onAddPress}
//     //         style={styles.deleteButton}
//     //       >
//     //         {MyIcon2}
//     //       </TouchableOpacity>
//     //     )} */}
        
//     //   </View>
//     // </View>
//   );
// };

// const styles = StyleSheet.create({
//   cartItem: {
//     flex: 1,
//     marginTop:12,
//     padding: 10,
//     backgroundColor: 'white',
//     borderWidth: .5,
//     borderColor: "#EE0202",
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     borderRadius:15
//   },
//   itemData: {
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },
//   quantity:{
//     color: "#EE0202",
//     fontWeight:'bold',
//     fontSize: 18,
//     marginRight: 4,
//   },
 
//   title: {
//     fontFamily: 'open-sans-bold',
//     fontSize: 16,
//     color:'orange',
//     fontWeight:'bold'
//   },

//   rupees: {

//     color:'black',
//     //fontFamily: 'open-sans-bold',
//     fontSize: 16,
//   },

//   deleteButton: {
//     marginLeft: 20
//   },
  
//   button: {
//     marginLeft:15,
//   },
// });

// export default DeliveryCart;

