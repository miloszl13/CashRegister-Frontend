import React, { useRef } from "react";
import Modal from "../UI/Modal";
import classes from './BillForm.module.css'
import {useDispatch} from 'react-redux'
import { billActions } from "../../store/billSlice";

function BillForm(props) {
  const dispatch=useDispatch();
  const billInputRef=useRef();

  async function CreateBill(billNumber) {
    const bill=JSON.stringify({bill_number:billNumber,total_cost: 0,credit_card:null,bill_Products:[]});
    const response = await fetch('https://localhost:7269/api/Bill/CreateNewBill', {
      method: 'POST',
      body: bill,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }
  
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const enteredBill=billInputRef.current.value;
    dispatch(billActions.createBill(enteredBill));
    props.onCreate();
    CreateBill(enteredBill)
    
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
    </Modal>
  );
}

export default BillForm;
