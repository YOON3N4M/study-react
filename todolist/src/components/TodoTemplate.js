import React from 'react';
import './TodoTemplate.css';
import './TodoInsert.css';

const TodoTemplate = ({ children, todoLength, clearComplete }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">겟츄윗댓 투두투두 <span className="app-count">({todoLength})</span></div>
            <div className="app-content">
                {children}
                <button className="clear-btn" onClick={() => clearComplete()}>완료 일괄 삭제</button>
            </div>
        </div>
    );
};

export default TodoTemplate;