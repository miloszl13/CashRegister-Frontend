import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from './ProductForm.module.css';
import Notification from "../UI/Notification";
import {useDispatch,useSelector} from 'react-redux'
import { productActions } from "../../store/productSlice";
import useInput from "../../hooks/use-input";


//validation form input methods
const isNotEmpty=(value)=>value.trim() !== '';
const isNotLessThanOrEqualToZero = (value)=>  value > 0


const ProductForm=(props) =>{
  const selectedProductId=useSelector(state=>state.products.selectedProductId)
  const [notificationObj,setNotificationObj]=useState({component:'',status:'',title:'',message:''});
  const dispatch=useDispatch()

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
  if(productNameIsValid && productCostIsValid){
    formIsValid=true;
  }
  
 
  //
  async function UpdateProduct(productObj) {
    const token=localStorage.getItem('token')
    setNotificationObj({component:'UpdateProductForm',status:'pending',title:'Sending',message:'Sending...'})
    const product=JSON.stringify(productObj);
    const response = await fetch('https://localhost:7269/api/Product/UpdateProduct', {
      method: 'PUT',
      body: product,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
    const data=await response.json()
    if (!response.ok) {
      throw new Error(data.errorMessage);
    }
    dispatch(productActions.deleteProduct(productObj.product_id))
    dispatch(productActions.addProduct(productObj))
    
    setNotificationObj({component:'UpdateProductForm',status:'success',title:'Success!',message:'Product is successfuly updated'})
  }

  
  const onSubmitHandler=(event)=>{
    event.preventDefault()
    if (!formIsValid)  {
      return;
    }
    const productObj={product_id:selectedProductId,name:productNameValue,cost:productCostValue};  
    console.log(productObj)
    UpdateProduct(productObj).catch(error=>{
      setNotificationObj({component:'UpdateProductForm',status:'error',title:'Error!',message:error.message})
    })
    //reset inputs to initial
    resetProductName()
    resetProductCost()
    dispatch(productActions.resetSelectedProductId())
  }
  //clear notification
  const clearNotificationHandler=()=>{
    setNotificationObj({component:'',status:'',title:'',message:''})
  }

  
  //
  const productNameClasses = productNameHasError ? 'form-control invalid' : 'form-control';
  const productCostClasses = productCostHasErrors ? 'form-control invalid' : 'form-control';
  //
  return (
    <Modal>
    
     <form onSubmit={onSubmitHandler} onFocus={clearNotificationHandler}>
      <div>
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
        <button disabled={!formIsValid} className={classes.button}>Update</button>
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
