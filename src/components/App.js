import React, { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import { Redo } from './forms/Redo';
import { GlobalContext, GlobalProvider } from '../context/GlobalContext';
import { SubjectListContext, SubjectListProvider } from "../context/SubjectListContext";



const App = () => {
	return (
		<GlobalProvider>
			<SubjectListProvider>
				<Container className="p-3">
					<Redo />
				</Container>
			</SubjectListProvider>
		</GlobalProvider>)
};

export default App;
