import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { Roller } from 'react-awesome-spinners'


function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const [text,setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [init, setInit] = useState(true)

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'MYR',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
   
          setLoading(true)
          setSuccess(false)
          const order = await actions.order.capture();
          setInit(false)
          setPaidFor(true);
          console.log(order);
          const details = {
                addId: localStorage.getItem("id"),
                amount: product.price,
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
                    setText("Wallet has been successfully added")
                    setLoading(false)
                    setSuccess(true) 
                    setInit(true)
                }  
                       
            })
            .catch(error => {
                alert(error.response.data.message)
                console.log(error.response.data)
                setLoading(false) 
            })
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        {success && <p>Congrats, {text} for MYR {product.price}!</p>}
        {loading && (
            <div style={{padding:'40px'}}>
                <Roller />
            </div>
            )}
      </div>
    );
  }

  return (
    <div>
      {init && 
      <div style={{padding:'20px'}}>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <p>
        {product.description} for MYR{product.price}?
      </p>
      <div ref={paypalRef} />
    </div>}
    </div>
  );
}

function Paypal(props) {
  const product = {
    price: props.amount,
    description: 'Are you sure to add wallet',
  };

  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default Paypal;