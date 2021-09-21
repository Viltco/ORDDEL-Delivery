export const ADD_DeliveryNote_DATA = 'ADD_DeliveryNote_DATA';
export const ALL_CLEAR = 'ALL_CLEAR';
export const SET_TOTAL_QUANTITY = 'SET_TOTAL_QUANTITY';
export const ADD = 'ADD';
// export const ZERO = 'ZERO';

export const AddDeliveryData = (ProductId,Quantity,totalQty,oldQty) => {
    return { type: ADD_DeliveryNote_DATA, ProductId:ProductId,Quantity:Quantity,totalQuantity:totalQty,oldQty:oldQty};
  }; 

  export const AllClear = (check) => {
    return { type: ALL_CLEAR,check:check };
  }; 

  export const setTotalQuantity = (qty) => {
    return { type: SET_TOTAL_QUANTITY,quantity:qty };
  }; 

  export const add = (ProductId,Quantity) => {
    return { type: ADD,ProductId:ProductId,Quantity:Quantity };
  }; 
  // export const zero = () => {
  //   return { type: ZERO};
  // }; 

