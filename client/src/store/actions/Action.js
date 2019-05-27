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