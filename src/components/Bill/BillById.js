import React,{useRef} from 'react'
import {useDispatch} from 'react-redux'
import { uiActions } from '../../store/uiSlice';
import Modal from '../UI/Modal';
import classes from './BillById.module.css'

function BillById(props) {
    const billInputRef=useRef();
    const dispatch=useDispatch();
    let enteredBill='';

const onSubmitHandler=(event)=>{
    event.preventDefault();
    enteredBill=billInputRef.current.value;
    props.onFilter(enteredBill)
    dispatch(uiActions.hideBillByIdForm())
    
}


  return (
    <Modal>
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="billNumber">Bill number</label>
      <input id="billNumber" type="text" ref={billInputRef}></input>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      <button type="submit" className={classes.button}>Get</button>
    </div>
    </form>
  </Modal>
  )
}

export default BillById