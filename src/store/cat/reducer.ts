import { catsActionTypes } from "./action";

const catsInitialState = {
  cats: [],
  // inforCat: any
};

export default function reducer(state = catsInitialState, action: any) {
  switch (action.type) {
    case catsActionTypes.ADD_CAT: {
      return { ...state, cats: action.cat };
    }
    default:
      return state;
  }
}
