import React from "react";
import { useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const handleAddTodo = () => {
    if (todo.trim()) {
      setTodos(prevTodo => [...prevTodo, todo]);
      setTodo("");
    }
  }

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditTodo(todos[index])
  }

  const handleUpdateTodo = () => {
    if (editTodo.trim()) {
      const updatedTodos = todos.map((todoItem, index) => {
        return index === editingIndex ? editTodo : todoItem
      });
      setTodos(updatedTodos);
      setEditTodo("");
      setEditingIndex(null);
    }
  }

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i != index))
  }

  console.log(todos);
  console.log(isDone);

  return (
    <div>
      <input type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {
        todos.length > 0 ?
          todos.map((todoItem, index) =>
            <div key={index}>
              {isDone ? <s><p style={{ color: "red" }}>{todoItem}</p></s> : <p>{todoItem}</p>}
              <button onClick={() => handleEditTodo(index)}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              <input type="checkbox"
                checked={isDone}
                onChange={() => setIsDone(!isDone)}
              />
            </div>)
          : <div>No todo</div>
      }

      {
        editingIndex !== null && (<div>
          <input type="text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
          <button onClick={handleUpdateTodo}>Update</button>
        </div>)
      }
    </div>
  )
}

export default App;

