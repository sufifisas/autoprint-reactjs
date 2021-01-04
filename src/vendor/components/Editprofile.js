import React, { Component } from 'react'
import axios from 'axios'

class Editprofile extends Component {
	constructor(props) {
        super(props)

		this.state = {
			username: '', 
            email: '',
            vendorname: '',
            fullname: '',
            imageBase64: '',
            longitude: '',
            latitude: '',
            phoneNumber: '',
            address: ''  
        }
        
    }

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        
        const id = localStorage.getItem("vendorId");
        e.preventDefault()
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${process.env.REACT_APP_GMAP_KEY}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
            })
            console.log(data.results)
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
            axios
                .put('/vendor/'+ id , this.state , {headers})
                .then(response => {
                    console.log(response);
                    if(response.status === 200){
                        alert("Profile has been updated")
                        window.location.reload()
                    }        
                })
                .catch(error => {
                    alert(error.response.data.message)
                    console.log(error.response.data)
                })
        })
        .catch(error => alert(error))
    }
    show = () => {
        if(this.state.img === true)
        return (
            <div>
                <img style = {{marginBottom: '20px'}}src={this.state.imageBase64} alt=""/>
            </div>
        )
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

	render() {
        
        const { username, email, vendorname, fullname, phoneNumber, address  } = this.state;
        
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
                                        name="vendorname"
                                        placeholder="Vendor name"
                                        value={vendorname}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Mobile number"
                                        value={phoneNumber}
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
                                        name="address"
                                        placeholder="Address"
                                        value={address}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                        this.uploadImage(e);
                                        }}
                                        style = {{borderBottom: '20px', padding: "0"}}
                                    />
                                    {this.show()}
                                </div>  
                            
                                <button type="submit" className="send">Update</button>
                            </form>
                        </div>
                        </div>
			
		)
	}
}

export default Editprofile