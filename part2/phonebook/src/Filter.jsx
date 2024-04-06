import {useState} from 'react'
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
export {Filter}  