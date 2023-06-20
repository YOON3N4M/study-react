import { useEffect, useState } from "react";
import styled from "styled-components";
import InsertTodo from "./InsertTodo";
import TodoList from "./TodoList";
import User from "./User";
import axios from "axios";

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: gray;
  width: 20vw;

  border-radius: 10px;
  overflow: hidden;
  .todo-header {
    background-color: #f8f8f8;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 0.3rem;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
    h1 {
      text-align: center;
      color: #666666;
      font-size: 1.5rem;
    }
  }

  .todo-contents {
  }
`;

/* 
interface TodoT {
type: string,
todo: string,
username: string,
checked: boolean,

}

*/
export const API_URL = "http://localhost:3001/todos";
export const API_URL_USERS = "http://localhost:3001/users";

function TodoTemplate() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [user, setUser] = useState("");
  const [userArr, setUserArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  function getUserFromDB() {
    axios
      .get(API_URL_USERS)
      .then((res) => {
        setUserArr(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    getUserFromDB();
  }, []);

  return (
    <>
      <TodoContainer>
        <div className="todo-header">
          <h1>일정관리</h1>
          <User
            user={user}
            setUser={setUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            userArr={userArr}
            setUserArr={setUserArr}
          />
        </div>

        <InsertTodo
          todos={todos}
          setTodos={setTodos}
          nextId={nextId}
          setNextId={setNextId}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <div className="todo-contents">
          <TodoList todos={todos} setTodos={setTodos} setNextId={setNextId} />
        </div>
      </TodoContainer>
    </>
  );
}

export default TodoTemplate;
