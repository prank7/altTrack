const initState = {
  userData : {},
  token: localStorage.getItem('token') || '',
  creatorId: localStorage.getItem('id') || '',
  orgList: []
};

export default function rootReducer(state = initState,action) {
  switch(action.type) {
    case "SIGNUP_SUCESS": {
      return state;
    }
    case "LOGIN_SUCESS": {
      return {
        ...state,
        userData : action.data,
        creatorId: localStorage.setItem('id',action.data.userId),
        token: localStorage.setItem('token',action.data.token)
      }
    }
    case "ORGANIZATIONS": {
      // console.log(state, action,'request coming in Reducer Organizations');
      return {
        ...state,
        orgList : action.payload.data.foundOrgs
      }
    }
    case "GET_ORGANIZATIONS": {
      // console.log(state, action,'request coming in Reducer Organizations');
      return {
        ...state,
        orgList : action.payload.orgsFound
      }
    }
    // case "GET_INDIVIDUAL_ORG_INFO": {
    //   console.log(state, action, "request coming in Reducer GET INDIVIDUAL ORG INFO");
    //   return {
    //     ...state,
    //     individualOrg: action.payload
    //   }
    // }
  default:
    return state;
  }
}
