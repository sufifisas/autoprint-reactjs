import React, { useState ,useEffect }from 'react'
import Loader from './Loader'
import profile from '../../img/bg.png'
import axios from 'axios'
import TopupModal from './TopupModal'
import {Link} from 'react-router-dom';

export default function Home() {
    const [loading, setLoading] = useState(false) //true
    const [list, setList] = useState([])
    const [all, setAll] = useState(0)
    const [pending, setPending] = useState(0)
    const [complete, setComplete] = useState(0)
    const [act, setAct] = useState(0)
    // useEffect(() => {
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem("token")
    //   }
    //   axios
	// 		.get(`/user/${localStorage.getItem("id")}`,{headers})
	// 		.then(response => {
    //          console.log(response)
    //             setList(response.data)
    //             setLoading(false)
    //             })
	// 		.catch(error => {
	// 			console.log(error)
    //         })

    // axios
    //         .get(`/order/user/${localStorage.getItem("id")}?status=`,{headers})
    //         .then(response => {
    //             setAll(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //     console.log(error.response.data)
    //         })
    // axios
    //         .get(`/order/user/${localStorage.getItem("id")}?status=REJECTED`,{headers})
    //         .then(response => {
    //             setPending(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //     console.log(error.response.data)
    //         })
    // axios
    //         .get(`/order/user/${localStorage.getItem("id")}?status=COMPLETED`,{headers})
    //         .then(response => {
    //             setComplete(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //     console.log(error.response.data)
    //         })

    // axios
    // .get(`/activity/user/${localStorage.getItem("id")}`,{headers})
    // .then(response => {
    //     console.log(response.data.content)
    //     setAct(response.data.content.length)
    //     setLoading(false)
    //     })
    // .catch(error => {
    //     console.log(error)
    // })
    // },[]);
    return (
        <div>
          {loading && <Loader />}
          {!loading && 
            <div className="home-bg" style={{backgroundImage:`url(${profile})`}}>
                <div className="container-lg">
                    <div className="home-name">
                        <div>
                            <h2>Welcome,</h2>
                            {/* <h1>{list.fullname}</h1> */}
                            <h1>Sufi Saadon</h1>
                        </div>
                        <div className="home-wallet">
                            <h2>Current balance</h2>
                            {/* <h1><TopupModal /> MYR {list.amount}</h1> */}
                            <h1><TopupModal /> MYR 100.00</h1>
                        </div>
                    </div>
                    <div className="home-order" style={{display: 'flex',
    flexDirection: 'column',
    height:' 60vh',
    justifyContent: 'flex-end'}}>
                        <h3>Currently, you have </h3>
                        <div className="home-1">
                        <Link to='/user/order'>
                            <div className="home-content">
                                <h2><span>{all}</span> of total orders</h2>
                            </div>
                        </Link>
                        <Link to='/user/order'>
                            <div className="home-content">
                                <h2><span>{pending}</span> of rejected orders</h2>
                            </div>
                        </Link>
                        <Link to='/user/order'>
                            <div className="home-content">
                            <h2><span>{complete}</span> of completed orders</h2>
                            </div>
                        </Link>
                        <Link to='/user/activity'>
                            <div className="home-content">
                            <h2><span>{act}</span> of notifications</h2>
                            </div>
                        </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
          }
        </div>
    );
}