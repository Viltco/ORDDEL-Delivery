import { ADD_DeliveryNote_DATA,ALL_CLEAR,SET_TOTAL_QUANTITY,ADD} from '../actions/DeliveryNote';
import DeliveryNoteItem from '../../Models/DeliveryNoteItem';
 

const initialState = {
    data:{},
  items: {},
  totalQtty: 0,
  count:0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD:
        const product_id=action.ProductId;
        const quantity=action.Quantity;
      let NewCartItem;

      NewCartItem = new DeliveryNoteItem(product_id,quantity);
      console.log("yummy",NewCartItem);
      // state.totalQtty=TotalQuantity;
    // }
    return {
      ...state,
      data:state.data,
      items: { ...state.items, [product_id]: NewCartItem },
      totalQtty:state.totalQtty,
      count: state.count+1,
    };


        case SET_TOTAL_QUANTITY:
            const TotalQty=action.quantity;
            // state.totalQtty=TotalQty;
            state.data=TotalQty;



            // console.log("TotalQty:::",TotalQty)
            return {
                ...state,
                data:state.data,
                items: {},
                totalQtty:0,
                count:0,
                sumQuantity:[]
              };

        case ADD_DeliveryNote_DATA:

        
          
          const ProductId=action.ProductId;
          const Quantity=action.Quantity;
        //   state.manage=Quantity;

          var TotalQuantity=action.totalQuantity;
          var OldQty=action.oldQty;
          var cal=0;
          
        //   state.totalQtty=parseInt(state.totalQtty)-parseInt(OldQty);
           
                 OldQty=Quantity;  
                 
                //  console.log(state.data.length,"-----------------------Q DATA")
             for(var i = 0 ; i < state.data.length ; i++){

                //if(ProductId == state.data[i].product_id){
                    //state.data[i].quantity = Quantity
                   
                state.sumQuantity[i] = state.data[i].quantity;
                console.log(state.sumQuantity,"----------------------Sum")
            //}
             } 
             
// 
                 var sum = state.sumQuantity.reduce(function(a, b){
                    return parseInt(a) + parseInt(b);

                
                }, 0);
                // console.log("-------------SUM ===== " ,sum)
                // cal=OldQty-state.manage;
                // state.totalQtty=state.totalQtty+cal;
                
                // cal=OldQty-Quantity;
                // state.totalQtty=parseInt(state.totalQtty)-parseInt(OldQty);
                state.totalQtty=sum;
                
              
          
          //console.log("Supplier===",supplier)
          console.log("state.mange",state.manage)
          console.log("oldQty: ",OldQty)
         console.log("subtract",cal)
        console.log("newTotalQty",state.totalQtty)
          
    //   console.log("total",kuch)


      let updatedOrNewCartItem;

      // if (state.items[addedProduct.id]) {
        
      //   // alert("This Product is already in Added");
      // //   // already have the item in the cart
      // //   updatedOrNewCartItem = new ProductItem(
      // //     // state.items[addedProduct.id].id,
      // //     state.items[addedProduct.id].quantity + 1,
      // //     state.items[addedProduct.id].total_amount + prodPrice,
      // //     prodName,prodUnit,prodPrice
      // //   // alert("This Product is already in Added");
      // //   );
        
      // } else {
        updatedOrNewCartItem = new DeliveryNoteItem(ProductId,Quantity);
        console.log("yummy",updatedOrNewCartItem);
        // state.totalQtty=TotalQuantity;
      // }
      return {
        ...state,
        data:state.data,
        items: { ...state.items, [ProductId]: updatedOrNewCartItem },
        totalQtty:state.totalQtty,
        count: state.count+1,
      };

      case ALL_CLEAR:
        const empty=action.check;
        if(empty==1){
          state.items={};
          console.log("items",state.items)
        }
        return {
          ...state,
          data:{},
          items: {},
          totalQtty: 0,
          count: 0,
        };

      
    }
    return state;
};