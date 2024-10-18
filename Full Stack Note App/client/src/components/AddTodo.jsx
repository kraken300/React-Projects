import React from "react";
import { useTodo } from "../context/TodoContext";

function AddTodo() {

    const { todo, setTodo, addTodo } = useTodo();

    const handleAddTodo = async(e) => {
        e.preventDefault();
        await addTodo(todo);
        setTodo({
            title: "",
            content: ""
        })
    }

    return (
        <div>
            <form className="flex flex-col justify-center items-center gap-4 m-4 p-4 rounded-lg bg-gray-400">
                <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    placeholder="Enter title..."
                    className="p-1 w-[80vw]"
                />

                <textarea
                    type="text"
                    value={todo.content}
                    placeholder="Enter content ..."
                    onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                    className="p-1 w-[80vw]"
                />

                <div className="self-start">
                    <button
                        type="submit"
                        onClick={handleAddTodo}
                        className="rounded bg-green-500 px-2 py-3 hover:bg-green-600 active:bg-green-400 font-bold"
                    >Add Todo</button>
                </div>
            </form>
        </div>
    )
}

export default AddTodo;