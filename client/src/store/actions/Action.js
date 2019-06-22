const API = "http://localhost:8000/api/v1";
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId')
 
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

export function loginAction(data, check) {
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
			localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('creatorId', data.userId);
			localStorage.setItem('name', data.name);
			
			dispatch({
				type: "LOGIN_SUCCESS",
				data
			})
			check();
		});
	}
}

export function getOrgList() {
	// console.log("called in action getOrgList");
	return dispatch => {
		fetch("http://localhost:8000/api/v1/users/orglist")
		.then(res => res.json())
		.then(data =>	{
			// console.log(data, 'this is data coming in OrgList Fetch');
			dispatch({
				type: "GET_ORGANIZATIONS",
				payload: data
			})
		});
	}
}

export function savePostsAction(data) {
	return dispatch => {
		fetch(`${API}/users/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + token,
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.success, 'thisisdataDATA');
			dispatch({
				type: "SAVE_POSTS",
				payload: data
			})
		})
	}
}

export function getUserPosts() {
	return dispatch => {
		// console.log('this is before fetch user posts');
		fetch(`http://localhost:8000/api/v1/users/${userId}/posts`)
		.then(res => res.json())
		.then(data => {
			// console.log(data, 'thisdispatched in getUserPosts');
			dispatch({
				type: "GET_USER_POSTS",
				payload: data
			})
		})
	}
}

//get all Posts from an Organization
export function getOrgFeed(orgId) {
	return dispatch => {
		
		console.log(orgId, 'this is before fetch in OrgFeed');
		fetch(`http://localhost:8000/api/v1/users/org/${orgId}/posts`, {
      method: "GET",
      // body: JSON.stringify(''),
      headers: {
				token: token,
				userId: userId,
			}})
		.then(res => res.json())
		.then(data => {
			console.log(data, 'this is data before dispatch');
			dispatch({
				type: "GET_ORG_FEED",
				payload: data
			})
		})
	}
}