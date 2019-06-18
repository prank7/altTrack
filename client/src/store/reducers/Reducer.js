const initState = {
  userId : '',
  token: '',
  creatorId: '',
  orgList: []
};

export default function rootReducer(state = initState,action) {
  switch(action.type) {
    case "SIGNUP_SUCCESS": {
      return state;
    }
    case "LOGIN_SUCCESS": {
      console.log(state, 'this is state', action, 'login success action');
      localStorage.setItem('token', JSON.stringify(action.data.token))
      return {
        ...state,
        userId : action.data.userId,
        creatorId: action.data.userId,
        token: action.data.token
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
    case "SAVE_POSTS": {
      return {
        ...state,
        posts: action.payload,
      }
    }
    case "GET_USER_POSTS": {
      console.log(state, action,'request coming in Reducer GET USER POSTS');
      return {
        ...state,
        userPosts: action.payload,
      }
    }
  default:
    return state;
  }
}
