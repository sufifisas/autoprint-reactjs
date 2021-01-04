import React,{useState} from 'react'
import axios from 'axios'

function UpdatePassword() {
    const [currpass, setCurrpass] = useState('');
    const [newpass, setNewpass] = useState('')

    const submitHandler = e => {
        const details = {
            currentPassword : currpass,
            newPassword : newpass,
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
		e.preventDefault()
		axios
			.put('/user/update/password', details, {headers})
			.then(response => {
                console.log(response,"post");
                if(response.status === 200){
                    alert("password updated") 
                    window.location.reload(false);   
                }  
                window.location.reload(false);        
			})
			.catch(error => {
				console.log(error)
            })
	}
    
    return (
        <div className="content" style={{marginTop: "10px"}}>
            <div className="modal-login">
                <form onSubmit={submitHandler}>
                    <div>
                        <input
                            type="password"
                            name="current"
                            placeholder="Current Password"
                            onChange={e => setCurrpass(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            name="new"
                            placeholder="New Password"
                            onChange={e => setNewpass(e.target.value)}
                        />
                    </div>

                
                    <button type="submit" className="send" style={{backgroundColor:"#5680E9", borderRadius:"0"}}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword