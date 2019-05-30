const initState = {
  userData : {},
  token: localStorage.getItem('token'),
  orgList: []
};

export default function rootReducer(state = initState,action) {
  switch(action.type){
    case "SIGNUP_SUCESS":{
      return state;
    }
    case "LOGIN_SUCESS":{
      return {
        ...state,
        userData : action.data,
        token: localStorage.setItem('token',action.data.token)
      }
    }
    // case "CREATE_ORGANIZATION": {
    //   return {
    //     ...state,
    //     orgList : action.data
    //   }
    // }
  default:
    return state;
  }
}
