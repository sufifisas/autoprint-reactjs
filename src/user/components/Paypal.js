// import React from 'react'

// export default function Paypal(props) {
//     window.paypal.Buttons({
//         createOrder: function(data, actions) {
//           // This function sets up the details of the transaction, including the amount and line item details.
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: props.value
//               }
//             }]
//           });
//         },
//         onApprove: function(data, actions) {
//           // This function captures the funds from the transaction.
//           return actions.order.capture().then(function(details) {
//             // This function shows a transaction success message to your buyer.
//             alert('Transaction completed by ' + details.payer.name.given_name);
//           });
//         },
//         style: {
//           color: 'black',
//           shape:  'rect',
//           label:  'pay',
//           height: 40,
//           layout: 'horizontal'
//       } 
//       }).render('.paypal');
//       //This function displays Smart Payment Buttons on your web page.

//     return (
//         <div>
//              <div className="paypal"></div>
//         </div>
//     )
// }