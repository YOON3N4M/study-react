import axios from "axios";
import { useState } from "react";

export default function InsertTodo() {
  const [todo, setTodo] = useState("");
  const [selectedType, setSelectedType] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/todos",
      data: {
        type: selectedType,
        todoText: todo,
        isCheck: false,
      },
    });
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
