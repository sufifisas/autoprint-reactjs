import React,{Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserIcon from '../../img/user.png'
import Editprofile from '../../vendor/components/Editprofile'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
               this.state = {
                vendors: {}
              }
            }
        componentDidMount() {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
              }
            const id = localStorage.getItem("id");
          axios.get('https://backend-dot-autoprint-backend.et.r.appspot.com/vendor/'+ id ,{headers})
            .then(res => {
              const vendors = res.data;
              this.setState({ vendors });
            })
        } 
    render(){
        const {vendorname , username , email} = this.state.vendors;
        return(
            <div className = "profile">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <div className="name">
                            <img src={UserIcon} alt=""/>
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
                                    <h3>Username</h3>
                                    <h3>{username}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Email address</h3>
                                    <h3>{email}</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Mobile Number</h3>
                                    <h3>n/a</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Card Number</h3>
                                    <h3>n/a</h3>
                                </div>
                                <div className="subcontent">
                                    <h3>Address</h3>
                                    <h3>n/a</h3>
                                </div>
                            </div>
                            <div className="content2">

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