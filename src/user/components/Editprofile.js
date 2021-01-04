import React, { Component } from 'react'
import axios from 'axios'


class Editprofile extends Component {
	constructor(props) {
        super(props)

		this.state = {
			username: '', 
            email: '',
            fullname: '',
            imageBase64: '' ,
            phoneNumber: '',
            img: false 
        }
        
    }
    show = () => {
        if(this.state.img === true)
        return (
            <div>
                <img src={this.state.imageBase64} alt=""/>
            </div>
        )
    }

	changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        this.setState({ imageBase64: base64 })
        this.setState({ img: true })
        this.show()
      };
    
    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    

	submitHandler = e => {
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        const id = localStorage.getItem("id");
		e.preventDefault()
		axios
			.put('/user/'+ id , this.state , {headers})
			.then(response => {
                console.log(response);
                if(response.status === 200){
                    alert("Profile has been updated")
                    window.location.reload(false);   
                }          
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
        
        const { username, email, fullname , phoneNumber} = this.state;
        
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
                                <div>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div style= {{marginBottom: "20px"}}>
                                    <p style= {{textAlign: "left"}}>Upload Image</p>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                        this.uploadImage(e);
                                        }}
                                        style = {{borderBottom: 'none', padding: "0"}}
                                    />
                                    {this.show()}
                                </div>
                            
                                <button type="submit" className="send" style={{backgroundColor:"#5680E9", borderRadius:"0"}}>Update</button>
                            </form>
                        </div>
                        </div>
			
		)
	}
}

export default Editprofile