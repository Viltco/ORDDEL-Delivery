export const SET_LOGIN_DATA= 'SET_LOGIN_DATA';
export const SET_VERIFICATION_DATA= 'SET_VERIFICATION_DATA';
export const SET_LIST_DATA= 'SET_LIST_DATA';
export const SET_ORDER_BOX_ID= 'SET_ORDER_BOX_ID';
export const ADD_TO_CART= 'ADD_TO_CART';
export const PENDINGDATA= 'PENDINGDATA';
export const CLEAR= 'CLEAR';
export const SETEMAIL = "SETEMAIL";
export const UPDATEPROFILE = "UPDATEPROFILE";
export const SETIMAGE = "SETIMAGE";
export const SET_CLIENT_IMAGE = "SET_CLIENT_IMAGE";
export const SetLoginData=(res)=>{
    return {type: SET_LOGIN_DATA, response:res};  
}
export const SetVerificationData=(res)=>{
    return {type: SET_VERIFICATION_DATA, response:res};  
}
export const SetListData=(res)=>{
    return {type: SET_LIST_DATA, response:res};  
}
export const SetOrderBoxId=(res)=>{
    return {type: SET_ORDER_BOX_ID, response:res};  
}
export const addToCart = product => {
    return { type: ADD_TO_CART, product: product };
};
export const PendingData = product => {
    return { type: PENDINGDATA, response: product };
};
export const Clear = product => {
    return { type: CLEAR, response: product };
};
export const SetEmail = (product) => {
    return { type: SETEMAIL, product: product };
  };
  export const UpdateProfile = (firstname, lastname, phoneNo,address) => {
    return {
      type: UPDATEPROFILE,
      firstname: firstname,
      lastname: lastname,
      phoneNo: phoneNo,
      address:address
    };
  };

  export const SetImage = (product) => {
    return { type: SETIMAGE, product: product };
  };
  export const SetClientImage = (product) => {
    return { type: SET_CLIENT_IMAGE, product: product };
  };