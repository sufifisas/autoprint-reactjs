import React, {useState} from 'react'
import axios from 'axios'

function Test() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')

    

    const submitHandler = e => { 
        const data = {
            username: username,
            password: password,
            email: email,
            fullname: fullname
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
          }
          console.log(data.username)
		e.preventDefault()
		axios
			.post('http://ec2-54-254-162-215.ap-southeast-1.compute.amazonaws.com:8080/user', data , {headers})
			.then(response => {
                console.log(response.data);
                if(response.status === 200){
                    alert("registration success")
                    
                } 
                })
			.catch(error => {
				console.log(error)
            })
    }
    
    return (
        <div>
            <form onSubmit={submitHandler}>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="Fullname"
                                        onChange={e => setFullname(e.target.value)}
                                    />
                                </div>
                            
                                <button type="submit" className="send">Log In</button>
                            </form>
        </div>
    );
}

export default Test;