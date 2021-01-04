import React,{Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Editprofile from '../../user/components/Editprofile'
import UpdatePassword from '../../user/components/UpdatePassword'
import Topup from '../../user/components/Topup'
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
                'Authorization': localStorage.getItem('token')
              }
            const id = localStorage.getItem("id");
          axios.get('/user/'+ id ,{headers})
            .then(res => {
                console.log(res)
              const users = res.data;
              this.setState({ users });
            })
        }
        exit = (e) => {
            localStorage.clear()
          }; 
    render(){
        const {fullname , username , email , amount , imageUrl ,phoneNumber} = this.state.users;
        return(
            <div className = "profile container">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <div className="name">
                            <img src={imageUrl} alt="" style={{width: '160px',height: '160px', borderRadius: '50%'}}/>
                            <h2>{fullname}</h2>
                            <h4 style={{fontWeight: 400, color:'#797979'}}>Autoprint user</h4>
                        </div>
                        <Tab>Profile</Tab>
                        <Tab>Update Profile</Tab>
                        <Tab>Update Password</Tab>
                        <Tab>Add Wallet</Tab>
                        <a href="/" onClick={this.exit}><p className="logout">Logout</p></a>
                    </TabList>

                    <TabPanel>
                        <h3>My Profile</h3>
                        <div className="myprofile">
                            <div className="content">
                                <div className="subcontent">
                                    <p>Fullname</p>
                                    <p>{fullname? fullname : "n/a"}</p>
                                </div>
                                <div className="subcontent">
                                    <p>Username</p>
                                    <p>{username}</p>
                                </div>
                                <div className="subcontent">
                                    <p>Email address</p>
                                    <p>{email}</p>
                                </div>
                                <div className="subcontent">
                                    <p>Phone Number</p>
                                    <p>{phoneNumber}</p>
                                </div>
                                <div className="subcontent">
                                    <p>Wallet</p>
                                    <p>MYR {amount}</p>
                                </div>
                                {/* <div className="subcontent">
                                    <h3>Card Number</h3>
                                 
                                </div> */}
                            </div>
                            <div className="content2">

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h3>Update Profile</h3>
                        <Editprofile />
                    </TabPanel>
                    <TabPanel>
                        <h3>Update Password</h3>
                        <UpdatePassword />
                    </TabPanel>
                    <TabPanel>
                        <h3>Add Wallet</h3>
                        <Topup />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Profile;