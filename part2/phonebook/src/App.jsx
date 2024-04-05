import { useState,useEffect } from 'react'
import axios from 'axios'
//import {getAll,create} from './services/persons'
import server from './services/persons'

console.log(server);

const Filter = (props) => {
  const persons = props.persons;
  const [filter,setFilter] = useState([]);
  const [find,setFind]=useState('');

  const handelChange = (event) => {
    console.log(event.target.value);
    setFind(event.target.value)
    if(event.target.value===''){
      setFilter([]);
      return;
    }
    const match=persons.filter(person => person.name.toLowerCase().startsWith(event.target.value))
    console.log(match)
    setFilter(match)
  }

  return (
    <div>
      
      <form>
        <div>
          filter shown with: <input onChange={handelChange} value={find}/>
        </div>
      </form>
      <div>
        {filter.map(person => 
          <p key={person.name}>{person.name} {person.number}</p>  
        )}
      </div>
    </div>
    
  )
}
const PersonForm = (props) => {
  const persons = props.persons;
  const setPersons=props.setPersons;
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const handelSubmit = (event) => {
    event.preventDefault();
    const validate=persons.filter(person => person.name===newName );
    console.log(validate)
    if(validate.length!==0){
      const person=validate[0]
      //check if number is different 
      console.log(person.number);
      if(confirm(`${person.name} is already added to phonebook,replace old number with new one ?`)){
        const updatePerson={...person, number :newNumber}
        server.update(updatePerson).then((data)=>{
          console.log(data)
          const updatePersons=persons.map((p)=>{
            if (p.id === updatePerson.id) {
              return updatePerson; // Replace the current object with the updatePerson object
            } else {
              return p; // Keep the current object unchanged
            }
          })
          setPersons(updatePersons)
        })
      }
      return
      
    }
    const person={
      name : newName,
      number: newNumber,
      //id : persons.length+1,
    }
    console.log(person)
    //setPersons(persons.concat(person))

    server.create(person).then(data => {
      setPersons(persons.concat(data));
    })

  }

  const handelChange = (event) => {

    setNewName(event.target.value);
  }

  const handelNumChange = (event) =>{
    setNumber(event.target.value);
  }
  return ( 
  <form onSubmit={handelSubmit}>
    <div>
      name: <input onChange={handelChange} value={newName}/>
    </div>
    <div>
      number: <input onChange={handelNumChange} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const List = (props) => {
  const persons=props.persons;
  const setPersons=props.setPersons;

  const handelClick = (person,event) => {
    console.log(person.id)
    console.log('button click')
    console.log(event)
    if(confirm(`Delete ${person.name}`)){
      server.deletePerson(person).then( () => {
        const idToDel=person.id
        setPersons(persons.filter(person => person.id !== idToDel ))
      }
        
      )
    
    }
  }

  return (
    <div> 
    {
      persons.map((person) => {

        console.log(person)

        return <p key={person.id}>  {person.name} {person.number} <button onClick={(event)=>handelClick(person,event)}>delete</button></p> 
      })
    }
    
    </div>

  )
}
const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(()=>{
    server.getAll().then(data => {
      setPersons(data)
    })

  },[])

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} ></Filter>
     
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} ></PersonForm>
     
      <h3>Numbers</h3>
      <List persons={persons} setPersons={setPersons}/>
      
    
    </div>
  )

}

export default App
