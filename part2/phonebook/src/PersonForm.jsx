import {useState} from 'react'
const PersonForm = (props) => {
    const persons = props.persons;
    const setPersons=props.setPersons;
    const setErrorMsg=props.setErrorMsg;
    const setMsg=props.setMsg;
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
            setPersons(updatePersons);
            setMsg(`Updated ${updatePerson.name}`)
          })
          .catch(error=>{
  
              console.log(error)
              setErrorMsg(`Information on ${updatePerson.name} has been removed from server`)
              setPersons(persons.filter(person => person.id !== updatePerson.id ))
  
  
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
        setMsg(`Added ${person.name}`)
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

  export {PersonForm}