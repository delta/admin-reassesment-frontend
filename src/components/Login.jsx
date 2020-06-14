import React from 'react';

const login = () => {
	let username = document.getElementById('username-input').value;
	let password = document.getElementById('password-input').value;
	fetch('/auth', {
		method: "POST",
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({
			username,
			password
		})
	})
	.then(res => res.json())
	.then(json => {
		console.log(json);
		if(json.success) {
			localStorage.setItem("tokens", json.user);
			window.location = "/forms"
		}
	})
	.catch(err => {
		console.log(err);
	})

};

export const Login = () => {
	return (
		<div
			style={{
				marginTop: "200px",
				marginLeft: "200px"
			}}
		>
			<h3>
				Login with webmail credentials
			</h3>
			<input type="text" id="username-input" placeholder="Roll No" style={{
				marginTop: "10px",
				width: "250px"
			}}/>
			<br/>
			<input type="password" id="password-input" placeholder="Password" style={{
				marginTop: "10px",
				width: "250px"
			}}/>
			<br/>
			<button id="submit-form" onClick={login} style={{
				marginTop: "10px",
				padding: "5px"
			}}>
				Login
			</button>
		</div>
	)
}
