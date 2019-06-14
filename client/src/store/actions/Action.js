const API = "http://localhost:8000/api/v1";
 
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
      type : "SIGNUP_SUCESS",
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
		.then(data => dispatch({
      type: "LOGIN_SUCESS",
      data
		}));
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

// export function getOrgDetails(id) {
// 	console.log('called in getOrgDetails');
// 	return dispatch => {
// 		fetch("http://localhost:8000/users/org/orgdetails")
// 		.then(res => res.json())
// 		.then(data => dispatch({
// 			type: "GET_INDIVIDUAL_ORG_INFO",
// 			payload: data
// 		}))
// 	}
// }