import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./TodoTemplate";

export default function TodoList({ todos, setTodos, setNextId }) {
  async function getTodosFromDB() {
    await axios.get(API_URL).then((res) => {
      setTodos(res.data);

      const lastIndex = res.data.length - 1;

      if (res.data.length > 0) {
        setNextId(res.data[lastIndex].id + 1);
      } else {
        setNextId(1);
      }
    });
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

  useEffect(() => {
    getTodosFromDB();
  }, []);

  return (
    <>
      <ul>
        {todos.length !== 0
          ? todos.map((todo) => (
              <div key={todo.id}>
                <input
                  onClick={() => onChangeCheckBox(todo)}
                  type="checkbox"
                  value={todo.isCheck}
                />
                <span>{todo.todoText}</span>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))
          : null}
      </ul>
    </>
  );
}
