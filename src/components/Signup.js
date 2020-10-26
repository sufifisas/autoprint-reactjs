import React, { Component } from 'react'
import axios from 'axios'
import Popup from "reactjs-popup"

class Signup extends Component {
	constructor(props) {
        super(props)

		this.state = {
			username: '',
            password: '', 
            email: '',
            fullname: ''   
        }
        
    }

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
          }
		e.preventDefault()
		axios
			.post('http://ec2-54-254-162-215.ap-southeast-1.compute.amazonaws.com:8080/user', this.state , {headers})
			.then(response => {
                console.log(response);
                if(response.status === 200){
                    alert("registration success")
                    
                }        
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
        
        const { username, password, email, fullname  } = this.state;
        const overlay = {
            background: "rgba(132, 206, 235, 0.8)" 
        };
        const content = {
            width: "30%",
            margin: "auto",
            border: "none",
            borderRadius:"25px",
            padding: "20px 40px",
        
        };
		return (
			
			
                <Popup overlayStyle={overlay} contentStyle={content} trigger={<button className="button"> Get Started </button>} modal>
                    {close => (
                    <div className="modal">
                        <span className="close" onClick={close}>
                        &times;
                        </span>
                        <div className="modal-login">
                            <h2>Register Now!</h2>
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
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
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
                            
                                <button type="submit" className="send">Sign Up</button>
                            </form>
                        </div>
                    </div>
                    )}
                </Popup>
		)
	}
}

export default Signup