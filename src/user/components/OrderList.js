import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderStatus from './OrderStatus';
import { Roller } from 'react-awesome-spinners'


function OrderList() {
    const [address, setAddress] = useState('');
    const [order, setOrder] = useState(false)

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
      const list = ['','PENDING', 'CONFIRM', 'CANCELLED', 'REJECTED', 'COMPLETED']
      list.forEach((product) => {
        axios
        .get(`/order/user/${localStorage.getItem("id")}?status=${product}`,{headers})
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
        <div>
          {loading && <div className="loading"><Roller /></div>}
          {!loading && 
          <div className="order-status">
            <Tabs>
              <TabList>
                <Tab>ALL <div className="count">{all}</div></Tab>
                <Tab >PENDING <div className="count">{pending}</div></Tab>
                <Tab>CONFIRM <div className="count">{confirm}</div></Tab>
                <Tab>CANCELLED <div className="count">{cancel}</div></Tab>
                <Tab>REJECTED <div className="count">{reject}</div></Tab>
                <Tab>COMPLETED <div className="count">{complete}</div></Tab>
              </TabList>

              <TabPanel>
                <OrderStatus status=""/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="PENDING"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="CONFIRM"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="CANCELLED"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="REJECTED"/>
              </TabPanel>
              <TabPanel>
                <OrderStatus status="COMPLETED"/>
              </TabPanel> 
            </Tabs>
           </div>
           
          }
      
        </div>
    )
}

export default OrderList;