import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./TodoTemplate";

export default function TodoList({ todos, setTodos }) {
  function getTodosFromDB() {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }

  function deleteTodo(id) {
    console.log(id);
    setTodos(todos.filter((todos) => todos.id !== id));
    axios.delete(API_URL + "/" + id);
  }

  useEffect(() => {
    getTodosFromDB();
  }, []);

  return (
    <>
      <ul>
        {todos.length !== 0
          ? todos.map((todo) => (
              <div key={todo.id}>
                <input type="checkbox" />
                <span>{todo.todoText}</span>
                <button onClick={() => console.log(todo)}>삭제</button>
              </div>
            ))
          : null}
      </ul>
    </>
  );
}
