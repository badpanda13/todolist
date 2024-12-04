import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addTodo, toggleTodo, deleteTodo } from './store/todoSlice';
import DeleteIcon from './assets/remove-icon.png';
import './App.css';

const App: React.FC = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
      <div className="App">
        <h1>To-Do List</h1>
        <div className="todo-input">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              <input type="checkbox"  onClick={() => dispatch(toggleTodo(todo.id))}
              className="todo-checkbox" checked={todo.completed}/>
              <span  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              <img src={DeleteIcon} alt="delete" className="delete-icon" 
              onClick={() => dispatch(deleteTodo(todo.id))}/>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default App;
