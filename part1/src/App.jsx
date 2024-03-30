import { useState } from 'react'

const Header = (props) => {
  const header = props.course
  console.log(header)
  return (
    <div>
      <p>{header}</p>
    </div>
  )

}

const Content = (props) => {

  let list = props.list;


  return  (

    <div>
      {
        list.map((item,index)=>{
          return <p key={index}>{item.name} {item.exercises} </p>;
        })
      }

    </div>

    )
  }

const Total = (props) => {

  let list=props.list;
  console.log(list.reduce((sum,item) =>{

    return sum+item.exercises;
  },0)
  )

  const sum=list.reduce((sum,item) =>{

    return sum+item.exercises;
  },0)

  return (<p>Number of exercises {sum}</p>)
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <Header course={course.name}/>
      <Content list={course.parts} />
      <Total list={course.parts}/> 
    </div>
  )
}


export default App
