import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import cats from '@/store/cat/reducer'
import user from '@/store/user/reducer'

const combinedReducer = combineReducers({
  cats,user
})

const masterReducer = (state:any, action:any) => {  
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      cats: {
        cats: [...action.payload.cats.cats]
      },
      user: {
        user: [...action.payload.user.user]
      }
    }
    return nextState
  }
  else {
    return combinedReducer(state, action);
  }
}

const initStore = () => {
  return createStore(masterReducer, composeWithDevTools(
    applyMiddleware()
  ))
}

export const wrapper = createWrapper(initStore)