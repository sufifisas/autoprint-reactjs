import React,{Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserIcon from '../../img/user.png'
import Editprofile from '../../user/components/Editprofile'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
               this.state = {
                users: {}
              }
            }
        componentDidMount() {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
              }
            const id = localStorage.getItem("id");
          axios.get('http://ec2-54-254-162-215.ap-southeast-1.compute.amazonaws.com:8080/user/'+ id ,{headers})
            .then(res => {
                console.log(res)
              const users = res.data;
              this.setState({ users });
            })
        } 
    render(){
        const {fullname , username , email} = this.state.users;
        return(
            <div className = "profile container">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <div className="name">
                            <img src={UserIcon} alt=""/>
                            <h2>{fullname}</h2>
                            <h3>Autoprint user</h3>
                        </div>
                        <Tab>Profile</Tab>
                        <Tab>Update Profile</Tab>
                        <Tab>Wallet</Tab>
                        <Tab>History</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>My Profile</h2>
                        <div className="myprofile">
                            <div className="content">
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
                                </div>
                                <div className="subcontent">
                                    <h3>Card Number</h3>
                                 
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
                        <h2>Wallet</h2>
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