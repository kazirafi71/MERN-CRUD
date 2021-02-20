import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Get() {
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch('/crud/get-data')
        .then(res=>res.json())
        .then(result=>{
            setData(result.result)
            // console.log(result)
        })
        .catch(e=>console.log(e))
    },[])
    // console.log(data)

    const editList=(postId)=>{
        console.log(postId)

    }

    const deleteList=(postId)=>{
        fetch(`/crud/delete-data/${postId}`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            }})
         
            .then((res) => res.json())
            .then(result=>{
                let newData=data.filter(item=>{
                    return result.result._id!==item._id
                })
                setData(newData)
                
            })
            .catch(err=>{
                console.log(err)
            })


    }

    return (
        <div>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  {
      data && data.map(val=>{
          return(
            <tbody>
            <tr>
              <th scope="row">{val._id}</th>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.password}</td>
              <td>
                  <Link to={`/update/${val._id}`}>
                  <button onClick={()=>editList(val._id)} className="btn btn-warning mx-2">Edit</button>
                  
                  </Link>
                  
                  <button onClick={()=>deleteList(val._id)} className="btn btn-danger">Delete</button>

              </td>
            </tr>
            
          </tbody>
          )
      })
  }

</table>
        </div>
    )
}

export default Get
