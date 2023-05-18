import React, {useState, useCallback, useRef} from 'react';

import TodoListHeader from './TodoListHeader';
import TodoListInsert from './TodoListInsert';
import TodoListInner from './TodoListInner';
import TodoListEdit from './TodoListEdit';

import './css/TodoListCss.scss';

function TodoListTemplate(){
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 기초 알아보기',
      checked: false,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 하기',
      checked: false,
    },
    {
      id: 3,
      text: '투두리스트 만들기',
      checked: false,
    },
  ]);
  const nextId = useRef(todos.length+1);
  const onInsert = useCallback((text) => { // insert 컴포넌트
    const todo = {
      id: nextId.current,
      text,
      checked:false
    };
    setTodos((todos) => todos.concat(todo)); //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextId.current++;
  },[]);
  const onToggle = useCallback((id) => { 
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, checked: !todo.checked} : todo,
        )
      )
  },[todos])
  const onRemove = useCallback((id)=>{ // item 컴포넌트 : remove 클릭
    setTodos(todos.filter((todo)=>todo.id !== id));
  },[todos])

  // setSelectedTodo 해당 항목의 todo 객체를 selectedTodo에 저장
  const [selectedTodo, setSelectedTodo] = useState(null); // null 기본값
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo); // items의 정보
  };

  const [insertToggle, setInsertToggle] = useState(false); //플래그 역할을 해줄 state, false 기본값
  const onInsertToggle = () => { //insertToggle의 값을 바꿔서 창을 껐다킬 수 있도록 합니다.
    console.log(selectedTodo) // 처음엔 null
    console.log(insertToggle) // false -> true -> false
    if (selectedTodo) {
      setSelectedTodo(null);
      console.log("닫기")
    }
    setInsertToggle((onOff) => !onOff);
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    // id 같을 경우 id,checked 유지 text 변경
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <div className="TodoTemplate">
      <TodoListHeader />
      <TodoListInsert
        onInsert={onInsert}
      />
      <TodoListInner 
        todos={todos}
        onToggle={onToggle}
        onRemove={onRemove}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      {insertToggle && (
        <TodoListEdit 
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}
export default TodoListTemplate;