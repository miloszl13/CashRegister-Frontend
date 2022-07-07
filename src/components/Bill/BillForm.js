import React from "react";
import Modal from "../UI/Modal";
import classes from './BillForm.module.css'
import {useDispatch,useSelector} from 'react-redux'
import { billActions } from "../../store/billSlice";
import { uiActions } from "../../store/uiSlice";
import Notification from "../UI/Notification";
import { billsHistoryActions } from "../../store/billHistorySlice";
import useInput from "../../hooks/use-input";
//validation
const isNotEmpty=(value)=>value.trim() !== '';


function BillForm(props) {
  const dispatch=useDispatch();
  const notification=useSelector(state=>state.ui.notification)
  const userId=useSelector(state=>state.bill.userId);
  console.log(userId);
  //
  //
  const {
    value: billNumberValue,
    isValid: billNumberIsValid,
    hasError: billNumberHasError,
    valueChangeHandler: billNumberChangeHandler,
    inputBlurHandler: billNumberBlurHandler,
    reset: resetbillNumber,
  } = useInput(isNotEmpty);


  let formIsValid=false;
  if(billNumberIsValid){
    formIsValid=true;
  }
//
//
  async function CreateBill(billNumber) {
    const token=localStorage.getItem('token')
    dispatch(
      uiActions.showNotification({
        component:'BillForm',
        status: 'pending',
        title: 'Sending...',
        message: 'Creating bill!',
      })
    );
    const bill=JSON.stringify({bill_number:billNumber,total_cost: 0,credit_card:null,user_id:userId,bill_Products:[]});
    const response = await fetch('https://localhost:7269/api/Bill/CreateNewBill', {
      method: 'POST',
      body: bill,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
    
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
       if(data.hasOwnProperty('errorMessage')){
        throw new Error(data.errorMessage)
       }
       else{ 
        throw new Error(data.title);

       }      
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
    if (!formIsValid)  {
      return;
    }
    CreateBill(billNumberValue).catch(error=>{
      dispatch(
        uiActions.showNotification({
          component:'BillForm',
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }) 
    resetbillNumber()   
  }
  const clearNotificationHandler=()=>{
    dispatch(uiActions.setNotificationToNull())
  }
    
  const billNumberClasses = billNumberHasError ? 'form-control invalid' : 'form-control';


  return (
    <Modal>
      <form onSubmit={onSubmitHandler} onFocus={clearNotificationHandler}>
      
        
      <div className={billNumberClasses}>
        <div>
        <label htmlFor="billNumber">Bill number : </label>
        <input id="billNumber" type="text" value={billNumberValue} onChange={billNumberChangeHandler} onBlur={billNumberBlurHandler}></input>
        {billNumberHasError && <p className="error-text">Please enter bill number.</p>}
        </div>
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button type="submit" disabled={!formIsValid} className={classes.button}>Create</button>
        </div>
      
      </div>
      <br/>
      
       
      </form>
      {notification && notification.component==='BillForm' &&
      
       <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />}
    </Modal>
  );
}

export default BillForm;
