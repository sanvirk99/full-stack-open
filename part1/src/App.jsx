import { useState } from 'react'

const Header = (props) => {
  const header = props.item
  return (
    <div>
      <p>{header}</p>
    </div>
  )

}

const Content = (props) => {

  let list = props.list;
  let nums= props.exercises;
  //console.log(list);

  return  (

    <div>
      {
        list.map((item,index)=>{
          return <p key={index}>{item} {nums[index]} </p>;
        })
      }

    </div>

    )
  }

const Total = (props) => {

  return (<p>Number of exercises {props.total}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts=[part1,part2,part3]
  const exercises=[exercises1,exercises2,exercises3]
  
  return (
    <div>
      <Header item={course}/>
      <Content list={parts} exercises={exercises} />
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}


export default App
