import React, { useState, createContext, useContext, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);

    const [todo, setTodo] = useState(
        { title: "", content: "" }
    );

    const [newTodo, setNewTodo] = useState(
        { title: "", content: "" }
    );

    const [editIndex, setEditIndex] = useState(null);

    const addTodo = (todo, date) => {
        const addingTodo = { ...todo, date };
        if (todo.title.trim() && todo.content.trim()) {
            setTodos(prevTodos => {
                const updatedTodos = [...prevTodos, addingTodo];
                localStorage.setItem("todoitems", JSON.stringify(updatedTodos));
                return updatedTodos;
            });
        }
    }

    const editTodo = (index) => {
        setEditIndex(index);
        setNewTodo(todos[index])
    }

    const updateTodo = () => {
        // 1
        // const updatedTodos = [...todos];
        // updatedTodos[editIndex] = newTodo;

        // 2
        const updatedTodos = todos.map((todo, index) => {
            return index === editIndex ? { ...newTodo, date: new Date().toLocaleString() } : todo
        })
        setTodos(updatedTodos);
        localStorage.setItem("todoitems", JSON.stringify(updatedTodos));
        setEditIndex(null);
    }

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        localStorage.setItem("todoitems", JSON.stringify(updatedTodos));
    }

    useEffect(() => {
        const getSavedTodos = JSON.parse(localStorage.getItem("todoitems")) || [];
        setTodos(getSavedTodos);
        console.log(getSavedTodos);
    }, []);

    //Not working
    // useEffect(() => {
    //     localStorage.setItem("todoitems", JSON.stringify(todos));
    // }, [todos])

    return (
        <TodoContext.Provider value={{ todos, todo, setTodo, newTodo, setNewTodo, editIndex, addTodo, editTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )

}

export const useTodo = () => {
    return useContext(TodoContext);
}