import React from 'react';
import './TodoTemplate.css';
// import './TodoInsert.css';

const TodoTemplate = ({ children, todoLength, clearComplete, clearAll }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">겟츄윗댓 투두투두 <span className="app-count">({todoLength}개)</span></div>
            <div className="app-content">
                {children}
                <div className='btns'>
                    <button className="clear-btn" onClick={() => clearComplete()}>완료 일괄 삭제</button>
                    <button className="clear-btn clearAll-btn" onClick={() => clearAll()}>전체 삭제</button>
                </div>
            </div>
        </div>
    );
};

export default TodoTemplate;