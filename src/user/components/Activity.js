import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
import Banner from './Banner'

function Activity() {
    const [loading, setLoading] = useState(false) //true
    const [list, setList] = useState([])
    // useEffect(() => {
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem("token")
    //   }
    //   axios
		// 	.get(`/activity/user/${localStorage.getItem("id")}`,{headers})
		// 	.then(response => {
    //          console.log(response.data.content)
    //             setList(response.data.content)
    //             setLoading(false)
    //             })
		// 	.catch(error => {
		// 		console.log(error)
    //         })
    // },[]);
    
    return (
        <div>
          {loading && <Loader />}
          {!loading && 
            <div>
              <Banner title="activity"/>
              <div className="container-lg">
                <div className="list-bg">
                  <ul className="list-header row pt-4 pb-3 mb-0">
                    <li className="col-2">Reference Id</li>
                    <li className="col-3">Title</li>
                    <li className="col-5">Content</li>
                    <li className="col-2">Type</li>
                  </ul>
                  {/* {list.map((item, i) => {
                    return (
                    <ul key= {i} className="orderlist row">
                      <li className="col-2">{item.referenceId}</li>
                      <li className="col-3">{item.title}</li>
                      <li className="col-5">{item.content}</li>
                      <li className="col-2">{item.type}</li>
                      </ul>
                    )
                  })} */}
                 
                    <ul className="orderlist row">
                      <li className="col-2">R-ABCD1234</li>
                      <li className="col-3">Welcome to AUTOPRINT!</li>
                      <li className="col-5">Hello there. Welcome to AUTOPRINT! Feel free to contact us if any problem occurs :)</li>
                      <li className="col-2">NOTIFICATION</li>
                    </ul>
                    <ul className="orderlist row">
                      <li className="col-2">R-ABCD1234</li>
                      <li className="col-3">Welcome to AUTOPRINT!</li>
                      <li className="col-5">Hello there. Welcome to AUTOPRINT! Feel free to contact us if any problem occurs :)</li>
                      <li className="col-2">NOTIFICATION</li>
                    </ul>
                    <ul className="orderlist row">
                      <li className="col-2">R-ABCD1234</li>
                      <li className="col-3">Welcome to AUTOPRINT!</li>
                      <li className="col-5">Hello there. Welcome to AUTOPRINT! Feel free to contact us if any problem occurs :)</li>
                      <li className="col-2">NOTIFICATION</li>
                    </ul>
                    

                </div>
              </div>
            </div>
          }
          
        </div>
    )
}

export default Activity;
