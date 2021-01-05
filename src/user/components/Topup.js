import React ,{useState} from 'react'
import axios from 'axios'

function Topup() {
    const [amount, setAmount] = useState()
    
    
    const addwallet = () => {
        const details = {
            addId: localStorage.getItem("id"),
            amount: amount,
            operation: "ADD"
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        axios
        .post('/wallet/operation', details , {headers})
        .then(response => {
            console.log(response,"post");
            if(response.status === 200){
                alert("Wallet added") 
                window.location.reload(); 
            }  
                   
        })
        .catch(error => {
            alert(error.response.data.message)
            console.log(error.response.data)
        })

    }
    window.paypal.Buttons({
        createOrder: function(data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        style: {
          color: 'black',
          shape:  'rect',
          label:  'pay',
          height: 40,
          layout: 'horizontal'
      } 
      }).render('.paypal');
      //This function displays Smart Payment Buttons on your web page.
    return (
        <div className="content" style={{marginTop: "10px"}}>
            <div className="modal-login">
                <div className="topup-choice">
                    <button onClick={() => setAmount(5)}>
                        MYR 5
                    </button>
                    <button onClick={() => setAmount(10)}>
                        MYR 10
                    </button>
                    <button onClick={() => setAmount(20)}>
                        MYR 20
                    </button>
                </div>
                <div className="paypal"></div>
                <button onClick={addwallet} type="submit" className="send" style={{backgroundColor:"#5680E9", borderRadius:"0" ,width: '70%', marginTop:'40px'}}>Topup</button>
            </div>
        </div>
    )
}

export default Topup