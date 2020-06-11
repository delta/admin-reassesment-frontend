import React, { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import { Redo } from './forms/Redo';
import { GlobalContext, GlobalProvider } from '../context/GlobalContext';


const App = () => {
	return (
		<GlobalProvider>
			<Container className="p-3">
				<Redo/>
			</Container>
		</GlobalProvider>)
};

export default App;
