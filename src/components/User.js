import axios from "axios";
import { API_URL_USERS } from "./TodoTemplate";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 1rem 2rem;
  form {
    display: inline;
    box-sizing: content-box;
  }
`;

export const StyledTextInput = styled.input`
  border-radius: 8px;
  border: 0px;
  min-height: 2rem;
  width: ${(props) => props.customWidth || null};
  margin-right: 1rem;
  background-color: #d3d3d33d;
`;

const StyledSubmitBtn = styled.button`
  border-radius: 8px;
  border: 0px;
  outline: none;
  min-height: 2rem;
`;
export const StyledSelect = styled.select`
  outline: none;
  padding: 0.5rem 0.5rem;
  border-radius: 10px;
  option {
    padding: 0.5rem 0.5rem;
    border-radius: 1rem;
  }
`;

export default function User({
  user,
  setUser,
  selectedUser,
  setSelectedUser,
  userArr,
  setUserArr,
  isDataLoading,
}) {
  const [isNewUser, setIsNewUser] = useState(false);

  function onUserInputChange(event) {
    setUser(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    const userTemp = { username: user };
    axios.post(API_URL_USERS, userTemp);
    setUserArr((prev) => [...prev, userTemp]);
    setSelectedUser(user);
    setUser("");
    setIsNewUser(false);
  }

  function onChangeSelect(event) {
    setSelectedUser(event.target.value);
  }

  useEffect(() => {
    if (isDataLoading.users && userArr.length > 0) {
      setSelectedUser(userArr[0].username);
    }
  }, [isDataLoading]);

  return (
    <>
      <UserContainer>
        {userArr.length > 0 && !isNewUser ? (
          <>
            <div>
              <StyledSelect value={selectedUser} onChange={onChangeSelect}>
                {userArr.map((user) => (
                  <option>{user.username}</option>
                ))}
              </StyledSelect>
              <span>님으로 작성중</span>
            </div>
            <button onClick={() => setIsNewUser((prev) => !prev)}>
              새 유저 등록
            </button>
          </>
        ) : (
          <>
            <div>
              <form onSubmit={onSubmit}>
                <StyledTextInput
                  value={user}
                  onChange={onUserInputChange}
                  placeholder="이름..."
                  maxLength={2}
                  customWidth={"5rem"}
                ></StyledTextInput>
                <StyledSubmitBtn type="submit">유저 등록</StyledSubmitBtn>
              </form>
            </div>
            {userArr.length > 0 ? (
              <button onClick={() => setIsNewUser(false)}>undo</button>
            ) : null}
          </>
        )}
      </UserContainer>
    </>
  );
}
