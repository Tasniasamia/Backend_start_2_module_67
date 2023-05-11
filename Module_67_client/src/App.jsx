import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data,setData]=useState({});
  const [count,setCount]=useState([]);
function handlefunction(event){
  event.preventDefault();
  const name=event.target.name.value;
  const email=event.target.email.value;
  const user={name,email};
  fetch('http://localhost:2000/user',{
    method:'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res=>res.json())
  .then(data=>{
    setData(data);
    if(data.insertedId){
      alert('server gotted data');
      event.target.reset();
    }
    
  })
}

useEffect(()=>{
  fetch('http://localhost:2000/user')
  .then(res=>res.json())
  .then(data=>setCount(data))

},[])
console.log(count);
function deletefunction(id){
  console.log("delete id",id);
  fetch(`http://localhost:2000/user/${id}`,{
    method:"DELETE"
  }).then(res=>res.json())
  .then(data=>{
    console.log("delete data",data);
   

  })
  
}

  return (
    <div className="App">
      <h2>Simple Crud Operation</h2>
  <form onSubmit={handlefunction}>
    <input type="text" name="name" id="name" /><br />
    <input type="email"name="email"id="email" /><br />
    <input type="submit" value="Add Resister" />

  </form>


  <div>
{
  count.map(index=><div key={index._id}>
    name:{index.name}email:{index.email}
    <button onClick={()=>deletefunction(index._id)}>X</button>
  </div>)
}

  </div>
    </div>
  )
}

export default App
