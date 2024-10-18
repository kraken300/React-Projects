import React, { useState, createContext, useContext, useEffect } from "react";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);

    const [todo, setTodo] = useState(
        { title: "", content: "" }
    );

    const [newTodo, setNewTodo] = useState(
        { title: "", content: "" }
    );

    const [id, setId] = useState(null);

    const getTodo = async () => {
        try {
            const response = await fetch("/api/note", { method: "GET" });
            const data = await response.json();
            setTodos(data);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const addTodo = async (todo) => {
        try {
            if (todo.title.trim() && todo.content.trim()) {
                const response = await fetch("/api/note/addnote", {
                    method: "POST",
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                setTodos(prevTodos => [...prevTodos, data]);
                toast.success("Note added!");
            }
        }
        catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const editTodo = (todoId, index) => {
        setId(todoId);
        setNewTodo(todos[index])
    }

    const updateTodo = async () => {
        // 1
        // const updatedTodos = [...todos];
        // updatedTodos[editIndex] = newTodo;

        // 2
        try {
            if (newTodo.title.trim() && newTodo.content.trim()) {
                const response = await fetch(`/api/note/updatenote/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(newTodo),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                const updatedTodos = todos.map((todo) => {
                    return todo._id === id ? data : todo
                })
                setTodos(updatedTodos);
                toast.success("Note updated!");
                setId(null);
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`/api/note/deletenote/${todoId}`, { method: "DELETE" });
            // const data = await response.json();
            console.log(response);
            const updatedTodos = todos.filter((todo) => todo._id !== todoId);
            setTodos(updatedTodos);
            toast.info("Note deleted!");
        }
        catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, todo, setTodo, newTodo, setNewTodo, addTodo, editTodo, updateTodo, deleteTodo, id }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    return useContext(TodoContext);
}