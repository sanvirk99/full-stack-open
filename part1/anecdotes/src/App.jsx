import { useState } from 'react'


const Next=(props)=>{

  let text=props.text;
  let setState=props.setState;
  let state=props.state;
  let len=props.length;

  const next=()=>{
    console.log(state);
    if((state+1)===len){
      setState(0);
      return;
    }
    setState(state+1);  
    return;
  } 
    
  
  return (

    <div>
      <button onClick={next}>{text}</button>
    </div>


  )

}

const Vote = (props) => {

  let setArr=props.setArr;
  let stateArr=props.stateArr;
  let state=props.state;
  let setMax=props.setMax;

  const addVote = () => {
    console.log("prev vote",stateArr)
    let copy=[...stateArr];
    copy[state]=stateArr[state]+1;
    setArr(copy);
    setMax(copy.indexOf(Math.max(...copy)))
    
  }

  return (

    <div>
    <button onClick={addVote}>vote</button>
    </div>
  )


}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [max,setMax]=useState(0);
  const [arr,setArr] = useState([]);

  if(arr.length===0){
    let intial=[];
    for(const item of anecdotes){
      //console.log(item)
      intial.push(0);
    }
    setArr(intial);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <>has {arr[selected]} vote</>
      <div style={{display: 'flex'}}>
        <Vote state={selected} stateArr={arr} setArr={setArr} setMax={setMax}/>
        <Next length={anecdotes.length} text={"next anecdote"} state={selected} setState={setSelected}/>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
      
    </div>
  )
}

export default App