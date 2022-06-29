import React, { useRef } from "react";
import Modal from "../UI/Modal";
import classes from './ProductForm.module.css';
import Notification from "../UI/Notification";
import { uiActions } from "../../store/uiSlice";
import {useSelector,useDispatch} from 'react-redux'
import { productActions } from "../../store/productSlice";

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}


const ProductForm=(props) =>{
  const IdInputRef=useRef();
  const NameInputRef=useRef();
  const CostInputRef=useRef();
   
  const notification=useSelector(state=>state.ui.notification);
  const dispatch=useDispatch()

  async function AddProduct(productObj) {
    dispatch(
      uiActions.showNotification({
        component:'ProductForm',
        status: 'pending',
        title: 'Sending...',
        message: 'Adding product!',
      })
    );
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
    wait(500)
    dispatch(uiActions.setNotificationToNull())
    dispatch(productActions.addProduct(productObj))
    
  }
  
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const enteredId=IdInputRef.current.value;
    const enteredName=NameInputRef.current.value;
    const enteredCost=CostInputRef.current.value;

    const productObj={product_id:enteredId,name:enteredName,cost:enteredCost};  

    AddProduct(productObj).catch(error=>{
      dispatch(
        uiActions.showNotification({
          component:'ProductForm',
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    })
     
   
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
      {notification && notification.component==='ProductForm' &&
      <Notification
      status={notification.status}
      title={notification.title}
      message={notification.message}
    />
    }
    </Modal>
  );
}

export default ProductForm;
