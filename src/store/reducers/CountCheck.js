//import ConsolidatedItem from '../../Models/Consolidate';
//import { ADD_CONSOLIDATE_DATA,ALL_CLEAR, ALL_COUNTER, CLEAR_COUNTER } from '../actions/Consolidate';
import ConsolidatedItem from '../../Models/Consolidate';
import { ALL_COUNTER, CLEAR_COUNTER  } from '../actions/CountCheck';


const initialState = {
    counter:0
  };

  export default (state = initialState, action) => {
    switch (action.type) {
        

      case CLEAR_COUNTER:
          console.log('clear counter');
        //const empty=action.count;
          state.counter=0;
        return state;


        case ALL_COUNTER:
          //const data =action.count
          console.log('add counter reducer.....');

          state.counter=state.counter+1;
          //alert(state.counter);
          console.log(state.counter,'add reducer...');
        return state;


        //   case CLEAR_COUNTER:
        //   //const data =action.count
        //   return{
        //     ...state,
        //     counter:0,
        //   }
      
    }
    return state;
};

