export const ALL_COUNTER= 'ALL_COUNTER'
export const CLEAR_COUNTER= 'CLEAR_COUNTER'

export const AllCounter = (count) => {
    return { type: ALL_COUNTER, count:count };
  }; 

  export const ClearCounter = () => {
    return { type: CLEAR_COUNTER };
  }; 