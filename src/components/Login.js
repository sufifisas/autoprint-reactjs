import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import {Redirect} from 'react-router-dom'

class Login extends Component {
	
    state = {
        username: '',
        password: '', 
        loggedIn: false,
        userIn :false 
    }

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        const {username , password } = this.state
        
        
		e.preventDefault()
		axios
			.post('http://ec2-54-254-162-215.ap-southeast-1.compute.amazonaws.com:8080/login', {username , password })
			.then(response => {
                console.log(response.data);
                if(response.status === 200 && response.data.type === "USER"){
                    localStorage.setItem("id",response.data.id)
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("type",response.data.type)
                    this.setState({
                        loggedIn: true,
                        userIn: true
                    })
                }
                
                else if(response.status === 200 && response.data.type === "VENDOR"){
                    localStorage.setItem("id",response.data.id)
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("type",response.data.type)
                    this.setState({
                        loggedIn: true,
                        userIn: false
                    })
                }
                
			})
			.catch(error => {
				console.log(error)
            })
	}

	render() {
        if(this.state.loggedIn && this.state.userIn){
            return <Redirect to="/user" />
        }
        else if(this.state.loggedIn && !this.state.userIn){
            return <Redirect to="/vendor" />
        }
        
        
        const { username, password } = this.state;
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
			
			
                <Popup overlayStyle={overlay} contentStyle={content} trigger={<button className="button"> Login </button>} modal>
                    {close => (
                    <div className="modal">
                        <span className="close" onClick={close}>
                        &times;
                        </span>
                        <div className="modal-login">
                            <h2>Welcome Back!</h2>
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
                            
                                <button type="submit" className="send">Log In</button>
                            </form>
                        </div>
                    </div>
                    )}
                </Popup>
		)
	}
}

export default Login
