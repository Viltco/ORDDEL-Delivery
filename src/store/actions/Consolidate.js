export const ADD_CONSOLIDATE_DATA = 'ADD_CONSOLIDATE_DATA';
export const ALL_CLEAR = 'ALL_CLEAR';
// export const ALL_COUNTER= 'ALL_COUNTER'
// export const CLEAR_COUNTER= 'CLEAR_COUNTER'


export const AddConsolidateData = (riderId,productId,supplier,unit_purchase_price,profit_margin,Qty,unit_sales_price,checked,portagePrice) => {
    return { type: ADD_CONSOLIDATE_DATA,riderId:riderId,productId:productId,
      supplier:supplier,unit_purchase_price:unit_purchase_price,
      profit_margin:profit_margin,Qtty:Qty,unit_sales_price:unit_sales_price,
       checked:checked,portagePrice:portagePrice };
  }; 

  export const AllClear = (check) => {
    return { type: ALL_CLEAR,check:check };
  }; 

  

