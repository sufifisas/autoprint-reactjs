import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import cash from '../../img/vcash.png'
import status from '../../img/vstatus.png'
import { Roller } from 'react-awesome-spinners'

function OrderStatus(props) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      axios
            .get(`/order/vendor/${localStorage.getItem("vendorId")}?status=${props.status}`,{headers})
			.then(response => {
                setList(response.data.content)
                setLoading(false)
                console.log(response.data.content)
                })
			.catch(error => {
        alert(error.response.data.message)
        console.log(error.response.data)
            })
    },[]);

    const redirect = (id, latitude , longitude) => {
        localStorage.setItem("OrderId", id)
        localStorage.setItem("userLat", latitude)
        localStorage.setItem("userLong", longitude)
    }
    
    return (
        <div>
              <div className="row order-list">
                {list.map((item, i) => {
                    return (
                    <div className="col-3" key= {i}>
                        <Link onClick={() => redirect(item.id,item.latitude , item.longitude)} to={`/vendor/order/${item.id}`}>
                        <ul  className="order-card">
                            <li className="refer">{item.referenceId}</li>
                            <li className="date">{dateFormat(item.dateCreated, "mmmm dS, yyyy")}</li>
                            <li className="cash"><img src={cash} alt=""/>{item.invoices[0]?`MYR ${item.invoices[0].amount}` : "N/A"}</li>
                            <li className="cash"><img src={status} alt=""/>{item.status}</li>
                        </ul>
                        </Link>
                    </div>
                    )
                })}
                {loading && <div className="loading"><Roller /></div>}
                {!loading && list.length%4===0 && list.length===0? <div className="col-12 rare"><div className="empty full"></div></div>:<div></div>}
                {!loading && list.length%4 < 2 && list.length%4 > 0?<div className="col-3 rare"><div className="empty"></div></div>:<div></div>}
                {!loading && list.length%4 < 3 && list.length%4 > 0?<div className="col-3 rare"><div className="empty"></div></div>:<div></div>}
                {!loading && list.length%4 < 4 && list.length%4 > 0?<div className="col-3 rare"><div className="empty"></div></div>:<div></div>}    
              </div>
        </div>
    );
}

export default OrderStatus