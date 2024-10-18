import React from 'react'
import { TodoProvider } from './context/TodoContext';
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <TodoProvider>
      <div className='flex justify-start min-h-screen flex-col items-center bg-gray-700'>
        <AddTodo />
        <Todo />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce />
      </div>
    </TodoProvider>
  )
}

export default App
