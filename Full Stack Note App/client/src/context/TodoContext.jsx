import React, { useState, createContext, useContext, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';
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
    const [loading, setLoading] = useState(false);

    const getTodo = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/note", { method: "GET" });
            if (!response.ok) {
                const errorMessage = await response.json();
                toast.error(`Error: ${errorMessage.message || "Something went wrong!"}`);
                return;
            }
            const data = await response.json();
            setTodos(data);
        }
        catch (error) {
            console.error(error.message);
            toast.error("Failed to fetch notes!");
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo) => {
        try {
            if (!todo.title.trim() || !todo.content.trim()) {
                toast.warn("Please fill out both details.");
                return;
            }

            setLoading(true);
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
        catch (error) {
            console.error(error.message);
            toast.error(error.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    const editTodo = (todoId, index) => {
        setId(todoId);
        setNewTodo(todos[index])
    }

    const updateTodo = useCallback(async () => {
        // 1
        // const updatedTodos = [...todos];
        // updatedTodos[editIndex] = newTodo;

        // 2
        try {
            if (!newTodo.title.trim() || !newTodo.content.trim()) {
                toast.warn("Please fill out both details.");
                return;
            }

            setLoading(true);
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
            setNewTodo({ title: "", content: "" });
            setId(null);

        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, [id, newTodo, todos]);

    const deleteTodo = useCallback(async (todoId) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/note/deletenote/${todoId}`, { method: "DELETE" });
            if (!response.ok) {
                toast.error("Failed to delete a note.");
                return;
            }
            const updatedTodos = todos.filter((todo) => todo._id !== todoId);
            setTodos(updatedTodos);
            toast.info("Note deleted!");
        }
        catch (error) {
            console.error(error.message);
            toast.error(error.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, [todos]);

    useEffect(() => {
        const fetchData = async () => {
            await getTodo();
        };
        fetchData();
    }, []); 

    return (
        <TodoContext.Provider value={{ todos, todo, setTodo, newTodo, setNewTodo, addTodo, editTodo, updateTodo, deleteTodo, id, loading }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    return useContext(TodoContext);
}