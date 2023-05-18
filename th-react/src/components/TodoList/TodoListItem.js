import React from "react";

// 체크 유무, 내용, 수정, 삭제
function TodoListItem({items, onToggle, onRemove, onInsertToggle, onChangeSelectedTodo }){
  const {id, text, checked} = items; // 구조 분해 할당 items.id가 아닌 id,text,checked 사용 가능
  return(
    <>
      <li 
        className="TodoListItem ">
        <button
          type="button"
          className={"checkbox "+ (checked ? "checked" : '')}
          onClick={() => onToggle(id)}
        >
          {checked ? <span className="checked-on">✅</span>: null}
          { text }
        </button>
        <button 
          type="button"
          className="edit"
          onClick={() => {
            onChangeSelectedTodo(items);
            onInsertToggle();
          }}
        >
          수정
        </button>
        <button
          type="button"
          className="remove"
          onClick={ () => onRemove(id)}
        >
          삭제
        </button>
      </li>
    </>
  )
}

export default TodoListItem;