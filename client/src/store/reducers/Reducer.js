const initState = {
  userData : {},
  token: localStorage.getItem('token') || '',
  creatorId: localStorage.getItem('id') || '',
  orgList: [{
    name: 'no orgs',
    _id : 12345
  }]
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
    case "ORG_LIST": {
        console.log(action.response.data.foundOrgs);
      return {
        ...state,
        orgList : action.response.data.foundOrgs
      }
    }
  default:
    return state;
  }
}
