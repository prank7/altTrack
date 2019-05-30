import axios from 'axios';

const API = "http://localhost:8000/api/v1";
 
 export function registerAction(data){
  return dispatch => {
    fetch(`${API}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => dispatch({
      type : "SIGNUP_SUCESS",
      data
    }))
  }
 }

 export function loginAction(data){
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

// export function createOrg(stateData){
// 		const data = new FormData();
// 		data.append('file', stateData.selectedFile);
// 		data.append('name', stateData.orgName);
		
// 		axios.post("http://localhost:8000/api/v1/users/org", data, { 
		
// 			headers: { 'Content-Type': 'multipart/form-data'}
		
// 		}).then( res => console.log(res.statusText))
// 		// .then(data => console.log(data, 'action.js line 49')
// 		// 	dispatch({
// 		// 	type: "CREATE_ORGANIZATION",
// 		// 	console.log(data)
// 		// })
// 		// )
// }