import React, {useState , useEffect} from 'react'
import axios from 'axios'

function DocumentList() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    const [list, setList] = useState([])
    const OrderId = localStorage.getItem("OrderId");
    const [amount, setAmount] = useState()
    const [rej, setRej] = useState(false)
    const [reason, setReason] = useState('')

    useEffect(() => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
        axios
        .get(`/document/order/${localStorage.getItem("OrderId")}`,{headers})
        .then(response => {
                  setList(response.data.content)
                  console.log(response)
                  })
        .catch(error => {
          console.log(error)
              })
        
        axios
        .get(`/order/${localStorage.getItem("OrderId")}`,{headers})
        .then(response => {
                  setAmount(response.data.invoices[0].amount)
                  console.log(response,"order")
                  })
        .catch(error => {
          console.log(error)
              })
    },[]);

    const reject = () => {
      const body = {
        reason: reason
      }
      axios
        .post(`/order/${OrderId}/reject`, body , {headers})
        .then(response => {
                  console.log(response,"post");
                  if(response.status === 200){
                      alert("order has been rejected") 
                  }  
                  window.location.reload(false);        
        })
        .catch(error => {
          console.log(error)
              })
    }

    const show = () => {
      if(rej === true)
      return(
        <div>
          <input type="text" onChange={(e) => setReason(e.target.value)}/>
          <button onClick={reject}>OK</button>
        </div>
      )
    }
    
    
    
    return (
        <div>
           {list.map((item, i) => {
          return (
          <div href={item.url} key= {i}>
          <ul className="orderlist document">
            <li style={{width: '10% '}}>Id: {item.id}</li>
            <li style={{width: '45% '}}>{item.filename}</li>
            <li style={{width: '25% '}}>Orentation: {item.pageOrientation}</li>
            <li style={{width: '30% '}}>Colour: {item.colour}</li>
            <li style={{width: '10% '}}>Copies: {item.copies}</li>
          
            </ul>
            </div>
          )
        })}
        <div style={{textAlign: 'right'}}>
          <h1>Total Amount: MYR {amount}</h1>
          
          <button onClick={() => setRej(true)}>Reject</button>
          {/* <div style={{display:`${rej ? 'block' : 'none'}`}}>
            <input type="text" onChange={(e) => setReason(e.target.value)}/>
            <div onClick={reject()}>OK</div>
          </div> */}
          {show()}
          <button onClick={() => {
            axios
            .post(`/order/${OrderId}/complete` , {headers})
            .then(response => {
                      console.log(response,"post");
                      if(response.status === 200){
                          alert("order has been completed") 
                      }  
                      window.location.reload(false);        
            })
            .catch(error => {
              console.log(error)
                  })
          }}>Complete</button>

        </div>
        
        </div>
    )
}

export default DocumentList