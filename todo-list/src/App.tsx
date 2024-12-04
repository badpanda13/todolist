import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addTodo, toggleTodo, deleteTodo } from './store/todoSlice';
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
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
