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
        })
        .catch(error => {
          console.log('person is already removed',error)
        })
      
      }
    }
  
    return (
      <div> 
      {
        persons.map((person) => {
  
          //console.log(person)
  
          return <p key={person.id}>  {person.name} {person.number} <button onClick={(event)=>handelClick(person,event)}>delete</button></p> 
        })
      }
      
      </div>
  
    )
  }


  export {List}