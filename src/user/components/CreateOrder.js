import React, { useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

function Order() {
    const [address, setAddress] = useState('');
    const [order, setOrder] = useState(false)

    const submitHandler = e => {
        e.preventDefault()
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GMAP_KEY}`)
        .then(response => response.json())
        .then(data => {
            const coordinates = {
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng,
                userId: Number(localStorage.getItem("id"))
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
            axios
                .post('/order', coordinates, {headers})
                .then(response => {
                    console.log(response);
                    if(response.status === 200){
                        alert("Location updated")
                        localStorage.setItem("OrderId",response.data.id)
                        localStorage.setItem("OrderDate", response.data.dateCreated)
                        localStorage.setItem("OrderStatus", response.data.status)
                        setOrder(true)   
                    }         
                })
                .catch(error => {
                    console.log(error)
                })
        })
        
        .catch(error => alert(error))

        
	}

    // const geocode = (e) => {
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setLat(data.results[0].geometry.location.lat)
    //         setLng(data.results[0].geometry.location.lng)

    //     })
        
    //     .catch(error => alert(error))
    // }
    if(order === true){
        return <Redirect to="/user/order/document" />
    }

    return (
        <div>
            <h1 style={{fontWeight:'300'}}>Any document can be printed, anywhere</h1>
            <div>
                <form onSubmit={submitHandler} style={{padding:'20px', display: 'inline-block', boxShadow:'2px 2px 10px #79797979', marginBottom:'20px', marginTop:'20px'}}>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter your full address before create order"
                        onChange={e => setAddress(e.target.value)}
                        style = {{width: '500px', height: '60px', padding:'20px', border: '1px solid #5680E9'}}
                    />
                    <button type="submit" style={{width:'100px',height: '60px', marginLeft:'20px', border: '1px solid #5680E9' ,background: '#5680E9', color: '#fff'}}>Enter</button>
                </form>
            </div>
        </div>
    );
}

export default Order;