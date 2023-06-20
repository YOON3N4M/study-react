import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./TodoTemplate";

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
      <ul>
        {todos.length !== 0
          ? todos.map((todo) => (
              <div key={todo.id}>
                <input
                  onChange={() => onChangeCheckBox(todo)}
                  type="checkbox"
                  checked={todo.isCheck}
                />
                <span>{todo.todoText}</span>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))
          : null}
      </ul>
      <button onClick={ClearCheckedTodos}>체크된 항목 삭제</button>
      <button onClick={clearAllTodos}>전체 항목 삭제</button>
    </>
  );
}
