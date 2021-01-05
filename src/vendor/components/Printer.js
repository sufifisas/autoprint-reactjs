import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Printer() {
    const [show, setShow] = useState(false)
    const [printer, setPrinter] = useState('')
    const vendorId = localStorage.getItem("vendorId")
    const [list, setList] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
        axios
        .get(`/printer/vendor/${localStorage.getItem("vendorId")}`,{headers})
        .then(response => {
            console.log(response);
            setList(response.data.content)
        })
        .catch(error => {
            console.log(error);
                })
    },[])

    const add = e => {
        e.preventDefault()
        const body = {
            vendorId: vendorId,
            name: printer
        }
        axios
        .post(`/printer`, body , {headers} )
        .then(response => {
            console.log(response,"add");
        })
        .catch(error => {
            console.log(error);
                })
    }

    return(
        <div>
            <button onClick={() => setShow(!show)}>Add Printer</button>
            <div>
                <form onSubmit={add}>
                    <input type="text" placeholder="Printer's name" onChange={(e) => {setPrinter(e.target.value)}} />
                    <button>Confirm</button>
                </form>
            </div>
            <div>
                {list.map((item, i) => {
                    return(
                        <ul key= {i}>
                            <li>{item.id}</li>
                            <li>{item.name}</li>
                            <li>{item.status}</li>
                        </ul>
                    )
                })}
            </div>
        </div>
    );
}

export default Printer;