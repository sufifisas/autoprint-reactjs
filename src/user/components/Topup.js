import React ,{useState} from 'react'
import axios from 'axios'
import Paypal from './Paypal'

function Topup() {
    const [amount, setAmount] = useState()
    const [show, setShow] = useState(true)
    const [value ,setValue] = useState(null)
    
    
    const addwallet = () => {
        // const details = {
        //     addId: localStorage.getItem("id"),
        //     amount: amount,
        //     operation: "ADD"
        // }
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': localStorage.getItem('token')
        //   }
        // axios
        // .post('/wallet/operation', details , {headers})
        // .then(response => {
        //     console.log(response,"post");
        //     if(response.status === 200){
        //         alert("Wallet added") 
        //         window.location.reload(); 
        //     }  
                   
        // })
        // .catch(error => {
        //     alert(error.response.data.message)
        //     console.log(error.response.data)
        // })
        if(value===null) {
          setShow(true)
          
        }
        else {
          setShow(false)
          setAmount(value)
        }
 
      }
    
    return (
        <div className="content" style={{marginTop: "10px"}}>
            <div className="modal-login">
                
                <div className="topup-choice">
                    <button onClick={() => setValue(5)}>
                        MYR 5
                    </button>
                    <button onClick={() => setValue(10)}>
                        MYR 10
                    </button>
                    <button onClick={() => setValue(20)}>
                        MYR 20
                    </button>
                </div>
                {show ? <button onClick={addwallet} type="submit" className="send" style={{backgroundColor:"#5680E9", borderRadius:"0" ,width: '70%', marginTop:'40px'}}>Confirm</button>
                :<Paypal amount = {amount}/>}
            </div>
        </div>
    )
}

export default Topup