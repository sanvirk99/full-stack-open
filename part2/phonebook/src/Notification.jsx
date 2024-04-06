import './App.css';
const Notification=({message,errorMsg}) => {

    if(message===null && errorMsg === null){
      return null;
    }
    
    if(errorMsg!==null){
  
      return (<div className='errorNotification'>
        {errorMsg}
      </div>)
    }
  
    return (<div className='notification'>
      {message}
    </div>)
  }

  export {Notification}