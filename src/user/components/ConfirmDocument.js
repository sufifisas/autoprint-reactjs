import React from 'react'
import axios from 'axios'


function CreateDocument() {
    const OrderId = localStorage.getItem("OrderId");
    const status = localStorage.getItem("OrderStatus");
    const inv = localStorage.getItem("inv")
    const wallet = localStorage.getItem("wallet")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }

      const cancel = () => {
        axios
			.post(`/order/${OrderId}/cancel`)
			.then(response => {
                console.log(response.data);
                if(response.status === 200){
                    alert("Your order has been cancelled")
                    localStorage.setItem("OrderStatus", "CANCELLED");
                    window.location.reload(false); 
                } 
                })
			.catch(error => {
				console.log(error)
            })
      }
    
      const confirm = () => {
          if(wallet < inv){
              alert("Please topup your wallet")
              window.location.href = '/user/profile'
          }
        axios
        .post(`/order/${OrderId}/confirm?accept=true`, OrderId , {headers})
        .then(response => {
            console.log(response.data,"confirm");
            if(response.status === 200){
               alert("order confirmed")  
               localStorage.setItem("OrderStatus", response.data.status);
               window.location.reload(false); 
            } 
            })
        .catch(error => {
            console.log(error)
        })
      }

      const payment = () => {
        axios
        .post(`/order/${OrderId}/pay?amount=${inv}`, OrderId, {headers})
        .then(response => {
            console.log(response.data,"payment");
            if(response.status === 200){
               alert("payment completed")
               window.location.href = "/user/order"
            } 
            })
        .catch(error => {
            console.log(error)
        })
      }

    const reorder = () => {
        if(wallet < inv){
            alert("Please topup your wallet")
            window.location.href = '/user/profile'
        }
        axios
        .post(`/order/${OrderId}/reorder`, OrderId , {headers})
        .then(response => {
            console.log(response.data,"confirm");
            if(response.status === 200){
               alert("order has been recreated")  
               localStorage.setItem("OrderStatus", response.data.status);
               window.location.reload(false); 
            } 
            })
        .catch(error => {
            console.log(error)
        })
      }



    if(status === "CONFIRM") {
        return(
            <div>
                <button style={{width: '200px', background:'#5680E9', padding: '10px 20px', color:'#fff' ,border:'solid 1px #5680E9'}} onClick = {payment}>CHECKOUT</button>
            </div>
        )
    }
    if(status === "CANCELLED") {
        return(
            <div>
                <button style={{width: '200px', background:'#5680E9', padding: '10px 20px', color:'#fff' ,border:'solid 1px #5680E9'}} onClick = {reorder}>REORDER</button>
            </div>
        )
    }
    return (
        <div>
            <button style={{ width: '100px', background:'#fff', padding: '10px 20px', color:'#5680E9' ,border:'solid 1px #5680E9',marginRight: '20px'}} onClick = {cancel}>CANCEL</button>
            <button style={{width: '100px', background:'#5680E9', padding: '10px 20px', color:'#fff' ,border:'solid 1px #5680E9'}} onClick = {confirm}>CONFIRM</button>
        </div>
    )
    
}
export default CreateDocument