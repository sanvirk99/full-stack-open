import { useState,useEffect } from 'react'

import './App.css';
import {Notification}  from './Notification';
import {List} from './List';
import {PersonForm} from './PersonForm';
import { Filter } from './Filter';

//import {getAll,create} from './services/persons'
import server from './services/persons'





const App = () => {

  const [persons, setPersons] = useState([])
  const [msg,setMsg] = useState(null);
  const [errorMsg,setErrorMsg]=useState(null);
 

  useEffect(()=>{
    server.getAll().then(data => {
      setPersons(data)
    })

  },[])

  useEffect(()=>{

    setTimeout(()=>{
      if(errorMsg!==null){
        setErrorMsg(null)
      }
      if(setMsg!==null){
        setMsg(null)
      }
    },3000)
  },[msg,errorMsg])
  
 
  //simple test
  const notify=()=>{
    console.log('called')
    //setMsg("sucess");
    setErrorMsg("error")
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} errorMsg={errorMsg}/>
      {/* <button  onClick={notify}>Test success</button> */}
      <Filter persons={persons} ></Filter>
     
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMsg={setMsg} setErrorMsg={setErrorMsg}/>
     
      <h3>Numbers</h3>
      <List persons={persons} setPersons={setPersons}/>
      
    
    </div>
  )

}

export default App
