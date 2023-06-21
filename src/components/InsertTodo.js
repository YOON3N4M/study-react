import axios from "axios";
import { useState } from "react";
import { API_URL } from "./TodoTemplate";
import styled from "styled-components";
import { StyledSelect, StyledTextInput } from "./User";

const InsertTodoContainer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  select {
    margin-right: 2rem;
  }
`;

export default function InsertTodo({
  todos,
  setTodos,
  nextId,
  setNextId,
  selectedUser,
}) {
  const [todo, setTodo] = useState("");

  const [selectedType, setSelectedType] = useState("할 것");

  function onSubmit(event) {
    event.preventDefault();

    if (selectedUser !== "") {
      const todoTemp = {
        createBy: selectedUser,
        type: selectedType,
        todoText: todo,
        isCheck: false,
        id: nextId,
      };

      axios.post(API_URL, todoTemp);
      setTodos([...todos, todoTemp]);
      setNextId((prev) => prev + 1);
      setTodo("");
    } else {
      alert("작성자를 선택해주세요!");
    }
  }

  function onTodoTextChange(event) {
    setTodo(event.target.value);
  }

  function onTodoTypeChange(event) {
    switch (event.target.value) {
      case "살 것":
        setSelectedType("살 것");
        break;
      case "할 것":
        setSelectedType("할 것");
        break;
      default:
        break;
    }
  }

  return (
    <>
      <InsertTodoContainer>
        <form onSubmit={onSubmit}>
          <StyledSelect onChange={onTodoTypeChange}>
            <option>할 것</option>
            <option>살 것</option>
          </StyledSelect>
          <StyledTextInput
            onChange={onTodoTextChange}
            value={todo}
            placeholder="할일..."
            required
          ></StyledTextInput>
        </form>
      </InsertTodoContainer>
    </>
  );
}
