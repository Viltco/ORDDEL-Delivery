import { SETCARD} from '../actions/payment';

 

const initialState = {
    last4:"",
    brand:"" 
   
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETCARD:
        state.brand=action.brand;
        state.last4=action.last4;

        console.log("Brand From redux:",state.brand)
        console.log("Last 4 From redux:",state.last4)
      


     
      // state.totalQtty=TotalQuantity;
    // }
    return state;
    }
    return state;
};


    