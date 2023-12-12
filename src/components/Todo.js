import React, { useState, useEffect } from "react";
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const LOCAL_STORAGE_KEY = "react-todo-list-todos";
export default function Todo(props) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

    useEffect(() => {
      // fires when app component mounts to the DOM
      const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storageTodos) {
        setTodos(storageTodos);
      }
    }, []);
  
    useEffect(() => {
      // fires when todos array gets updated
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);
  
    const addTodo = (text) => {
      if (text.trim() !== ""  && text.trim() === text) { // Check if the text is not empty
        const isDuplicate = todos.some((todo) => todo.text.trim() === text.trim());
        if(!isDuplicate){
        let id = 1;
        if (todos.length > 0) {
          id = todos[0].id + 1;
        }
        let todo = {
          id: id,
          text: text,
          completed: false,
          important: false,
        };
        let newTodos = [todo, ...todos];
        setTodos(newTodos);
        setError('');
      } else {
        setError("This todo already exists");
      }
      } else {
        setError("Please enter a non-empty todo text");
      }}
  
    const removeTodo = (id) => {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    };
  
    const completeTodo = (id) => {
      let updatedTodos = todos.map((todo) => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
      setTodos(updatedTodos)
    }
  
    const importantTodo = (id) => {
      let updatedTodos = todos.map((todo) => {
        if(todo.id === id) {
           todo.important = !todo.important
        }
        return todo
      })
  
      setTodos(updatedTodos)
    }
    let sortedTodos = todos.slice().sort((a, b) => {
    if (a.important && !b.important) return -1;
  if (!a.important && b.important) return 1;

  // If 'important' status is the same, then sort alphabetically by 'text'
  return a.text.localeCompare(b.text);
});
    // let sortedTodos = todos.sort((a, b) => b.important - a.important)
    return (
      <div className="todo-app">
        <h1>Todo List</h1>
  
        <TodoForm addTodo={addTodo} />
        <p className="text-danger">

        {error}
        </p>
  
        <hr className="seperator"/>
        {sortedTodos.map((todo) => {
          return (
  
            <TodoItem removeTodo={removeTodo}
             completeTodo={completeTodo}
             importantTodo={importantTodo}
              todo={todo} key={todo.id}/>
          )
        })}
      </div>
  )
}
