import React from "react";

import TodoListItem from "./TodoListItem";
function TodoListInner({ todos, onToggle, onRemove, onInsertToggle, onChangeSelectedTodo }) {
  return (
    <>
      <ul 
        className="TodoList">
        {todos.map((todo) => (
          <TodoListItem 
            items={todo}
            key={todo.id} 
            onToggle={onToggle}
            onRemove={onRemove}
            onInsertToggle={onInsertToggle}
            onChangeSelectedTodo={onChangeSelectedTodo}
          />
        ))}
        
      </ul> 
    </>
  )
}

export default TodoListInner;

