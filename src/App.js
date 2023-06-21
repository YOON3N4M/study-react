// import logo from './logo.svg';

import styled from "styled-components";

import { useState, useCallback, useEffect, useRef } from "react";
import TodoTemplate from "../src/components/TodoTemplate";
import GlobalStyle from "./GlobalStyle";

const AppContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
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
