import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "./ProductModal";
import Loader from "./Loader";
import Add from './AddProductModal'

function Product() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`/product/vendor/vendors/${localStorage.getItem("vendorId")}`)
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
            <h3>Product list</h3>
          </div>
          <div>
            <div className="product-wrap">
                
                <div className="product-content">
                  {list.length > 0 ? (
                    <div>
                        <div className='add'><Add title="List of product"/></div>
                      <ul className="product-header">
                        <li className="col-7">Product name</li>
                        <li className="col-2">Status</li>
                        <li className="col-2">Price</li>
                        <li className="col-1"></li>
                      </ul>
                      {list.map((item, i) => {
                        return (
                          <ul key={i} className="product-list">
                            <li className="col-7">
                              {item.product.productName}
                            </li>
                            <li className="col-2">
                              {item.active ? "active" : "Inactive"}
                            </li>
                            <li className="col-2">MYR{item.price}</li>
                            <li className="col-1">
                              <Update
                                price={item.price}
                                name={item.product.productName}
                                id={item.id}
                                active={item.active}
                                title={item.product.productName}
                              />
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="content-center">
                        
                        <Add title="List of product"/>
                        <p>Please add product and printer to start receiving order</p>
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
