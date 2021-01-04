import React,{Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Editprofile from './Editprofile'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
               this.state = {
                vendors: {},
                user:{}
              }
            }
        componentDidMount() {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
              }
            const id = localStorage.getItem("vendorId");
            axios.get('/vendor/'+ id , {headers})
                .then(res => {
                    console.log(res, "user")
                const vendors = res.data;
                const user = res.data.user
                this.setState({ vendors });
                this.setState({ user })
                })
        } 
    render(){
        const {vendorname, longitude, latitude} = this.state.vendors;
        const {username, phoneNumber, email, fullname ,imageUrl } = this.state.user;
        return(
            <div className = "profile">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <div className="name">
                            <img style={{borderRadius: '50%', height: '150px', width: '150px'}}src={imageUrl} alt=""/>
                            <h2>{vendorname}</h2>
                            <h3>Autoprint vendor</h3>
                        </div>
                        <Tab>Profile</Tab>
                        <Tab>Update Profile</Tab>
                        <Tab>History</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>My Profile</h2>
                        <div className="myprofile">
                            <div className="content">
                                <div className="subcontent">
                                    <h3>Vendor name</h3>
                                    <h3>{vendorname? vendorname : "n/a"}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Fullname</h3>
                                    <h3>{fullname? fullname : "n/a"}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Username</h3>
                                    <h3>{username}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Email address</h3>
                                    <h3>{email}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Mobile Number</h3>
                                    <h3>{phoneNumber}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Coordinate</h3>
                                    <h3>( {latitude} , {longitude} )</h3>
                                </div>
                            </div>
                            
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Update Profile</h2>
                        <Editprofile />
                    </TabPanel>
                    <TabPanel>
                        <h2>History</h2>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Profile;