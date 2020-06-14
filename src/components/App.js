import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { GlobalContext, GlobalProvider } from '../context/GlobalContext';
import { SubjectListContext, SubjectListProvider } from "../context/SubjectListContext";
import { Login } from './Login';
import { Main } from './Main';
import { Landing } from './Landing';
import { CustomNavbar } from './Navbar'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { checkToken } from "../utils/authUtils";
import { Loading as LoadingComponent } from './Loading';
import { unsetToken } from '../utils/authUtils';

const App = () => {
	useEffect(() => {
		const token = async () => {
			let res = await checkToken()
			if(res.data.login === false) unsetToken()
			setLoading(false);
		}
		token();
	}, []);


	const [loading, setLoading] = useState(true);

	if (loading) return <LoadingComponent />
	return (
		<Router>
			<GlobalProvider>
				<SubjectListProvider>
					<CustomNavbar />
					<Container className="p-3">
						<Switch>
							<PublicRoute component={Landing} exact path='/' />
							<PublicRoute path="/login" component={Login} />
							<PrivateRoute path="/forms" component={Main} />
						</Switch>
					</Container>
				</SubjectListProvider>
			</GlobalProvider>
		</Router>
	)
};

export default App;
