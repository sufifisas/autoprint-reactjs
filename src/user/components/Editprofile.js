import React, { Component } from 'react'
import axios from 'axios'

class Editprofile extends Component {
	constructor(props) {
        super(props)

		this.state = {
			username: '', 
            email: '',
            fullnamename: ''   
        }
        
    }

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        const id = localStorage.getItem("id");
		e.preventDefault()
		axios
			.put('https://backend-dot-autoprint-backend.et.r.appspot.com/user/'+ id , this.state , {headers})
			.then(response => {
                console.log(response);
                if(response.status === 200){
                    alert("Profile has been updated")
                    
                }        
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
        
        const { username, email, fullname  } = this.state;
        
		return (
            <div className="content" style={{marginTop: "10px"}}>
			<div className="modal-login">
                            <form onSubmit={this.submitHandler}>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="Fullname"
                                        value={fullname}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                            
                                <button type="submit" className="send" style={{backgroundColor:"#5680E9"}}>Update</button>
                            </form>
                        </div>
                        </div>
			
		)
	}
}

export default Editprofile