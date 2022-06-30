import React, { useRef,useState } from "react";
import Modal from "../UI/Modal";
import classes from './BillForm.module.css'
import {useDispatch,useSelector} from 'react-redux'
import { billActions } from "../../store/billSlice";
import { uiActions } from "../../store/uiSlice";
import Notification from "../UI/Notification";
import { billsHistoryActions } from "../../store/billHistorySlice";



function BillForm(props) {
  const dispatch=useDispatch();
  const notification=useSelector(state=>state.ui.notification)
  const billInputRef=useRef();

  async function CreateBill(billNumber) {
    dispatch(
      uiActions.showNotification({
        component:'BillForm',
        status: 'pending',
        title: 'Sending...',
        message: 'Creating bill!',
      })
    );
    const bill=JSON.stringify({bill_number:billNumber,total_cost: 0,credit_card:null,bill_Products:[]});
    const response = await fetch('https://localhost:7269/api/Bill/CreateNewBill', {
      method: 'POST',
      body: bill,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
       
      throw new Error(data.errorMessage);
      
    }
    dispatch(billActions.createBill(billNumber));
    dispatch(billsHistoryActions.addBill(bill))
    dispatch(
      uiActions.showNotification({
        component:'BillForm',
        status: "success",
          title: "Success!",
          message: "Bill is successfully created",
      })
    );
    
  }
  


  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const enteredBill=billInputRef.current.value;
    
    CreateBill(enteredBill).catch(error=>{
      dispatch(
        uiActions.showNotification({
          component:'BillForm',
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    })    
  }
  
    
  
  return (
    <Modal>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="billNumber">Bill number : </label>
        <input id="billNumber" type="text" ref={billInputRef}></input>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button type="submit" className={classes.button}>Create</button>
      </div>
      </form>
      {notification && notification.component==='BillForm' && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />}
    </Modal>
  );
}

export default BillForm;
