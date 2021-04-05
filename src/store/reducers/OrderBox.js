import { ZERO,CLEAR,ADD } from '../actions/OrderBox';
// import ProductItem from '../../Models/Product';


const initialState = {
//   items: {},
//   totalAmount: 0,
  count:1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ZERO:
      return {
        ...state,
        count: state.count+1,
      };
      case CLEAR:
        return{
            ...state,
            count: 1,
        };
    case ADD:
        return{
            ...state,
            count: state.count!=1?state.count-1:state.count,
        };
    
      

  }

  return state;
};
