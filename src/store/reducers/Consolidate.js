import { ADD_CONSOLIDATE_DATA,ALL_CLEAR, ALL_COUNTER, CLEAR_COUNTER } from '../actions/Consolidate';
import ConsolidatedItem from '../../Models/Consolidate';


const initialState = {
  items: {},
  totalAmount: 0,
  count:0,
  counter:0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSOLIDATE_DATA:

        
          const riderId=action.riderId;
          const productId=action.productId;
          const supplier=action.supplier;
          //console.log("Supplier===",supplier)
          const unit_purchase_price=action.unit_purchase_price;
          const profit_margin=action.profit_margin;
          const kuch=action.unit_sales_price;
          const Qty=action.Qtty;
          const checked=action.checked;
          const portrage_price = action.portagePrice
          const profit_margin_choice=checked
          const date = action.date;
          console.log(date,'date.........');
          var TotalPrice;
          var unit_sales_price;
        console.log("Qty:,",Qty)
        if(checked=="value"){
          // TotalPrice=(kuch+(kuch/100*profit_margin));
          unit_sales_price=((kuch+(profit_margin*Qty))/Qty + parseFloat(portrage_price)).toFixed(2);
          console.log(unit_sales_price,"=====")
        }
        else{
          TotalPrice=(kuch+(kuch/100*profit_margin));
          unit_sales_price=(TotalPrice/Qty +  parseFloat(portrage_price)).toFixed(2);
          console.log(unit_sales_price,"=====")
        }
        
          
      console.log("total",kuch)


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
        updatedOrNewCartItem = new ConsolidatedItem(riderId,supplier,unit_purchase_price,profit_margin,unit_sales_price,profit_margin_choice,portrage_price,date);
        console.log("yummy",updatedOrNewCartItem);
        //state.totalAmount="";
      // }
      return {
        ...state,
        items: { ...state.items, [productId]: updatedOrNewCartItem },
        totalAmount: state.totalAmount +0,
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
          items: {},
          totalAmount: 0,
          count: 0,
        };

        case ALL_COUNTER:

          const data =action.count
          return{
            ...state,
            counter: state.counter++,
          }

          case CLEAR_COUNTER:

          //const data =action.count
          return{
            ...state,
            counter:0,
          }

      
    }
    return state;
};
