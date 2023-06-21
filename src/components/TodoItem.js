import axios from "axios";
import styled from "styled-components";
import { API_URL } from "./TodoTemplate";

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

export default function TodoItem({ todo, todos, setTodos }) {
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

  return (
    <>
      <TodoItemContainer className="fadeup" key={todo.id}>
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
          <span>{todo.createBy}</span>
        </div>
      </TodoItemContainer>
    </>
  );
}
