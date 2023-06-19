// import logo from './logo.svg';

import { useState, useCallback, useEffect, useRef } from "react";
import TodoTemplate from "../src/components/TodoTemplate";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 1000px;
  display: flex;
  justify-content: center;
  padding: 10rem 0;
`;

const App = () => {
  return (
    <AppContainer>
      <TodoTemplate></TodoTemplate>
    </AppContainer>
  );
};

export default App;
