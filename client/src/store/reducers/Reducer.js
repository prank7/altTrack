const initState = {
  userData : {},
  token: '',
};

console.log('this is', initState);

export default function rootReducer(state = initState,action) {
  switch(action.type){
    case "SIGNUP_SUCESS":{
      return state;
    }
    case "LOGIN_SUCESS":{
      console.log('this is', initState);
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
