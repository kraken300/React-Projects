import React from 'react'
import { TodoProvider } from './context/TodoContext';
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  return (
    <TodoProvider>
      <div className='flex justify-start min-h-screen flex-col items-center bg-gray-700'>
        <AddTodo />
        <Todo />
      </div>
    </TodoProvider>
  )
}

export default App
