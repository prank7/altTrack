const initState = {
  userData : {},
  token: localStorage.getItem('token') || '',
  creatorId: localStorage.getItem('id') || '',
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
        creatorId: localStorage.setItem('id',action.data.userId),
        token: localStorage.setItem('token',action.data.token)
      }
    }
    case "ORGANIZATIONS": {
      return {
        ...state,
        orgList : action.data
      }
    }
  default:
    return state;
  }
}
