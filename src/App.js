import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
//import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code fires when app loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  },[]);
 
  const addTodo = (event) => {
    event.preventDefault();//Stop Refresh
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput('');//clear input field after submitting
  }

  return (
    <div className="App">
      <h1>Hello!!!</h1>
      
      <form>
      {/* <input value={input} onChange={event => setInput(event.target.value)}/> */}
      <FormControl>
        <InputLabel>Write a ToDo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>
      <Button type='submit' disabled={!input} variant="contained" color="primary" onClick={addTodo}>Add ToDo
      </Button>
      {/* <button type='submit' onClick={addTodo}>Add ToDo</button> */}
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
