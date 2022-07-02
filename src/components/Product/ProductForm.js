import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from './ProductForm.module.css';
import Notification from "../UI/Notification";
import {useDispatch} from 'react-redux'
import { productActions } from "../../store/productSlice";
import useInput from "../../hooks/use-input";


//validation form input methods
const isNotEmpty=(value)=>value.trim() !== '';
const isNotLessThanOrEqualToZero = (value)=>  value > 0


const ProductForm=(props) =>{
  
  const [notificationObj,setNotificationObj]=useState({component:'',status:'',title:'',message:''});
  const dispatch=useDispatch()

  const {
    value:productIdValue,
    isValid:productIdIsValid,
    hasError:productIdHasErrors,
    valueChangeHandler:productIdChangeHandler,
    inputBlurHandler:productIdBlurHandler,
    reset:resetProductId
  }=useInput(isNotEmpty);
  const {
    value: productNameValue,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    valueChangeHandler: productNameChangeHandler,
    inputBlurHandler: productNameBlurHandler,
    reset: resetProductName,
  } = useInput(isNotEmpty);
  const {
    value:productCostValue,
    isValid:productCostIsValid,
    hasError:productCostHasErrors,
    valueChangeHandler:productCostChangeHandler,
    inputBlurHandler:productCostBlurHandler,
    reset:resetProductCost
  }=useInput(isNotLessThanOrEqualToZero);

  let formIsValid=false;
  if(productIdIsValid && productNameIsValid && productCostIsValid){
    formIsValid=true;
  }
  
 
  //
  async function AddProduct(productObj) {
    setNotificationObj({component:'ProductForm',status:'pending',title:'Sending',message:'Sending...'})
    const product=JSON.stringify(productObj);
    const response = await fetch('https://localhost:7269/api/Product/CreateProducts', {
      method: 'POST',
      body: product,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data=await response.json()
    if (!response.ok) {
      throw new Error(data.errorMessage);
    }
    dispatch(productActions.addProduct(productObj))
    setNotificationObj({component:'ProductForm',status:'success',title:'Success!',message:'Successfuly created product'})
  }

  
  const onSubmitHandler=(event)=>{
    event.preventDefault()
    if (!formIsValid)  {
      return;
    }
    const productObj={product_id:productIdValue,name:productNameValue,cost:productCostValue};  
    AddProduct(productObj).catch(error=>{
      setNotificationObj({component:'ProductForm',status:'error',title:'Error!',message:error.message})
    })
    //reset inputs to initial
    resetProductId()
    resetProductName()
    resetProductCost()
  }
  //clear notification
  const clearNotificationHandler=()=>{
    setNotificationObj({component:'',status:'',title:'',message:''})
  }

  
  //
  const productIdClasses = productIdHasErrors ? 'form-control invalid' : 'form-control';
  const productNameClasses = productNameHasError ? 'form-control invalid' : 'form-control';
  const productCostClasses = productCostHasErrors ? 'form-control invalid' : 'form-control';
  //
  return (
    <Modal>
    
     <form onSubmit={onSubmitHandler} onFocus={clearNotificationHandler}>
      <div>
        <div className={productIdClasses}>
          <label htmlFor='id'>Product id : </label>
          <input
            type='text'
            id='id'
            value={productIdValue}
            onChange={productIdChangeHandler}
            onBlur={productIdBlurHandler}
          />
          {productIdHasErrors && <p className="error-text">Product id cant be 0 or less than 0.</p>}
        </div>
        <div className={productNameClasses}>
          <label htmlFor='name'>Product Name : </label>
          <input
            type='text'
            id='name'
            value={productNameValue}
            onChange={productNameChangeHandler}
            onBlur={productNameBlurHandler}
          />
          {productNameHasError && <p className="error-text">Please enter a product name.</p>}
        </div>
      
      <div className={productCostClasses}>
        <label htmlFor='cost'>Product cost : </label>
        <input
          type='number'
          id='cost'
          value={productCostValue}
          onChange={productCostChangeHandler}
          onBlur={productCostBlurHandler}
        />
        {productCostHasErrors && <p className="error-text">Product cost cant be 0 or less than 0.</p>}
      </div>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button disabled={!formIsValid} className={classes.button}>Create</button>
      </div>
    </form>



      <br/>
      {notificationObj.component !== '' && 
      <Notification
      status={notificationObj.status}
      title={notificationObj.title}
      message={notificationObj.message}
    />
    }
    </Modal>
  );
}

export default ProductForm;
