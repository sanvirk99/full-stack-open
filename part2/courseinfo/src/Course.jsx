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
          list.map((item)=>{
            return <p key={item.id}>{item.name} {item.exercises} </p>;
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
  
    return (<p><strong>total of exercises</strong> {sum}</p>)
  }
  
  
  const Course = (props) => {
  
    const course=props.course;
    
    return (
      <div>
        <Header course={course.name}/>
        <Content list={course.parts} />
        <Total list={course.parts}/> 
      </div>
    )
  }

  export default Course