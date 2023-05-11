import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [data,setData]=useState([]);
  function delfunction(_id){
    console.log("get id",_id);

      fetch(`http://localhost:2300/user/${_id}`,{
        method:"DELETE"
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
    
    
  }
  useEffect(()=>{
    fetch('http://localhost:2300/user')
    .then(res=>res.json())
    .then(data=>{console.log(data)
    setData(data)})
  },[])
  function handlefunction(event){
    event.preventDefault();
    const email=event.target.email.value;
    const name=event.target.name.value;
    const user={name,email}
    console.log(user);
    fetch('http://localhost:2300/user',{
      method:"POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.insertedId){
        alert("server get data from client");
        event.target.reset();
      }
    })
  }
console.log(data);



  return (
    <div className="App">
  <form onSubmit={handlefunction}>
    <input type="text" name="name" id="name" /><br />
    <input type="email" name="email" id="email" /><br />
    <input type="submit" value="Add Resister" />
  </form>
  {
    data.map(index=><div key={index._id}>
      {index.email} name:{index.name}
      <button ><Link to={`/user/${index._id}`}style={{textDecoration:"none"}} >Update</Link>  </button>
      <button onClick={()=>delfunction(index._id)}>X</button>
    </div>)
  }





  <div>

  </div>
    </div>
  )
}

export default App
