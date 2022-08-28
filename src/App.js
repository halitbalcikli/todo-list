import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3001";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [missingChar, setMissingChar] = useState("")



  useEffect(() => {
    fetchTodos();
  }, [])


  const fetchTodos = async () => {
    const { data } = await axios.get(BASE_URL + "/todos");

    setTodos(data);
  }

  const completeTodo = async (id) => {
    const { data } = await axios.get(BASE_URL + "/todo/complete/" + id);

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    }))
  }

  const deleteTodo = async (id) => {
    const { data } = await axios.delete(BASE_URL + '/todo/delete/' + id);

    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
  }

  const addTodo = async () => {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (newTodo.length >= 3) {
      const { data } = await axios.post(BASE_URL + "/todo/new", { text: newTodo }, {
        headers: headers
      });

      setTodos([...todos, data]);

      setPopupActive(false);
      setNewTodo("");
      setMissingChar("");
    } else {
      setMissingChar("Please enter at least 3 words.");
    }
  }

  return (
    <div className="layout">
      <h2>Welcome, Mehmet Halid BALÇIKLI</h2>
      <h5>Todo List</h5>
      <div className="todos">

        {todos.map(todo => (
          <div
            className={"todo" + (todo.complete ? " is-complete" : "")}
            key={todo._id}
          >
            <div className="checkbox" onClick={() => completeTodo(todo._id)}></div>

            <div className="text"> {todo.text} </div>

            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              <span className="material-symbols-outlined">
                delete
              </span>
            </div>
          </div>
        ))}

      </div>

      <div className='addPopup' onClick={() => setPopupActive(true)}> Add Todo</div>

      {popupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={() => setPopupActive(false)}>x</div>

          <div className='content'>
            <h3>Add Task</h3>
            <input
              type="text"
              className='add-todo-input'
              onChange={e => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className='missingChar'>{newTodo.length < 3 ? missingChar : ''}</div>

            <button className='button' onClick={addTodo}>Create Task</button>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
