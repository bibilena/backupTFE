const initialState = 0;

const COUNT_PLUS = "COUNT_PLUS";
const COUNT_MOINS = "COUNT_MOINS";
const COUNT_0 = "COUNT_0";

export function initCount() {
  return {
    type: COUNT_0,
  };
}

export function countPlus() {
  return {
    type: COUNT_PLUS,
  };
}

export function countMoins() {
  return {
    type: COUNT_MOINS,
  };
}

const CountPanierReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COUNT_0:
      return (state = initialState);
    case COUNT_PLUS:
      return state + 1;
    case COUNT_MOINS:
      if (state > 0) {
        return state - 1;
      }
    default:
      return state;
  }
};
export default CountPanierReducer;
