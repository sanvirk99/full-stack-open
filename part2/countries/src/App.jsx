import { useState , useEffect} from 'react'
import axios from 'axios'


// endpoint	description
// /api/all	All countries
// /api/name/{name}	Search by country’s full name. It can be the common or official value


const CountryInfo=(props) => {

    //conditonal
    const country=props.country;
    const [source,setSource]=useState('')
    const [imgAlt,setAlt]=useState('')
    const [capital,setCapital]=useState('')
    const [area,setArea]=useState('')
    const [languages,setLanguages]=useState([])
    const [visable,setVisible]=useState(false)
    const [temp,setTemp]=useState('')
    const [wind,setWind]=useState('')
    const [icon,setIcon]=useState('')
    
    useEffect(()=>{

      //fetch country related data
      if(country){

        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          //console.log(response.data)
          let data=response.data
          console.log(data)
          console.log(data.languages)
          let temp=[]
          for(let key in data.languages){
            temp.push(data.languages[key])
          }
          setCapital(data.capital)
          setLanguages(temp)
          setArea(data.area)
          setSource(data.flags.png)
          setAlt(data.flags.alt)
          setVisible(true)
          return data.capital
        })
        .then((capital)=>{
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_SOME_KEY}`)
          .then(response=>{
            console.log(response.data)
            console.log(response.data.wind['speed'], 'm/s')
            setWind(response.data.wind['speed'], 'm/s')
            console.log(response.data.main.temp)
            let celsius=(response.data.main.temp-32) * 5/9
            setTemp(celsius.toFixed(2))
            console.log(response.data.weather[0]['icon'])
            setIcon(response.data.weather[0]['icon'])

          }).catch(error => {
            console.log('error fetching city weather information')
          })
        })
        .catch(e => {
          console.log('error fetching data')
        })

      }else{
        setVisible(false)
      }

    },[country])

      
     
  
    return (<>
    { visable && (
      <>
      <h1>{country}</h1>
      captial {capital} <br/>
      area {area}
      <h3>languages:</h3>
      <ul>
      {
        languages.map(item=>{
          return <li key={item}> {item}</li>
        })
      }

      </ul>
      <img src={source} alt={imgAlt} />
      <h2>Weather in {capital}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <p>wind {wind} m/s</p>
      </>
    )
    }
    </>

    )
  
}


const List=(props)=>{
  const list=props.list;
  const setSearch=props.setSearch;

  const handelClick=(event)=>{
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
    
  }
  

  return(
    <div>
      {
      list.map(item=>{
        return <p key={item}>{item} <button value={item} onClick={handelClick}>show</button></p>
      })
      }
    </div>
    
  )
}

const Filter = (props) => {
  const countries=props.countries;
  const [search,setSearch]=useState('')
  const [list,setList]=useState([])
  const [msg,setMsg]=useState('')
  const [country,setCountry]=useState('')
  
  useEffect(()=>{

    //console.log(search)
    const matches=countries.filter(country => {

      return country.toLowerCase().includes(search)

    })
    
    if(matches.length>10){
      setList([])
      setMsg('Too many countries, please specify another filter')
      setCountry('')
      return;
    }else if(matches.length===1){
      setCountry(matches[0])
      setMsg('')
      setList([])
      return
    }else if(matches.length===0){
      setMsg('no match found')
      setList([])
      setCountry('')
    }
    else{
      setList(matches)
      setMsg('')
      setCountry('')
      return
    }
   
  },[search])

  const handelInput=(event)=> {
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
  }


  return (

    <div>
      find countries<input onChange={handelInput} value={search}/>
      <CountryInfo country={country}/>
      <List list={list} setSearch={setSearch}/>
      <p>{msg}</p>
    </div>
  )

  
}






function App() {
  const [count, setCount] = useState(0)
  const [countries,setCountries] =useState([])
  useEffect(() => {
    
    const list=[];
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      response.data.map(item => {
        //console.log(item.name.common)
        //console.log(item)
        list.push(item.name.common)
        
      })
      setCountries(list)
      console.log("running effect");
      console.log("effect")
    })
    .catch(e => {

      console.log(e,'error fetching list of countires')

    })
    

  },[]) //run only once


  return (
    <>
    <Filter countries={countries}/>
    </>
  )
}

export default App
