import React, { useEffect, useRef } from "react";
import { useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    content: ""
  });
  const [editTodo, setEditTodo] = useState({
    content: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const editRef = useRef(null);

  const handleAddTodo = () => {
    if (todo.content.trim()) {
      setTodos(prevTodo => [...prevTodo, { ...todo, id: Date.now(), isDone: false }]);
      setTodo({ content: "" });
      setMessage("Todo added!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    else {
      setMessage("Please enter a todo!")
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditTodo(todos[index])
  }

  const handleUpdateTodo = () => {
    if (window.confirm("Are you sure you want to update this todo?")) {
      if (editTodo.content.trim()) {
        const updatedTodos = todos.map((todoItem, index) => {
          return index === editingIndex ? { ...todoItem, content: editTodo.content } : todoItem
        });
        setTodos(updatedTodos);
        setMessage("Todo updated!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setEditingIndex(null);
        setEditTodo({ content: "" })
      }
    } 
  }

  const handleDeleteTodo = (index) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter((_, i) => i != index));
      setMessage("Todo deleted!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }

  }

  const handleCheck = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isDone: !todo.isDone };
      }
      else {
        return todo
      }
    });
    setTodos(updatedTodos);
  }

  useEffect(() => {
    if (editingIndex !== null) {
      editRef.current.focus();
    }
    else {
      inputRef.current.focus();
    }
  }, [editingIndex])

  console.log(todos);

  return (
    <div>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <input
        ref={inputRef}
        type="text"
        value={todo.content}
        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {
        todos.length > 0 ?
          todos.map((todoItem, index) =>
            <div key={todoItem.id}>
              {todoItem.isDone ? <p style={{ color: "red", textDecoration: "line-through" }}>{todoItem.content}</p> : <p>{todoItem.content}</p>}
              <button onClick={() => handleEditTodo(index)} disabled={todoItem.isDone}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)} disabled={todoItem.isDone}>Delete</button>
              <input type="checkbox"
                checked={todoItem.isDone}
                onChange={() => handleCheck(index)}
              />
            </div>)
          : <div>No todo</div>
      }

      {
        editingIndex !== null && (<div>
          <input
            ref={editRef}
            type="text"
            value={editTodo.content}
            onChange={(e) => setEditTodo({ ...editTodo, content: e.target.value })}
          />
          <button onClick={handleUpdateTodo}>Update</button>
        </div>)
      }
    </div>
  )
}

export default App;

