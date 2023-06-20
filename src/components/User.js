import axios from "axios";
import { API_URL_USERS } from "./TodoTemplate";

export default function User({
  user,
  setUser,
  selectedUser,
  setSelectedUser,
  userArr,
  setUserArr,
}) {
  function onUserInputChange(event) {
    setUser(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    const userTemp = { username: user };
    axios.post(API_URL_USERS, userTemp);
    setUserArr((prev) => [...prev, userTemp]);
    setUser("");
  }

  function onChangeSelect(event) {
    setSelectedUser(event.target.value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={user}
          onChange={onUserInputChange}
          placeholder="유저 등록하기"
        ></input>
      </form>
      <select onChange={onChangeSelect}>
        {userArr.length > 0 ? (
          userArr.map((user) => <option>{user.username}</option>)
        ) : (
          <option>등록된 유저가 없습니다.</option>
        )}
      </select>
    </>
  );
}
