import { useState } from 'react'

const Button = (props) => {
  
  let text=props.text;
  let state=props.state;
  let setState=props.setState;

  const increase = () => {

    setState(state+1);
    console.log(state);

  }

  return (
    <div>
    <button onClick={increase}>{text}</button>  
    </div>
    
  ) 
}

const StatisticLine = (props) => {

    let text=props.text;
    let value=props.value;

    return (
      <tr>
      <td>{text}</td>
      <td>{value}</td>
      </tr>
    )


}

const Statistics = (props) => {

  let good=props.good;
  let bad=props.bad;
  let neutral=props.neutral;


  const all=good+neutral+bad;

  if(all===0){

    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const average=(good-bad)/all;
  const positive=good/all * 100;

  return (
    
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
  )

}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  return (
    <>
      <h1>give feedback</h1>

      <div style={{display: 'flex'}}>
      <Button text={"good"} state={good} setState={setGood}/>
      <Button text={"neutal"} state={neutral} setState={setNeutral}/>
      <Button text={"bad"} state={bad} setState={setBad}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      
    </>
  )
}

export default App
