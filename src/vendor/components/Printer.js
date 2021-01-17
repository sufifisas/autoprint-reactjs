import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "./PrinterModal";
import Loader from "./Loader";
import Add from './AddPrinterModal'

function Product() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    axios
      .get(`/printer/vendor/${localStorage.getItem("vendorId")}`,{headers})
      .then((response) => {
        console.log(response, "all");
        setList(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="vendor-site">
      {loading && <Loader />}
      {!loading && (
        <div>
          <div className="vendor-title">
            <h3>Printer list</h3>
          </div>
          <div>
            <div className="product-wrap">
                
                <div className="product-content">
                  {list.length > 0 ? (
                    <div>
                        <div className='add'><Add title="Add Printer"/></div>
                      <ul className="product-header">
                        <li className="col-1">No.</li>
                        <li className="col-7">Product name</li>
                        <li className="col-2">Status</li>
                        <li className="col-1"></li>
                      </ul>
                      {list.map((item, i) => {
                        return (
                          <ul key={i} className="product-list">
                            <li className="col-1">{i+1}</li>
                            <li className="col-7">
                              {item.name}
                            </li>
                            <li className="col-2">
                              {item.status}
                            </li>
                            <li className="col-1">
                              <Update
                                active={item.status}
                                title={item.name}
                                id={item.id}
                              />
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="content-center">
                        
                        <Add title="Add Printer"/>
                        <p>Please add printer and product to start receiving order</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
