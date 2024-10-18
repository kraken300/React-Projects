import React from 'react'
import { useTodo } from '../context/TodoContext'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Todo() {

    const { todos, deleteTodo, editTodo, newTodo, setNewTodo, updateTodo, id, loading } = useTodo();

    console.log(todos);
    return (
        <>
            {loading && <div className='text-white text-4xl'>Loading...</div>}
            {id !== null &&
                <div className='flex flex-col justify-center items-center gap-4'>
                    <input
                        type="text"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        placeholder="Enter title..."
                        className="border-2 border-black mr-2 p-1 w-[75vw]"
                    />

                    <textarea
                        type="text"
                        value={newTodo.content}
                        placeholder="Enter content ..."
                        onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
                        className="border-2 border-black mr-2 p-1 w-[75vw]"
                    />

                    <div className="self-start">
                        <button
                            onClick={updateTodo}
                            className="rounded bg-green-500 px-2 py-3 hover:bg-green-600 active:bg-green-400 font-bold mb-4"
                        >Update Todo</button>
                    </div>
                </div>
            }

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    todos.length > 0 ?
                        todos.map((todo, index) =>
                            <div key={todo._id} className={`border-2 border-gray-300 rounded-lg p-4 text-white bg-gray-800 min-w-[300px] sm:min-w-[300px] lg:min-w-[260px] ${id === todo._id ? "border-2 border-yellow-500" : "border-2 border-gray-300"}`}>
                                <p className='font-bold text-2xl'>{todo.title}</p>
                                <p>{todo.content}</p>
                                <p className='mb-1'>Last updated: {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "N/A"}</p>
                                <button onClick={() => editTodo(todo._id, index)}
                                    aria-label='Edit Todo'
                                    className='mx-2'
                                    disabled={loading}
                                >
                                    <FaEdit />
                                </button>
                                <button onClick={() => deleteTodo(todo._id)}
                                    aria-label='Delete Todo'
                                    className='mx-2'
                                    disabled={loading ? true : false}
                                >
                                    <MdDelete />
                                </button>
                            </div>)
                        :
                        <div className='col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center'>
                            <div className='text-2xl text-white font-bold'>No todos to display...</div>
                        </div>
                }
            </div>
        </>
    )
}

export default Todo
