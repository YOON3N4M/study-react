import styled from "styled-components";

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  width: 20vw;
  height: 20rem;
  border-radius: 10px;
  overflow: hidden;
  .todo-header {
    background-color: #4c598e;
    width: 100%;
    h1 {
      text-align: center;
      color: white;
      font-size: 1.5rem;
    }
  }
  .todo-insert {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: green;
    width: 100%;
  }
  .todo-contents {
    background-color: purple;
    height: 2rem;
  }
`;

/* 
interface TodoT {
type: string,
contents: string,
username: string,
checked: boolean,

}

*/

function TodoTemplate() {
  return (
    <>
      <TodoContainer>
        <div className="todo-header">
          <h1>일정관리</h1>
        </div>
        <div className="todo-insert">
          <input></input>
        </div>
        <div className="todo-contents"></div>
      </TodoContainer>
    </>
  );
}

export default TodoTemplate;
