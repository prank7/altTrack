const API = "http://localhost:8000/api/v1";
const token = localStorage.getItem('token');
console.log(token);
 
export function registerAction(data) {
  return dispatch => {
    fetch(`${API}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data, 'thisis freaking data from registerAction');
			dispatch({
      type : "SIGNUP_SUCCESS",
      data
		})
	});
  }
}

export function loginAction(data) {
  return dispatch => {
    fetch(`${API}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			dispatch({
      type: "LOGIN_SUCCESS",
      data
		})
	});
	
  }
}

export function getOrgList() {
	// console.log("called in action");
	return dispatch => {
		fetch("http://localhost:8000/api/v1/users/orglist")
		.then(res => res.json())
		.then(data => dispatch({
			type: "GET_ORGANIZATIONS",
			payload: data
		}));
	}
}

export function savePostsAction(data) {
	console.log('this is postAction');
	return dispatch => {
		fetch(`${API}/users/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + JSON.parse(token),
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log('before dispatch', data, "data");
			dispatch({
				type: "SAVE_POSTS",
				payload: data
			})
		})
	}
}

export function getUserPosts() {
	console.log('this is getUserPosts');
	return dispatch => {
		fetch("http://localhost:8000/api/v1/users/posts")
		.then(res => res.json())
		.then(data => {
			console.log(data, 'thisdispatched in getUserPosts');
			dispatch({
				type: "GET_USER_POSTS",
				payload: data
			})
		})
	}
}
