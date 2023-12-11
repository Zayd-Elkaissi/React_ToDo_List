import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from "react-icons/ri"
import { BiCheckCircle } from "react-icons/bi"
import { RiExchangeFundsFill } from 'react-icons/ri'
// import { TiEdit } from 'react-icons/ti';

export default function TodoItem(props) {
    const { todo, removeTodo,
         completeTodo, importantTodo
        } = props

    return (
        <div className={todo.completed ? "todo-row complete" : "todo-row"} style={todo.important ? { background: "orange" } : {}}>
            <h5>{todo.text}</h5>
            <div className="iconsContainer">
                <RiExchangeFundsFill style={{ width: 23, marginRight: 5 }} onClick={() => importantTodo(todo.id)}/>
                <RiCloseCircleLine style={{ marginRight: 5 }} onClick={() => removeTodo(todo.id)}/>
                <BiCheckCircle onClick={() => completeTodo(todo.id)}/>
            </div>
        </div>
    )
}
