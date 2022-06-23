import React from "react";
import Modal from "../UI/BillModal";
import classes from './BillForm.module.css'

function BillForm(props) {
  return (
    <Modal>
      <form>
        <label>Bill number</label>
        <input type="text"></input>
        <label>Credit card</label>
        <input type="text"></input>
      </form>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button} onClick={props.onCreate}>Create</button>
      </div>
    </Modal>
  );
}

export default BillForm;
