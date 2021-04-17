import React,{useState, useEffect} from 'react'
import Editprofile from '../../user/components/Editprofile'
import UpdatePassword from '../../user/components/UpdatePassword'
import Topup from '../../user/components/Topup'
import axios from 'axios'
import Banner from './Banner'
import userimg from '../../img/user.jpg'
import profile from '../../img/banner.jpg'
import Loader from './Loader'
import TopupModal from './TopupModal'


function Profile() {
        const [loading, setLoading] = useState(false); //true
        // const [user, setUser] = useState([]);

        // useEffect(() => {
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': localStorage.getItem('token')
        //       }
        //     const id = localStorage.getItem("id");
        //     axios.get('/user/'+ id ,{headers})
        //         .then(res => {
        //             setUser(res.data)
        //             setLoading(false)
        //         })
        //         .catch(error => {
        //             console.log(error.response.data)
        //                 })
        // },[])


        const exit = () => {
            localStorage.clear()
        }; 

        return(
            <div>
                 {loading && <Loader />}
                 {!loading && 
                    <div>
                        <Banner title=""/>
                        <div className = "profile-center">
                            <div className="profile">
                                <div className="profile-main text-center" style={{backgroundImage:`url(${profile})`}}>
                                    <div className="profile-opac">
                                        <h2>PROFILE</h2>
                                        {/* <img src={user.imageUrl?user.imageUrl:userimg} alt="" style={{width: '140px',height: '140px', borderRadius: '50%' }}/> */}
                                        <img src={userimg} alt="" style={{width: '140px',height: '140px', borderRadius: '50%' }}/>
                                        <div className="profile-avatar">
                                            {/* <h3>{user.fullname}</h3> */}
                                            <h3>Sufi Saadon</h3>
                                            <p>Autoprint User</p>
                                        </div>
                                        <UpdatePassword title="change password"/>
                                        <Editprofile title="edit profile"/>
                                        <div className="profile-content row text-left">
                                            <ul className="profile-list col-8">
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Username</li>
                                                        {/* <li className="col-9">{user.username}</li> */}
                                                        <li className="col-9">sufi98</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Email address</li>
                                                        {/* <li className="col-9">{user.email}</li> */}
                                                        <li className="col-9">sufi@yopmail.com</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Phone number</li>
                                                        {/* <li className="col-9">{user.phoneNumber}</li> */}
                                                        <li className="col-9">0123456789</li>
                                                    </ul>
                                                </li>
                                                <li className="each">
                                                    <ul className="row">
                                                        <li className="col-3">Current balance</li>
                                                        {/* <li className="col-9"><div className="wallet-text"><span>MYR {Number.parseFloat(user.amount).toFixed(2)}</span><TopupModal /></div></li> */}
                                                        <li className="col-9"><div className="wallet-text"><span>MYR 100.00</span><TopupModal /></div></li>
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