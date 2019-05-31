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
	 console.log(data);
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

export function orgList(formData){
	const token = localStorage.getItem('token');
	const data = new FormData();
    data.append('file', formData.selectedFile);
    data.append('name', formData.orgName);
    data.append('location',formData.location);
		data.append('creator',formData.creator);
		console.log(formData.selectedFile);
	return dispatch => {
		axios.post("http://localhost:8000/api/v1/users/org", data, { 
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