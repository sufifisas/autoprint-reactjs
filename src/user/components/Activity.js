import React,{Component} from 'react'
import axios from 'axios'

class Activity extends Component {
    constructor(props) {
        super(props)
               this.state = {
                users: {}
              }
            }
        componentDidMount() {
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            const id = localStorage.getItem("id");
          axios.get('https://backend-dot-autoprint-backend.et.r.appspot.com/activity/user/'+ id ,{headers})
            
            .then(res => {
                console.log(res.data.content[0]);
                const users = res.data.content[0];
                this.setState({ users });
            })  
        } 
    render(){
        const {title,content} = this.state.users;
        return(
            <div className = "profile container">
                <div className="activity-list">
                    <h1>{title}</h1>
                    <h2>{content}</h2>
                </div>
            </div>
        );
    }
}

export default Activity;