import axios from "axios";
import styled from "styled-components";

import { API_URL } from "./TodoTemplate";
import { useState } from "react";
import { useEffect } from "react";
import { StyledTextInput } from "./User";

const TodoItemContainer = styled.div`
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
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 1rem;
      cursor: pointer;
    }
    input {
      cursor: pointer;
    }
    .margin {
      margin-left: 2rem;
      width: 10vw;
    }
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

export default function TodoItem({ todo, todos, setTodos, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState();

  function deleteTodo(id) {
    axios
      .delete(API_URL + "/" + id)
      .then((res) => setTodos(todos.filter((todos) => todos.id !== id)))
      .catch((err) => alert(`메모삭제를 실패했습니다. 사유:${err.message}`));
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

  function onChangeEditInput(event) {
    setTodoText(event.target.value);
  }

  function onEditInputSubmit(event) {
    event.preventDefault();
    if (todo.todoText !== todoText) {
      const todoTemp = {
        ...todo,
        todoText: todoText,
      };
      axios
        .put(API_URL + "/" + todo.id, todoTemp)
        .then((res) => {
          todos.splice(index, 1, res.data);
          setIsEditing(false);
        })
        .catch((err) => alert(`메모수정을 실패했습니다. 사유:${err.message}`));
    } else {
      alert("변경사항이 없습니다!");
      setIsEditing(false);
    }
  }

  useEffect(() => {
    setTodoText(todo.todoText);
  }, []);

  return (
    <>
      <TodoItemContainer key={todo.id}>
        <div className="top-row">
          <input
            onChange={() => onChangeCheckBox(todo)}
            type="checkbox"
            checked={todo.isCheck}
          />
          {isEditing ? (
            <form onSubmit={onEditInputSubmit}>
              <StyledTextInput
                className="margin"
                onChange={onChangeEditInput}
                value={todoText}
              />
            </form>
          ) : (
            <span onClick={() => setIsEditing(true)}>{todoText}</span>
          )}

          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </div>
        <div className="bottom-row">
          <span>{todo.createBy}</span>
        </div>
      </TodoItemContainer>
    </>
  );
}
