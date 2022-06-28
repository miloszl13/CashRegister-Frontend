import React from 'react'

function BillProducts(props) {
  return (
    <li>
        <h1>Product Id: {props.productId}</h1>
        <p>Product quantity: {props.productQuantity}</p>
        <p>Product cost: {props.productCost}</p>
    </li>
  )
}

export default BillProducts