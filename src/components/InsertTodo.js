import axios from "axios";
import styled from "styled-components";

import { useState } from "react";
import { API_URL, TO_BUY, TO_DO } from "./TodoTemplate";
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

  const [selectedType, setSelectedType] = useState(TO_DO);

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

      axios
        .post(API_URL, todoTemp)
        .then((res) => {
          setTodos([...todos, todoTemp]);
          setNextId((prev) => prev + 1);
          setTodo("");
        })
        .catch((err) => alert(`메모등록을 실패했습니다. 사유:${err.message}`));
    } else {
      alert("작성자를 선택해주세요!");
    }
  }

  function onTodoTextChange(event) {
    setTodo(event.target.value);
  }

  function onTodoTypeChange(event) {
    switch (event.target.value) {
      case TO_BUY:
        setSelectedType(TO_BUY);
        break;
      case TO_DO:
        setSelectedType(TO_DO);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <InsertTodoContainer className="fadein">
        <form onSubmit={onSubmit}>
          <StyledSelect onChange={onTodoTypeChange}>
            <option>{TO_DO}</option>
            <option>{TO_BUY}</option>
          </StyledSelect>
          <StyledTextInput
            onChange={onTodoTextChange}
            value={todo}
            placeholder="메모..."
            required
          ></StyledTextInput>
        </form>
      </InsertTodoContainer>
    </>
  );
}
