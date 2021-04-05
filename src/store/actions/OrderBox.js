// export const ADD_TO_CART = 'ADD_TO_CART';
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// export const ALL_CLEAR = 'ALL_CLEAR';
export const CLEAR = 'CLEAR';
export const ZERO = 'ZERO';
export const ADD = 'ADD';

export const zero = () => {
  return { type: ZERO};
};

export const clear = () => {
    return { type: CLEAR};
  };
  export const add = () => {
    return { type: ADD};
  };

// export const removeFromCart = (mealId) => {
//   return { type: REMOVE_FROM_CART, pid: mealId };
// };

// export const allClear = clear => {
//   return { type: ALL_CLEAR, pid: clear };
// };

// export const deleteProduct = id => {
//   return { type: DELETE_PRODUCT, pid: id };
// };
// export const addToQtty = (id) => {
//   return { type: ADD_TO_QTTY, pid: id };
// };