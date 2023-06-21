import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./TodoTemplate";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const ClearBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 1rem;

  // background-color: #f8f8f8;
  // box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
`;

const StyledClearBtn = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 0.5rem 2rem;
  background-color: ${(props) => props.color || null};
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  width: 45%;
`;

const TodoListContainer = styled.div`
  h3 {
    color: #fefefea4;
    margin: 0;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

export default function TodoList({ todos, setTodos, userArr }) {
  const todoTypes = ["할 일", "살 것"];
  const [filterWithCreator, setFilterWithCreator] = useState("모두");

  function clearAllTodos() {
    if (window.confirm("모든 항목을 삭제합니다. (유저를 구분하지 않습니다.)")) {
      //서버
      todos.forEach((todo) => axios.delete(API_URL + "/" + todo.id));
      //로컬
      setTodos([]);
    }
  }

  function clearCheckedTodo() {
    //window.confirm("완료된 항목을 모두 삭제하나요?");
    if (window.confirm("완료한 모든 항목을 삭제합니다.")) {
      todos.forEach((todo) =>
        todo.isCheck ? axios.delete(API_URL + "/" + todo.id) : null
      );

      setTodos((todos) => todos.filter((todo) => todo.isCheck !== true));
    }
  }

  function onSelectChange(event) {
    setFilterWithCreator(event.target.value);
  }

  function RenderTodo() {
    if (filterWithCreator === "모두") {
      return (
        <>
          <TodoListContainer className="fadeup">
            <h3>할 일</h3>
            {todos.length !== 0
              ? todos
                  .filter((todo) => todo.type === "할 것")
                  .map((todo) => (
                    <TodoItem
                      setTodos={setTodos}
                      todos={todos}
                      todo={todo}
                      className="fadeup"
                      key={todo.id}
                    />
                  ))
              : null}
          </TodoListContainer>
          <TodoListContainer className="fadeup">
            <h3>살 것</h3>
            {todos.length !== 0
              ? todos
                  .filter((todo) => todo.type === "살 것")
                  .map((todo) => (
                    <TodoItem
                      setTodos={setTodos}
                      todos={todos}
                      todo={todo}
                      className="fadeup"
                      key={todo.id}
                    />
                  ))
              : null}
          </TodoListContainer>
        </>
      );
    } else {
      return (
        <>
          <TodoListContainer className="fadeup">
            <h3>할 일</h3>
            {todos.length !== 0
              ? todos
                  .filter((todo) => todo.type === "할 것")
                  .filter((todo) => todo.createBy === filterWithCreator)
                  .map((todo) => (
                    <TodoItem
                      setTodos={setTodos}
                      todos={todos}
                      todo={todo}
                      className="fadeup"
                      key={todo.id}
                    />
                  ))
              : null}
          </TodoListContainer>
          <TodoListContainer className="fadeup">
            <h3>살 것</h3>
            {todos.length !== 0
              ? todos
                  .filter((todo) => todo.type === "살 것")
                  .filter((todo) => todo.createBy === filterWithCreator)
                  .map((todo) => (
                    <TodoItem
                      setTodos={setTodos}
                      todos={todos}
                      todo={todo}
                      className="fadeup"
                      key={todo.id}
                    />
                  ))
              : null}
          </TodoListContainer>
        </>
      );
    }
  }

  return (
    <>
      {todos.length !== 0 ? (
        <>
          <ClearBtnContainer className="fadeup">
            <StyledClearBtn onClick={clearCheckedTodo}>
              체크된 항목 삭제
            </StyledClearBtn>
            <StyledClearBtn color={"#DA4C1F"} onClick={clearAllTodos}>
              전체 항목 삭제
            </StyledClearBtn>
          </ClearBtnContainer>
        </>
      ) : null}

      <div>
        <select onChange={onSelectChange}>
          <option>모두</option>
          {userArr.map((user) => (
            <option>{user.username}</option>
          ))}
        </select>
      </div>
      {todos.length !== 0 ? <RenderTodo /> : null}
    </>
  );
}
