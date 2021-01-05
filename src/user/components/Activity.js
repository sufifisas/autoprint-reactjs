import React,{useEffect,useState} from 'react'
import axios from 'axios'

function Activity() {
    
    const [list, setList] = useState([])
    useEffect(() => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      axios
			.get(`/activity/user/${localStorage.getItem("id")}`,{headers})
			.then(response => {
                setList(response.data.content)
                })
			.catch(error => {
				console.log(error)
            })
    },[]);
    
    return (
        <div>
            <h1 style={{marginBottom: '20px'}}>Notification</h1>
           {list.map((item, i) => {
          return (
          <ul key= {i} className="orderlist">
            <li>{item.id}</li>
            <li style={{width: '25% '}}>{item.title}</li>
            <li style={{width: '45% '}}>{item.content}</li>
            </ul>
          )
        })}
        </div>
    )
}

export default Activity;