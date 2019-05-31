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
	//  console.log(data);
  return dispatch => {
    fetch(`${API}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			localStorage.setItem('token',data.token);
			localStorage.setItem('id',data.userId);
			dispatch({
      type: "LOGIN_SUCESS",
      data
		})
	});
  }
}

export function orgList(formData){
	console.log(formData);
	const token = localStorage.getItem('token');
	const data = new FormData();
    data.append('file', formData.selectedFile);
    data.append('name', formData.orgName);
    data.append('location',formData.location);
		data.append('creator',formData.creator);
		// console.log(formData.selectedFile);
	return dispatch => {
		axios.post("http://localhost:8000/api/v1/user/org", data, { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
    }
    }).then(response => dispatch({
			type: "ORG_LIST",
			response
		}));
	}
}

export function isVerified(){
	// console.log('inside Action isVerified')
	return dispatch => {
		const token = localStorage.getItem('token');
		fetch(`${API}/user/verify`,{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': "bearer " + token
				}
	}).then( res => res.json())
	.then(data => {
		if(data.unVerified){
			localStorage.removeItem('token');
			localStorage.removeItem('id')
		}
		else{
			localStorage.setItem('id',data.userId);
			dispatch({
				type: "LOGIN_SUCESS",
				data
			})
		}
	})
}
}
