import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  function getTodosFromDB() {
    axios({ method: "get", url: "http://localhost:3001/todos" }).then((res) =>
      setTodos(res.data)
    );
  }

  useEffect(() => {
    getTodosFromDB();
  }, []);

  return (
    <>
      <ul>
        {todos.length !== 0
          ? todos.map((todo) => <span key={todo.id}>{todo.todoText}</span>)
          : null}
      </ul>
    </>
  );
}
