const initState = {
  userData : {},
  isAuth: false,
  token: localStorage.getItem('token') || '',
  creatorId: localStorage.getItem('id') || '',
  orgList: [{
    name: 'no orgs',
    _id : 12345,
    imageUrl : {
      name: ''
    }
  }]
};

export default function rootReducer(state = initState,action) {
  switch(action.type){
    case "SIGNUP_SUCESS":{
      return state;
    }
    case "LOGIN_SUCESS":{
      // console.log('Login Reducer' ,action);
      return {
        ...state,
        isAuth:true,
        userData : action.data,
        creatorId: action.data.userId,
        token: action.data.token
      }
    }
    case "ORG_LIST": {
        // console.log(action.response.data.foundOrgs);
      return {
        ...state,
        orgList : action.response.data.foundOrgs
      }
    }
  default:
    return state;
  }
}
