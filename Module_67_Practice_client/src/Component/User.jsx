import React from 'react';
import { useLoaderData } from 'react-router-dom';

const User = () => {
    const loaddata=useLoaderData();
    console.log(loaddata);
    function handlefunction(event){
        event.preventDefault();
        const email=event.target.email.value;
        const name=event.target.name.value;
        const user={name,email}
        console.log(user);
        fetch(`http://localhost:2300/user/${loaddata._id}`,{
          method:"PUT",
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if(data.modifiedCount>0){
            alert("Updated Successfully");
            event.target.reset();
          }
        })
      }
    return (
        <div>
            <form onSubmit={handlefunction}>
    <input type="text" name="name" id="name" defaultValue={loaddata.name}/><br />
    <input type="email" name="email" id="email" defaultValue={loaddata.email}/><br />
    <input type="submit" value="Update" />
  </form>
        </div>
    );
};

export default User;