import axios from "axios";
import styled from "styled-components";

import { useState } from "react";
import { useEffect } from "react";
import { ALL, API_URL_TODOS, TO_BUY, TO_DO } from "./TodoTemplate";
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

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  select {
    background-color: #ffffff28;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    width: 50%;
    min-height: 2rem;
    text-align: center;
    border: 0;
    font-size: 1rem;
    font-weight: bold;
    color: #fefefe;
    border-radius: 8px;
    cursor: pointer;
    option {
      background-color: #00000069;
    }
  }
`;

const TodoListContainer = styled.div`
  h2 {
    color: #f8f8f8;
  }
  h3 {
    color: #fefefea4;
    margin: 0;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

export default function TodoList({ todos, setTodos, userArr }) {
  const todoTypes = [TO_DO, TO_BUY];
  const [filterWithCreator, setFilterWithCreator] = useState(ALL);

  function clearAllTodos() {
    if (window.confirm("모든 항목을 삭제합니다. (유저를 구분하지 않습니다.)")) {
      //서버
      todos
        .forEach((todo) => axios.delete(API_URL_TODOS + "/" + todo.id))
        .then(() => setTodos([]))
        .catch((err) =>
          alert(`전체 삭제에 실패하였습니다. 사유:${err.message}`)
        );
      //로컬
    }
  }

  function clearCheckedTodo() {
    //window.confirm("완료된 항목을 모두 삭제하나요?");
    if (window.confirm("완료한 모든 항목을 삭제합니다.")) {
      todos.forEach((todo) =>
        todo.isCheck
          ? axios
              .delete(API_URL_TODOS + "/" + todo.id)
              .then(() => {
                setTodos((todos) =>
                  todos.filter((todo) => todo.isCheck !== true)
                );
              })
              .catch((err) =>
                alert(`전체 삭제에 실패하였습니다. 사유:${err.message}`)
              )
          : null
      );
    }
  }

  function onSelectChange(event) {
    setFilterWithCreator(event.target.value);
  }

  function RenderTodo() {
    if (filterWithCreator === ALL) {
      return (
        <>
          {todoTypes.map((type) => (
            <TodoListContainer>
              <h3>{type}</h3>
              {todos.length !== 0
                ? todos
                    .filter((todo) => todo.type === type)
                    .map((todo, index) => (
                      <TodoItem
                        setTodos={setTodos}
                        todos={todos}
                        todo={todo}
                        key={todo.id}
                        index={index}
                      />
                    ))
                : null}
            </TodoListContainer>
          ))}
        </>
      );
    } else {
      return (
        <>
          {todoTypes.map((type) => (
            <TodoListContainer>
              <h3>{type}</h3>
              {todos
                .filter((todo) => todo.type === type)
                .filter((todo) => todo.createBy === filterWithCreator)
                .length !== 0 ? (
                todos
                  .filter((todo) => todo.type === type)
                  .filter((todo) => todo.createBy === filterWithCreator)
                  .map((todo) => (
                    <TodoItem
                      setTodos={setTodos}
                      todos={todos}
                      todo={todo}
                      key={todo.id}
                    />
                  ))
              ) : (
                <h2>
                  {filterWithCreator}님의 {type}이 없습니다.
                </h2>
              )}
            </TodoListContainer>
          ))}
        </>
      );
    }
  }

  return (
    <>
      {todos.length !== 0 ? (
        <>
          <ClearBtnContainer>
            <StyledClearBtn onClick={clearCheckedTodo}>
              체크된 항목 삭제
            </StyledClearBtn>
            <StyledClearBtn color={"#DA4C1F"} onClick={clearAllTodos}>
              전체 항목 삭제
            </StyledClearBtn>
          </ClearBtnContainer>
        </>
      ) : null}

      <FilterRow>
        <select onChange={onSelectChange}>
          <option>{ALL}</option>
          {userArr.map((user) => (
            <option>{user.username}</option>
          ))}
        </select>
      </FilterRow>
      {todos.length !== 0 ? <RenderTodo /> : <h2>메모가 존재하지 않습니다.</h2>}
    </>
  );
}
