import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

function OrderList() {
    const [list, setList] = useState([])
    useEffect(() => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      axios
			.get(`/order/vendor/${localStorage.getItem("vendorId")}`,{headers})
			.then(response => {
                console.log(response.data.content,"order")
                setList(response.data.content)
                })
			.catch(error => {
				console.log(error)
            })
    },[]);

    const redirect = (id ,status , date) => {
        localStorage.setItem("OrderId", id)
        localStorage.setItem("OrderStatus", status)
        localStorage.setItem("OrderDate", date)
    }
    
    return (
        <div>
           {list.map((item, i) => {
          return (
          <ul key= {i} className="orderlist">
            <li>{item.id}</li>
            <li>{item.status}</li>
            <li>{item.referenceId}</li>
            <li>{item.dateCreated}</li>
            <li>{item.invoices[0]?item.invoices[0].status : "N/A"}</li>
            <li>{item.invoices[0]?item.invoices[0].amount : "0.1"}</li>
            <Link onClick={() => redirect(item.id,item.status,item.dateCreated)} to="/vendor/order/document">View</Link>
            </ul>
          )
        })}
        </div>
    )
}

export default OrderList;