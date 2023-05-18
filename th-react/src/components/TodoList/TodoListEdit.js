import React, {useCallback, useState, useEffect} from "react";

function TodoListEdit({selectedTodo, onUpdate}){
  const [value, setValue] = useState('');
  
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  },[])

  const onSubmit = useCallback( (e)=> {
    onUpdate(selectedTodo.id, value);
    setValue('');//초기화
    e.preventDefault();
  },[onUpdate, value])

  // useEffect(2번째 인자에 해당하는 state가 변할 때만 실행될 코드, {해당 state})
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div className="popup">
      <div className="todoedit__insert">
        <div className="todoedit__head">
          <h2 className="todoedit__head-tit">수정하기</h2>
        </div>
        <div className="todoedit__cont">
          <input 
            className="todoedit__cont-input"
            onChange={onChange}
            value={value}
            placeholder="할 일을 입력하세요"
          />
          <button
            type="button"
            className="todoedit__cont-edit"
            onClick={onSubmit}  
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoListEdit;