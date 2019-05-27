const initState = {
  userData : {},
  token: ""
};


export default function rootReducer(state = initState,action){
  switch(action.type){
    case "SIGNUP_SUCESS":{
      return state;
    }
    case "LOGIN_SUCESS":{
      return {
        ...state,
        userData : action.data,
        token: action.data.token
      }
    }
  default:
    return state;
  }
}
