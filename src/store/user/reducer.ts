import { usersActionTypes } from "./action";

const catsInitialState = {
  user: [],
  // inforCat: any
};

export default function reducer(state = catsInitialState, action: any) {
  switch (action.type) {
    case usersActionTypes.ADD_USER: {
      return { ...state, user: action.user };
    }
    default:
      return state;
  }
}
