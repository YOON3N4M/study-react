import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./TodoTemplate";
import styled from "styled-components";

const ClearBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  // background-color: #f8f8f8;
  // box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
`;

const TodoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 2rem;
  border-radius: 10px;
  margin-bottom: 0.2rem;
  padding: 0.5rem 1rem;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  .top-row {
    width: 80%;

    display: flex;
    justify-content: space-between;
    padding: 0 10rem;
    align-items: center;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 0.2rem;
      font-weight: bold;
      color: #666666;
    }
  }
`;

const StyledClearBtn = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 0.5rem 2rem;
  background-color: ${(props) => props.color || null};
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
`;

export default function TodoList({ todos, setTodos, setNextId }) {
  function getTodosFromDB() {
    axios
      .get(API_URL)
      .then((res) => {
        setTodos(res.data);

        const lastIndex = res.data.length - 1;

        if (res.data.length > 0) {
          setNextId(res.data[lastIndex].id + 1);
        } else {
          setNextId(1);
        }
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todos) => todos.id !== id));
    axios.delete(API_URL + "/" + id);
  }

  function onChangeCheckBox(todoObj) {
    const checkReverse = !todoObj.isCheck;

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoObj.id ? { ...todo, isCheck: checkReverse } : todo
      )
    );

    axios.put(API_URL + "/" + todoObj.id, {
      ...todoObj,
      isCheck: checkReverse,
    });
  }

  function clearAllTodos() {
    if (window.confirm("모든 항목을 삭제합니다.")) {
      //서버
      todos.forEach((todo) => axios.delete(API_URL + "/" + todo.id));
      //로컬
      setTodos([]);
    }
  }

  function ClearCheckedTodos() {
    //window.confirm("완료된 항목을 모두 삭제하나요?");
    if (window.confirm("완료한 모든 항목을 삭제합니다.")) {
      todos.forEach((todo) =>
        todo.isCheck ? axios.delete(API_URL + "/" + todo.id) : null
      );

      setTodos((todos) => todos.filter((todo) => todo.isCheck !== true));
    }
  }

  useEffect(() => {
    getTodosFromDB();
  }, []);

  return (
    <>
      {todos.length !== 0 ? (
        <ClearBtnContainer>
          <StyledClearBtn onClick={ClearCheckedTodos}>
            체크된 항목 삭제
          </StyledClearBtn>
          <StyledClearBtn color={"#DA4C1F"} onClick={clearAllTodos}>
            전체 항목 삭제
          </StyledClearBtn>
        </ClearBtnContainer>
      ) : null}

      <ul>
        {todos.length !== 0
          ? todos.map((todo) => (
              <TodoItem key={todo.id}>
                <div className="top-row">
                  <input
                    onChange={() => onChangeCheckBox(todo)}
                    type="checkbox"
                    checked={todo.isCheck}
                  />
                  <span>{todo.todoText}</span>
                  <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </div>
                <div className="bottom-row">
                  <span>
                    {todo.type} | {todo.createBy}
                  </span>
                </div>
              </TodoItem>
            ))
          : null}
      </ul>
    </>
  );
}
