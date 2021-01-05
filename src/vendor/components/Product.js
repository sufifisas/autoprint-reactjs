import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Product() {
    const [product, setProduct] = useState([])
    const [list, setList] = useState([])
    const [price, setPrice] = useState(0)
    const vendorId = localStorage.getItem("vendorId")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }

    useEffect(() => {
        axios
        .get(`/product/all`)
        .then(response => {
            console.log(response,"product");
            setProduct(response.data.content)
        })
        .catch(error => {
            console.log(error);
                })

        axios
        .get(`/product/vendor/vendors/${localStorage.getItem("vendorId")}`)
        .then(response => {
            console.log(response,"all");
            setList(response.data.content)
        })
        .catch(error => {
            console.log(error);
                })        
    },[])

    const add = (item) => {
        
        const body = {
                price: price,
                productId: item,
                vendorId: vendorId
        }
        console.log(item)
        axios
        .post(`/product/vendor`, body, {headers})
        .then(response => {
            console.log(response,"added");
            alert(`Product ${item} has been added`)
            window.location.reload()
        })
        .catch(error => {
            alert(error.response.data.message)
            console.log(error.response.data)
        })
    }

    const update = (id, status) => {
        
        const body = {
                price: price,
                active: status,
        }
        axios
        .put(`/product/vendor/${id}`, body, {headers})
        .then(response => {
            console.log(response,"updated");
            alert(`Product ${id} has been updated`)
            window.location.reload()
        })
        .catch(error => {
            alert(error.response.data.message)
            console.log(error.response.data)
        })
    }
    
    return(
        <div>
            Available Product
            {product.map((item, i) => {
                    return(
                        <ul key= {i}>
                            <li>{item.id}</li>
                            <li>{item.productName}</li>
                            <input type="text" onChange={e => setPrice(e.target.value)}/>
                            <button onClick={() => add(item.id)}>Add</button>
                        </ul>
                    )
                })}

            <div>
                Your Product
                {list.map((item, i) => {
                    return(
                        <ul key= {i}>
                            <li>{item.product.productName}</li>
                            <li>{item.price}</li>
                            <li>{item.active?'active':'Inactive'}</li>
                            <input type="text" onChange={e => setPrice(e.target.value)}/>
                            <button onClick={() => update(item.id, item.active)}>Update</button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default Product;
