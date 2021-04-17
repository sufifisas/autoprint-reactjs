import React, { useState ,useEffect }from 'react'
import Loader from './Loader'
import profile from '../../img/bg.png'
import axios from 'axios'
import {Link} from 'react-router-dom';

export default function Home(props) {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [all, setAll] = useState(0)
    const [pending, setPending] = useState(0)
    const [complete, setComplete] = useState(0)
    const [print, setPrint] = useState(0)
    const [product, setProduct] = useState(0)
    // useEffect(() => {
    //     const id = localStorage.getItem("vendorId")
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem("token")
    //   }
    //   axios
	// 		.get(`/vendor/${id}`,{headers})
	// 		.then(response => {
    //          console.log(response)
    //             setList(response.data,"list")
    //             setLoading(false)
    //             })
	// 		.catch(error => {
	// 			console.log(error)
    //         })

    // axios
    //         .get(`/order/vendor/${localStorage.getItem("vendorId")}?status=CONFIRM`,{headers})
    //         .then(response => {
    //             setAll(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //         window.location.reload()
    //         console.log(error.response)
    //         })
    // axios
    //         .get(`/order/vendor/${localStorage.getItem("vendorId")}?status=REJECTED`,{headers})
    //         .then(response => {
    //             setPending(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //     console.log(error.response.data)
    //         })
    // axios
    //         .get(`/order/vendor/${localStorage.getItem("vendorId")}?status=COMPLETED`,{headers})
    //         .then(response => {
    //             setComplete(response.data.content.length)
    //             setLoading(false)
    //             console.log(response.data.content)
    //             })
    //         .catch(error => {
    //     console.log(error.response.data)
    //         })
    // axios
    //         .get(`/printer/vendor/${localStorage.getItem("vendorId")}`,{headers})
    //         .then((response) => {
    //             console.log(response, "print");
    //             setPrint(response.data.content.length);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // axios
    //         .get(`/product/vendor/vendors/${localStorage.getItem("vendorId")}`)
    //         .then((response) => {
    //             console.log(response, "all");
    //             setProduct(response.data.content.length);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // },[]);
    return (
        <div className="vendor-site">
          {loading && <Loader />}
          {!loading && 
            <div  style={{backgroundImage:`url(${profile})`}}>
                <div className="container" style={{display: 'flex',
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'space-between'}}>
                    <div className="home-name">
                        <div>
                            <h2>Welcome,</h2>
                            {/* <h1>{list.vendorname}</h1> */}
                            <h1>Popular Printing</h1>
                        </div>
                    </div>
                    <div className="home-order">
                        <div className="home-right">
                            <h3>Currently, you have </h3>
                            <div className="home-1" style={{width:'100%'}}>
                            <Link to='/vendor/order'>
                                <div className="home-content">
                                    <h2><span>{all}</span> of confirmed orders</h2>
                                </div>
                            </Link>
                            <Link to='/vendor/order'>
                                <div className="home-content">
                                    <h2><span>{pending}</span> of rejected orders</h2>
                                </div>
                            </Link>
                            <Link to='/vendor/order'>
                                <div className="home-content">
                                <h2><span>{complete}</span> of completed orders</h2>
                                </div>
                            </Link>
                            <Link to='/vendor/printer'>
                                <div className="home-content">
                                <h2><span>{print}</span> of registered printers</h2>
                                </div>
                            </Link>
                            <Link to='/vendor/product'>
                                <div className="home-content">
                                <h2><span>{product}</span> of registered products</h2>
                                </div>
                            </Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
          }
        </div>
    );
}