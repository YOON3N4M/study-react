import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline } from 'react-icons/md';
import cn from 'classnames'; //classnames 사용 명시
import './TodoListItem.css';

// react-icons 라이브러리 사용하여 아이콘을 컴포넌트 형태로 사용 <MdCheckBox />...
const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const {id, text, checked} = todo;
  
  return (
    <li className="TodoListItem">
    <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
      {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 
      <div className="text">{text}</div>
    </div>
    <div className="remove" onClick={() => onRemove(id)}>
      <MdRemoveCircleOutline />
    </div>
  </li>
  )
}

export default TodoListItem;
