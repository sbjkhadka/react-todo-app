import React, {useState,useRef,useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import HistoryList from './HistoryList'

const LOCAL_STORAGE_KEY="12345"
const HISTORY_KEY="54321"
function App() {
  const [todos,setTodos]= useState([]);
  const todoNameRef=useRef();
  const todoDateRef=useRef();

  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos]);




  function handleAddTodo(e){
    const name=todoNameRef.current.value;
    const date=todoDateRef.current.value;
    if(name==='')return
    setTodos(prevTodos=>{
      return [...prevTodos,{id:uuidv4(),name:name,date:date,completed:false}]
    })
    todoNameRef.current.value=null
  }

  function handleClearTodos(){
    const pendingTodos=todos.filter(todo=>!todo.completed)
   

    const doneTodos=todos.filter(todo=>todo.completed)
    
    
      const storedHistory=JSON.parse(localStorage.getItem(HISTORY_KEY))
       if(storedHistory){
         doneTodos.map(donetodo=>{storedHistory.push(donetodo)})
         localStorage.setItem(HISTORY_KEY,JSON.stringify( storedHistory))
       }else{
         localStorage.setItem(HISTORY_KEY,JSON.stringify(doneTodos))
       }
    

    setTodos(pendingTodos)
  }

  function toggleTodo(id){
    const newTodos=[...todos]
    const clickedTodo=newTodos.find(todo=>todo.id===id)
    clickedTodo.completed=!clickedTodo.completed
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>

      
      <input type="text" ref={todoNameRef} placeholder="Description"/><br/>
      <input type="date" ref={todoDateRef}/>
      <button onClick={handleAddTodo}>Add Todo</button><br/>

      <button onClick={handleClearTodos}>Remove done</button><br/>
      <HistoryList history={localStorage.getItem(HISTORY_KEY)} />
    </>
  );
}

export default App;
