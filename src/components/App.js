import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Redo} from './forms/Redo';


const App = () => (
  <Container className="p-3">
      <h1 className="header">Redo Form</h1>
    <Redo/>
  </Container>
);

export default App;
