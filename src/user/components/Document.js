import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
import Banner from './Banner'
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Confirm from './ConfimModal'
import Cancel from './CancelModal'
import DeleteModal from './DeleteModal'
import Add from './AddDocument'
import Reorder from './ReorderModal'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import dateFormat from 'dateformat'
import Geocode from "react-geocode";
import TopupModal from './TopupModal'
import AddDoc from './AddDoc'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Nearest from './NearestModal'


function Document() {
    const [loading, setLoading] = useState(false) //true
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
    //         .post(`/order/${localStorage.getItem("OrderId")}/pre/confirm`,{ vendorId: ''} ,{headers})
    //         .then(response => {
    //             if(response.status === 200){  
    //               setAmount(response.data.amount)
    //               localStorage.setItem("inv",response.data.amount)
    //             } 
    //             })
    //         .catch(error => {
    //             console.log(error)
    //         })

    //         axios
    //         .get(`/order/${localStorage.getItem("OrderId")}`,{headers})
    //         .then(response => {
    //                   setArr(response.data)
    //                   setVen(response.data.vendor)
    //                   setLoading(false)
    //                   console.log(response.data,"order")
    //                   Geocode.fromLatLng(response.data.latitude, response.data.longitude).then(
    //                     response => {
    //                       setUserAdd(response.results[0].formatted_address)
    //                       console.log(response.results[0].formatted_address)
    //                     },
    //                     error => {
    //                       console.error(error);
    //                     }
    //                   );
    //                   })
    //         .catch(error => {
    //           alert(error.response.data.message)
    //           console.log(error.response.data)
    //               })

            
    //     },[]);
    
    return (
        <div>
          {loading && <Loader />}
          {!loading && 
            <div>
              <Banner title="list"/>
                <div className = "profile-center">
                    <div className="profile" style={{maxWidth:'1240px'}}>
                   
                  <div className="list-bg document-list">
                  <div className="balance">
                    <p>Current balance</p>
                    {/* <div className="wallet-text"><TopupModal iconsize="large"/><h3>MYR {Number.parseFloat(localStorage.getItem("wallet")).toFixed(2)}</h3></div> */}
                    <div className="wallet-text"><TopupModal iconsize="large"/><h3>MYR 100.00</h3></div>
                  </div>
                  <div className="list-detail">
                    <div className="list-detail-content row">
                      
                      <div className="col-3 order-detail">
                        <div>
                          <h4>Order details</h4>
                          {/* <h2>{arr.referenceId}</h2> */}
                          <h2>ABCD1234</h2>
                        </div>
                        <div>
                        {/* {arr.status==="PENDING" && <AddDoc title="upload document"/>} */}
                        <AddDoc title="upload document"/>
                          </div>

                      </div>
                      <div className="col-9">
                      <div className="row">
                      <div className="col-10 on-right">
                          <LocationOnOutlinedIcon fontSize="large" color="primary"/>
                          <div className="detail">
                            <h4>created from</h4>
                            {/* <h3>{userAdd}</h3> */}
                            <h3>Kolej Kediaman Kinabalu, Universiti Malaya</h3>
                          </div>
                          
                        </div>
                        <div className="col-4 on-right">
                          <StoreOutlinedIcon fontSize="large" color="primary"/>
                          <div className="detail">
                            <h4>issued to</h4>
                            {/* <h3>{ven.vendorname}</h3> */}
                            <h3>Popular Printing</h3>
                          </div>
                        </div>
                        <div className="col-4 on-right">    
                          <ScheduleOutlinedIcon fontSize="large" color="primary"/>
                          <div className="detail">
                            <h4>created on</h4>
                            {/* <h3>{dateFormat(arr.dateCreated, "mmmm dS, yyyy")}</h3> */}
                            <h3>January 17th, 2021</h3>
                          </div>
                        </div>
                        <div className="col-4 on-right">
                          <HourglassEmptyIcon fontSize="large" color="primary"/>
                          <div className="detail">
                            <h4>status</h4>
                            {/* <h3>{arr.status}</h3> */}
                            <h3>PENDING</h3>
                          </div>
                        </div>
                      </div>
                      </div>
                      {/* <div>{arr.reason}</div> */}
                    </div>
                  </div>
                  {/* {list.length>0 ? 
                    <div className="list-container">
                    <ul className="list-header row pt-4 pb-3 mb-0">
                      <li className="col-1">No.</li>
                      <li className="col-4">Filename</li>
                      <li className="col-1">Copies</li>
                      <li className="col-2">Colour</li>
                      <li className="col-2">Pages</li>
                      <li className="col-2">Orientation</li>
                      <li className="col-2">Duplex</li>
                      <li className="col-2 amount">MYR {amount}</li>
                    </ul>
                    <div>
                      {list.map((item, i) => {
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
                                    <a href={item.url} download>
                                        <IconButton aria-label="delete" style={{padding: '5px'}} color="primary">
                                            <CloudDownloadIcon />
                                        </IconButton>
                                    </a>
                                </li>
                                <li className="col-1 icon">
                                    {arr.status==="PENDING" && <DeleteModal title="delete document" desc={item.filename} id={item.id}/>}
                                </li>
                            </ul>
                        )
                      })}
                    </div>
                  <div className="pre-confirm row">
                      <div>
                          {arr.status==="PENDING" && list.length>0 && 
                          <div className="pre-button">
                            <Cancel title="cancel order" />
                            <Confirm title="confirm order" price={amount} lat={arr.latitude} lng={arr.longitude} id={ven.id}/>
                            
                          </div>}
                          {arr.status==="CANCELLED" && <Reorder title="recreate order"/>}
                      </div>
                  </div>
                </div>
                  : <div></div>} */}

                  <div className="list-container">
                    <ul className="list-header row pt-4 pb-3 mb-0">
                      <li className="col-1">No.</li>
                      <li className="col-4">Filename</li>
                      <li className="col-1">Copies</li>
                      <li className="col-2">Colour</li>
                      <li className="col-2">Pages</li>
                      <li className="col-2">Orientation</li>
                      <li className="col-2">Duplex</li>
                      <li className="col-2 amount">MYR 2.00</li>
                    </ul>
                    <div>
                      <ul className="orderlist row">
                          <li className="col-1">1</li>
                          <li className="col-4">document1.pdf</li>
                          <li className="col-1">2</li>
                          <li className="col-2">AUTO</li>
                          <li className="col-2">5</li>
                          <li className="col-2">PORTRAIT</li>
                          <li className="col-2">NO-DUPLEX</li>
                          <li className="col-1 icon">
                            <IconButton aria-label="delete" style={{padding: '5px'}} color="primary">
                                <CloudDownloadIcon />
                            </IconButton>
                          </li>
                          <li className="col-1 icon">
                              <DeleteModal title="delete document" desc="document1.pdf" id={1}/>
                          </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="orderlist row">
                          <li className="col-1">2</li>
                          <li className="col-4">document2.pdf</li>
                          <li className="col-1">5</li>
                          <li className="col-2">AUTO</li>
                          <li className="col-2">2</li>
                          <li className="col-2">LANDSCAPE</li>
                          <li className="col-2">DUPLEX</li>
                          <li className="col-1 icon">
                            <IconButton aria-label="delete" style={{padding: '5px'}} color="primary">
                                <CloudDownloadIcon />
                            </IconButton>
                          </li>
                          <li className="col-1 icon">
                              <DeleteModal title="delete document" desc="document1.pdf" id={1}/>
                          </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="orderlist row">
                          <li className="col-1">3</li>
                          <li className="col-4">document3.pdf</li>
                          <li className="col-1">10</li>
                          <li className="col-2">MONOCHROME</li>
                          <li className="col-2">1</li>
                          <li className="col-2">AUTO</li>
                          <li className="col-2">NO-DUPLEX</li>
                          <li className="col-1 icon">
                            <IconButton aria-label="delete" style={{padding: '5px'}} color="primary">
                                <CloudDownloadIcon />
                            </IconButton>
                          </li>
                          <li className="col-1 icon">
                              <DeleteModal title="delete document" desc="document1.pdf" id={1}/>
                          </li>
                      </ul>
                    </div>
                    <div className="pre-confirm row">
                      <div>
                          {/* {arr.status==="PENDING" && list.length>0 && 
                          <div className="pre-button">
                            <Cancel title="cancel order" />
                            <Confirm title="confirm order" price={amount} lat={arr.latitude} lng={arr.longitude} id={ven.id}/>
                            
                          </div>} */}
            
                          <div className="pre-button">
                            <Cancel title="cancel order" />
                            <Confirm title="confirm order" price={2.00} />
                            
                          </div>
                          {arr.status==="CANCELLED" && <Reorder title="recreate order"/>}
                      </div>
                    </div>
                  </div>
                  
                
                </div>
                  </div>
               

              </div>
            </div>
          }
          
        </div>
    )
}

export default Document;
