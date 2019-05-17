import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import EditorView from './components/EditorView';
import styled from '@emotion/styled';

const StyledDiv = styled.div `
  height: 100vh;
  background: #61605C;
  color: white;
  // width: 99vw;
`;

class App extends Component {
  render() {
    return (
      <StyledDiv className="App">
        <EditorView />
      </StyledDiv>
    );
  }
}

export default App;
