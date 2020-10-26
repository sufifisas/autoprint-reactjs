import React, { Component } from 'react'
import axios from 'axios'
import Popup from "reactjs-popup"

class Venregis extends Component {
	constructor(props) {
        super(props)

		this.state = {
			username: '',
            password: '', 
            email: '',
            vendorname: ''   
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
			.post('https://backend-dot-autoprint-backend.et.r.appspot.com/vendor', this.state , {headers})
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
        
        const { username, password, email, vendorname  } = this.state;
        const overlay = {
            background: "rgba(136, 96, 208, 0.8)" 
        };
        const content = {
            width: "30%",
            margin: "auto",
            border: "none",
            borderRadius:"25px",
            padding: "20px 40px",
        
        };
		return (
			
			
                <Popup overlayStyle={overlay} contentStyle={content} trigger={<button className="button"> Be a Partner </button>} modal>
                    {close => (
                    <div className="modal">
                        <span className="close" onClick={close}>
                        &times;
                        </span>
                        <div className="modal-login">
                            <h2>Be a Partner Now!</h2>
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
                                        name="vendorname"
                                        placeholder="Vendorname"
                                        value={vendorname}
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

export default Venregis