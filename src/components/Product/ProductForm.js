import React, { useRef } from "react";
import Modal from "../UI/CartModal";
import classes from './ProductForm.module.css';

const ProductForm=(props) =>{
  const IdInputRef=useRef();
  const NameInputRef=useRef();
  const CostInputRef=useRef();



  async function AddProduct(productObj) {
    const product=JSON.stringify(productObj);
    const response = await fetch('https://localhost:7269/api/Product/CreateProducts', {
      method: 'POST',
      body: product,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }
  
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const enteredId=IdInputRef.current.value;
    const enteredName=NameInputRef.current.value;
    const enteredCost=CostInputRef.current.value;

    const productObj={product_id:enteredId,name:enteredName,cost:enteredCost};    
    AddProduct(productObj);
    console.log(productObj);
  }

  return (
    <Modal>
      <form className={classes.formInput} onSubmit={onSubmitHandler}>
        <label htmlFor="productId">Product id</label>
        <input id="productId" type="number" ref={IdInputRef}></input>
        <label htmlFor="name">Product name</label>
        <input id="name" type="text" ref={NameInputRef}></input>
        <label htmlFor="cost">Product cost</label>
        <input id="cost" type="number" ref={CostInputRef}></input>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button type="submit" className={classes.button}>Create</button>
      </div>
      </form>
    </Modal>
  );
}

export default ProductForm;
