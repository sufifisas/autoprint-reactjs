import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderStatus from './OrderStatus';
import Loader from './Loader'



function Order() {

    const [pending, setPending] = useState()
    const [confirm, setConfirm] = useState()
    const [cancel, setCancel] = useState()
    const [reject, setReject] = useState()
    const [complete, setComplete] = useState()
    const [all,setAll] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      const list = ['CONFIRM', 'REJECTED', 'COMPLETED']
      list.forEach((product) => {
        axios
        .get(`/order/vendor/${localStorage.getItem("vendorId")}?status=${product}`,{headers})
        .then(response => {
                  if(product==="PENDING"){
                    setPending(response.data.content.length,product) 
                  }
                  else if(product===""){
                    setAll(response.data.content.length,product) 
                  }
                  else if(product==="CONFIRM"){
                    setConfirm(response.data.content.length,product) 
                  }
                  else if(product==="CANCELLED"){
                    setCancel(response.data.content.length,product) 
                  }
                  else if(product==="REJECTED"){
                    setReject(response.data.content.length,product) 
                  }
                  else {
                    setComplete(response.data.content.length,product) 
                  }
                  setLoading(false)
                  })
        .catch(error => {
          alert(error)
              })
      })
    },[])

  
    return (
        <div className="vendor-site">
          {loading && <Loader />}
          {!loading && 
            <div>
                <div className="vendor-title">
                  <h3>order list</h3>
                </div>
            <div>
          <div className="order-status">
            <Tabs>
              <TabList>
                <Tab>CONFIRM <div className="count">{confirm}</div></Tab>
                <Tab>REJECTED <div className="count">{reject}</div></Tab>
                <Tab>COMPLETED <div className="count">{complete}</div></Tab>
              </TabList>

              <TabPanel>
                <OrderStatus status="CONFIRM"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="REJECTED"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="COMPLETED"/>
              </TabPanel>
            </Tabs>
           </div>
            </div>
            </div>
          }
      
        </div>
    )
}

export default Order;