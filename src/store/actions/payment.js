export const SETCARD = 'SETCARD';

export const SetCard = (brand,last4) => {
    return { type: SETCARD,brand:brand,last4:last4};
  }; 