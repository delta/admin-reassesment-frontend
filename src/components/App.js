import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { GlobalContext, GlobalProvider } from '../context/GlobalContext';
import { SubjectListContext, SubjectListProvider } from "../context/SubjectListContext";
import { Login } from './Login';
import { Main} from './Main';
import { Landing } from './Landing';
import { CustomNavbar } from './Navbar'


const App = () => {
	return (
		<Router>
			<GlobalProvider>
				<SubjectListProvider>
					<Container className="p-3">
						<CustomNavbar />
						<Switch>
							<Route exact path='/'>
								<Landing/>
							</Route>
							<Route path="/login">
								<Login/>
							</Route>
							<Route path="/forms">
								<Main />
							</Route>
						</Switch>
					</Container>
				</SubjectListProvider>
			</GlobalProvider>
		</Router>
	)
};

export default App;
