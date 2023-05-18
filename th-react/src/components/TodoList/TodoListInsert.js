import React, {useState, useCallback} from "react";

function TodoListInsert( {onInsert} )  { // onInsert 받기

  const [value, setValue] = useState('');
  // const onChangeTest = (e) => {
  //   setValue(e.target.value)
  // }

  const onChange = useCallback(e => { //useCallback 함수 재사용 
    setValue(e.target.value)
    console.log(value)
  },[]) // 두번째 파라미터 : 기본 배열 값 []

  const onSubmit = useCallback( e => {
    onInsert(value);
    setValue(''); // 초기화
    e.preventDefault(); // 기본 이벤트 (새로고침)방지
    console.log(value) // 여기까지는 값이 남아있다.
  },[onInsert, value]) // 값(value)을 넣어 비교 후 변경이 있다면 재사용

  return (
    <div className="TodoInsert">
      <input 
        className="TodoInsert-input"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="TodoInsert-add"
        onClick={onSubmit}
      >
        Add
      </button>
    </div>
  )
}


export default TodoListInsert;


