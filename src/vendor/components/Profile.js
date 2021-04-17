import React,{useState, useEffect} from 'react'
import Editprofile from './Editprofile'
import UpdatePassword from './UpdatePassword'
import axios from 'axios'
import userimg from '../../img/user.jpg'
import profile from '../../img/banner.jpg'
import Loader from './Loader'
import Geocode from "react-geocode";



function Profile() {
        const [loading, setLoading] = useState(false)
        const [user, setUser] = useState([]);
        const [vendor, setVendor] = useState([]);
        const [add, setAdd] = useState('')

        Geocode.setApiKey("AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE");

        // useEffect(() => {
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': localStorage.getItem('token')
        //       }
        //     const id = localStorage.getItem("vendorId");
        //     axios.get('/vendor/'+ id ,{headers})
        //         .then(res => {
        //             setUser(res.data.user)
        //             setVendor(res.data)
        //             setLoading(false)
        //             console.log(res.data)
        //             Geocode.fromLatLng(res.data.latitude, res.data.longitude).then(
        //                 response => {
        //                     setAdd(response.results[0].formatted_address)
        //                     console.log(response.results)
        //                 },
        //                 error => {
        //                     console.error(error);
        //                 }
        //                 );
        //         })
        //         .catch(error => {
        //             console.log(error.response.data)
        //                 })
            
           
        // },[])
            const exit = () => {
                localStorage.clear()
            }; 

        return(
            <div className="vendor-site">
                 {loading && <Loader />}
                 {!loading && 
                    <div>
                        <div className = "profile-center">
                            <div className="profile">
                                <div className="profile-main text-center" >
                                    <div className="profile-opac">
                                        <h2>PROFILE</h2>
                                        <img src={user.imageUrl?user.imageUrl:userimg} alt="" style={{width: '140px',height: '140px', borderRadius: '50%' }}/>
                                        <div className="profile-avatar">
                                            {/* <h3>{user.fullname}</h3> */}
                                            <h3>John Doe</h3>
                                            <p>Autoprint Vendor</p>
                                        </div>
                                        <UpdatePassword title="change password"/>
                                        <Editprofile title="edit profile"/>
                                        <div className="profile-content row text-left">
                                            <ul className="profile-list col-9">
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Vendor name</li>
                                                        {/* <li className="col-9">{vendor.vendorname}</li> */}
                                                        <li className="col-9">Popular Printing</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Username</li>
                                                        {/* <li className="col-9">{user.username}</li> */}
                                                        <li className="col-9">popular</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Email address</li>
                                                        {/* <li className="col-9">{user.email}</li> */}
                                                        <li className="col-9">popular@yopmail.com</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Full name</li>
                                                        {/* <li className="col-9">{user.fullname}</li> */}
                                                        <li className="col-9">John Doe</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Phone number</li>
                                                        {/* <li className="col-9">{user.phoneNumber ? user.phoneNumber : 'None'}</li> */}
                                                        <li className="col-9">012345678</li>
                                                    </ul>
                                                </li>
                                                
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Address</li>
                                                        {/* <li className="col-9">{add}</li> */}
                                                        <li className="col-9">Kuala Lupur, Malaysia</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Account status</li>
                                                        <li className="col-9">Active</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
            </div>
        );
    }

export default Profile;