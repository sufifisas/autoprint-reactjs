import React, {useState , useEffect} from 'react'
import axios from 'axios'
import ConfirmDocument from './ConfirmDocument'
import { Roller } from 'react-awesome-spinners'

function DocumentList() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    const [list, setList] = useState([])
    const [amount, setAmount] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
        axios
        .get(`/document/order/${localStorage.getItem("OrderId")}`,{headers})
        .then(response => {
                  setList(response.data.content)
                  setLoading(false)
                  })
        .catch(error => {
          console.log(error)
              })
        axios
        .post(`/order/${localStorage.getItem("OrderId")}/pre/confirm`,{} ,{headers})
        .then(response => {
            if(response.status === 200){  
              setAmount(response.data.amount)
              localStorage.setItem("inv",response.data.amount)
            } 
            })
        .catch(error => {
            console.log(error)
        })
    },[]);

    
    
    
    
    return (
        <div>
          {loading && <div className="loading"><Roller /></div>}
          {!loading && <div>
           {list.map((item, i) => {
          return (
          <div href={item.url} key= {i}>
          <ul className="orderlist document">
            <li style={{width: '10% '}}>Id: {item.id}</li>
            <li style={{width: '45% '}}>{item.filename}</li>
            <li style={{width: '25% '}}>Orentation: {item.pageOrientation}</li>
            <li style={{width: '30% '}}>Colour: {item.colour}</li>
            <li style={{width: '10% '}}>Copies: {item.copies}</li>
            <span onClick = {() => del(item.id)}>Delete</span>
            </ul>
            </div>
          )
        })}
        <div style={{textAlign: 'right'}}>
          <h1>Total Amount: MYR {amount}</h1>
          
          {list[0] ? <ConfirmDocument /> : ''}
        </div>
        </div>
        }
        </div>
    )
}

export default DocumentList