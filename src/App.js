import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
//import uuidv4 from 'uuid/v4'

const LOCAL_STORAKE_KEY = 'todoApp.todos'

function App() {
  // first var is all the todos; second is the function we call to update the todos
  const [todos, setTodos] = useState( [] ) // [{ id: 1, name: 'Todo 1', complete: false }]
  const todoNameRef = useRef()
  
  useEffect( () => {
    const storedTodos = JSON.parse( localStorage.getItem( LOCAL_STORAKE_KEY ) )
    if( storedTodos ) 
      setTodos( storedTodos )
  }, [] )

  useEffect( () => {
    localStorage.setItem( LOCAL_STORAKE_KEY, JSON.stringify( todos ) )
  }, [todos] )

  function toggleTodo( id ) {
    const newTodos = [...todos]
    const todo = newTodos.find( todo => todo.id === id )
    todo.complete = !todo.complete
    setTodos( newTodos )
  }

  function handleAddTodo( e ) {
    const name = todoNameRef.current.value
    if( name === '' ) 
      return
    //console.log( name )
    setTodos(prevTodos => {
      return [...prevTodos, { id: Math.random() /*uuidv4()*/, name: name, complete: false }]
    })
    todoNameRef.current.value = null
  } 

  function handleKeyDown( e ) {
    if( e.key === 'Enter' ) {
      handleAddTodo( e )
    }
  }
 
  function handleClearTodos() {
    const newTodos = todos.filter( todo => !todo.complete )
    setTodos( newTodos )
  }

  return (
    <>
      <h1>Meka's Hello World Todo List React App</h1>
      <h6>From <a href="https://www.youtube.com/watch?v=hQAHSlTtcmY" target="_blank" rel="noppener noreferrer">This YouTube Video</a></h6>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input id="todoInput" ref={todoNameRef} type="text" onKeyPress={handleKeyDown}/>
      <button id="addTodoBtn" onClick={handleAddTodo}>Add Todo</button>
      <button id="clearTodosBtn" onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
