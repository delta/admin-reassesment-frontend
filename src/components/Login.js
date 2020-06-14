import React, { useRef, useState } from 'react';
import {Form, Button, Alert, Jumbotron, Spinner} from 'react-bootstrap'

export const Login = () => {
	const rollNoRef = useRef();
	const passwordRef = useRef();
	const [displayAlert, setDisplayAlert] = useState(false)
	const [loading, setLoading] = useState(false)

	const login = e => {
		e.preventDefault();
		let username = rollNoRef.current.value;
		let password = passwordRef.current.value;
		if (username === '' || password === '') {
			setDisplayAlert(true);
			setTimeout(() => setDisplayAlert(false), 2000);
			return;
		}
		setLoading(true);
		fetch('/auth/login', {
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
		.then(res => {
			setLoading(false);
			return res.json();
		})
		.then(json => {
			console.log(json);
			if (json.success) {
				localStorage.setItem("tokens", json.user);
				window.location = "/forms"
			}
		})
		.catch(err => {
			console.log(err);
		})	
	};

	return (
		<Jumbotron className='loginForm'>
			<Form onSubmit={login}>
				<Form.Group controlId="formBasicusername">
					<Form.Label>Roll No</Form.Label>
					<Form.Control type="username" placeholder="Enter roll number" ref={rollNoRef} />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" ref={passwordRef} />
				</Form.Group>
				<Form.Group>
					<Alert variant="danger" show={displayAlert}>
						Roll number or password cannot be blank
					</Alert>
				</Form.Group>
				<Button variant="primary" type="submit">
					{loading ? <Spinner animation="border" variant="light" /> : 'Login'}
				</Button>
			</Form>
		</Jumbotron>
	)
}
