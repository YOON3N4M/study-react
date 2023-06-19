import axios from "axios";
import { useState } from "react";
import { API_URL } from "./TodoTemplate";

export default function InsertTodo({ todos, setTodos }) {
  const [todo, setTodo] = useState("");
  const [selectedType, setSelectedType] = useState("할 것");

  function onSubmit(event) {
    event.preventDefault();

    let todoTemp = {
      type: selectedType,
      todoText: todo,
      isCheck: false,
    };
    axios.post(API_URL, todoTemp);
    setTodos([...todos, todoTemp]);
    setTodo("");
  }

  function onTodoTextChange(event) {
    setTodo(event.target.value);
  }

  function onTodoTypeChange(event) {
    switch (event.target.value) {
      case "살 것":
        setSelectedType("살 것");
        break;
      case "할것":
        setSelectedType("할 것");
        break;
      default:
        break;
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <select onChange={onTodoTypeChange}>
          <option>할 것</option>
          <option>살 것</option>
        </select>
        <input onChange={onTodoTextChange} value={todo}></input>
      </form>
    </>
  );
}
