import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderStatus from './OrderStatus';
import OrderModal from './OrderModal'
import Loader from './Loader'
import Banner from './Banner'



function Order() {

    const [pending, setPending] = useState()
    const [confirm, setConfirm] = useState()
    const [cancel, setCancel] = useState()
    const [reject, setReject] = useState()
    const [complete, setComplete] = useState()
    const [all,setAll] = useState()
    const [loading, setLoading] = useState(false) //true


    // useEffect(() => {
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem("token")
    //   }
    //   const list = ['','PENDING', 'CONFIRM', 'CANCELLED', 'REJECTED', 'COMPLETED']
    //   list.forEach((product) => {
    //     axios
    //     .get(`/order/user/${localStorage.getItem("id")}?status=${product}`,{headers})
    //     .then(response => {
    //               if(product==="PENDING"){
    //                 setPending(response.data.content.length,product) 
    //               }
    //               else if(product===""){
    //                 setAll(response.data.content.length,product) 
    //               }
    //               else if(product==="CONFIRM"){
    //                 setConfirm(response.data.content.length,product) 
    //               }
    //               else if(product==="CANCELLED"){
    //                 setCancel(response.data.content.length,product) 
    //               }
    //               else if(product==="REJECTED"){
    //                 setReject(response.data.content.length,product) 
    //               }
    //               else {
    //                 setComplete(response.data.content.length,product) 
    //               }
    //               setLoading(false)
    //               })
    //     .catch(error => {
    //       alert(error)
    //           })
    //   })
    // },[])

  
    return (
        <div>
          {loading && <Loader />}
          {!loading && 
            <div>
              <Banner title="order list"/>
            <div className="container-lg">

          <OrderModal title="CREATE NEW ORDER"/>
          <div className="order-status">
            <Tabs>
              {/* <TabList>
                <Tab>ALL <div className="count">{all}</div></Tab>
                <Tab >PENDING <div className="count">{pending}</div></Tab>
                <Tab>CONFIRM <div className="count">{confirm}</div></Tab>
                <Tab>CANCELLED <div className="count">{cancel}</div></Tab>
                <Tab>REJECTED <div className="count">{reject}</div></Tab>
                <Tab>COMPLETED <div className="count">{complete}</div></Tab>
              </TabList> */}

              <TabList>
                <Tab>ALL <div className="count">4</div></Tab>
                <Tab >PENDING <div className="count">4</div></Tab>
                <Tab>CONFIRM <div className="count">4</div></Tab>
                <Tab>CANCELLED <div className="count">4</div></Tab>
                <Tab>REJECTED <div className="count">4</div></Tab>
                <Tab>COMPLETED <div className="count">4</div></Tab>
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
            </div>
            </div>
          }
      
        </div>
    )
}

export default Order;