import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.css';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
      setValue(e.target.value);
      //console.log({ value });
  }, []);

  const onSubmit = useCallback(
      e => {
          onInsert(value); 
          setValue(''); //value 초기화
          e.preventDefault(); //새로고침 막기
      },
      [onInsert, value],
  );

  return (
      <form className="TodoInsert" onSubmit={onSubmit}>
          <input placeholder="할 일을 추가하세요"
              value={value}
              onChange={onChange}
          />
          <button type="submit">
              <MdAdd />
          </button>
      </form>
  )
}
export default TodoInsert;