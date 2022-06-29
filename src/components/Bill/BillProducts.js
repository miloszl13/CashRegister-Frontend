import React, { useEffect, useState ,useCallback} from 'react'

function BillProducts(props) {
  const [findedProduct,setFindedProduct]=useState({})

  const fetchProducts = useCallback( async () => {
    const response = await fetch("https://localhost:7269/api/Product");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  
    const responseData = await response.json();

    const loadedProducts = [];

    for (const key in responseData) {
      loadedProducts.push({
        id:responseData[key].product_id,
        name: responseData[key].name,
      });
    }
    
   
    const find = responseData.find((p) => p.product_id === props.productId);
    setFindedProduct(find)
  },[props.productId]);

  useEffect(()=>{
    fetchProducts();
    console.log('a')
  },[fetchProducts])
  

  return (
    <li>
        <h2>{findedProduct.name}</h2>
        <p>Id: {props.productId}</p>
        <p>quantity: {props.productQuantity}</p>
        <p>cost: {props.productCost}</p>
    </li>
  )
}

export default BillProducts