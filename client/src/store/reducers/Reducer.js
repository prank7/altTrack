const initState = {
  userData : {},
  token: localStorage.getItem('token')
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
        token: localStorage.setItem('token',action.data.token)
      }
    }
  default:
    return state;
  }
}
