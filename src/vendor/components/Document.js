import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Complete from './CompleteModal'
import Cancel from './CancelModal'
// import DeleteModal from './DeleteModal'
// import Reorder from './ReorderModal'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import dateFormat from 'dateformat'
import Geocode from "react-geocode";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {Link} from 'react-router-dom'


function Document() {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState([])
    const [list, setList] = useState([])
    const [arr, setArr] = useState([])
    const [ven, setVen] = useState([])
    const [userAdd, setUserAdd] = useState()

    Geocode.setApiKey("AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE");

    // useEffect(() => {
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem("token")
    //   }
    //   axios
    //         .get(`/document/order/${localStorage.getItem("OrderId")}`,{headers})
		//         .then(response => {
    //          console.log(response.data.content)
    //             setList(response.data.content)
    //             setLoading(false)
    //             })
    //         .catch(error => {
    //           console.log(error)
    //               })

    //         axios
    //         .get(`/order/${localStorage.getItem("OrderId")}`,{headers})
    //         .then(response => {
    //                   setAmount(response.data.invoices[0].amount)
    //                   setArr(response.data)
    //                   setLoading(false)
    //                   console.log(response.data,"order")
    //                   })
    //         .catch(error => {
    //           alert(error)
    //               })

    //         Geocode.fromLatLng(localStorage.getItem("userLat"), localStorage.getItem("userLong")).then(
    //           response => {
    //             setUserAdd(response.results[0].formatted_address)
    //           },
    //           error => {
    //             console.error(error);
    //           }
    //         );
    //     },[]);
    
    return (
        <div className="vendor-site">
          {loading && <Loader />}
          {!loading && 
            <div>
           
                <div className = "profile-center">
                    <div className="profile" style={{maxWidth:'1240px'}}>
                   
                  <div className="list-bg document-list1">
                  <div className="list-detail">
                    <div className="list-detail-content row">
                      
                      <div className="col-3 order-detail">
                        <div>
                          <h4>Order details</h4>
                          <h2>{arr.referenceId}</h2>
                        </div>
                        <div>
                          </div>

                      </div>
                      <div className="col-9">
                      <div className="row">
                        <div className="col-4 on-right">    
                          <ScheduleOutlinedIcon fontSize="large" style={{color:'#8860D0'}}/>
                          <div className="detail">
                            <h4>created on</h4>
                            {/* <h3>{dateFormat(arr.dateCreated, "mmmm dS, yyyy")}</h3> */}
                            <h3>{dateFormat("mmmm dS, yyyy")}</h3>
                          </div>
                        </div>
                        <div className="col-4 on-right">
                          <HourglassEmptyIcon fontSize="large" style={{color:'#8860D0'}}/>
                          <div className="detail">
                            <h4>status</h4>
                            {/* <h3>{arr.status}</h3> */}
                            <h3>PENDING</h3>
                          </div>
                        </div>
                        <div className="col-4 on-right">
                          <AttachMoneyIcon fontSize="large" style={{color:'#8860D0'}}/>
                          <div className="detail">
                            <h4>Price</h4>
                            {/* <h3>MYR {amount}</h3> */}
                            <h3>MYR 2.00</h3>
                          </div>
                        </div>
                        {/* {arr.status === "REJECTED" && 
                        <div className="col-12">
                        {arr.reason}
                        </div>} */}
                      </div>
                      </div>
                      {/* <div>{arr.reason}</div> */}
                    </div>
                  </div>
                  {!list.length>0 ? 
                    <div className="list-container">
                    <ul className="list-header row pt-4 pb-3 mb-0">
                      <li className="col-1">No.</li>
                      <li className="col-2">Filename</li>
                      <li className="col-1">Copies</li>
                      <li className="col-2">Colour</li>
                      <li className="col-2">Pages</li>
                      <li className="col-2">Orientation</li>
                      <li className="col-2">Duplex</li>
                    </ul>
                    <div>
                      {/* {list.map((item, i) => {
                        return (
                            <ul key= {i} className="orderlist row">
                                <li className="col-1">{i+1}</li>
                                <li className="col-4">{item.filename}</li>
                                <li className="col-1">{item.copies}</li>
                                <li className="col-2">{item.colour=="AUTO" ? "AUTO" : "MONOCHROME"}</li>
                                <li className="col-2">{item.pages}</li>
                                <li className="col-2">{item.pageOrientation}</li>
                                <li className="col-2">{item.duplex}</li>
                                <li className="col-1 icon">
                                   
                                </li>
                            </ul>
                        )
                      })} */}

                        <ul className="orderlist row">
                            <li className="col-1">1</li>
                            <li className="col-2">document1.pdf</li>
                            <li className="col-1">2</li>
                            <li className="col-2">MONOCHROME</li>
                            <li className="col-2">1</li>
                            <li className="col-2">PORTRAIT</li>
                            <li className="col-2">DUPLEX</li>
                        </ul>
                        <ul className="orderlist row">
                            <li className="col-1">2</li>
                            <li className="col-2">document2.pdf</li>
                            <li className="col-1">2</li>
                            <li className="col-2">AUTOE</li>
                            <li className="col-2">1</li>
                            <li className="col-2">LANDSCAPE</li>
                            <li className="col-2">NO_DUPLEX</li>
                        </ul>
                        <ul className="orderlist row">
                            <li className="col-1">3</li>
                            <li className="col-2">document3.pdf</li>
                            <li className="col-1">2</li>
                            <li className="col-2">MONOCHROME</li>
                            <li className="col-2">1</li>
                            <li className="col-2">PORTRAIT</li>
                            <li className="col-2">DUPLEX</li>
                        </ul>

                    </div>
                  <div className="pre-confirm row">
                      <div>
                         
                          <div className="pre-button">
                            {arr.status === "CONFIRM" && <Cancel title="reject order" />}
                            {arr.status === "CONFIRM" && <Complete title="complete order"/>}
                            {arr.status !== "CONFIRM" && <Link to='/vendor/order'><button className="add-order">Back</button></Link>}
                          </div>
                          {/* {arr.status==="CANCELLED" && <Reorder title="recreate order"/>} */}
                      </div>
                  </div>
                </div>
                  : <div></div>}
                  
                
                </div>
                  </div>
               

              </div>
            </div>
          }
          
        </div>
    )
}

export default Document;
