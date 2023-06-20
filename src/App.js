// import logo from './logo.svg';

import { useState, useCallback, useEffect, useRef } from "react";
import TodoTemplate from "../src/components/TodoTemplate";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 1000px;
  display: flex;
  justify-content: center;
  padding: 10rem 0;
  background-color: #0584bb;
`;

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <TodoTemplate></TodoTemplate>
    </AppContainer>
  );
};

export default App;
