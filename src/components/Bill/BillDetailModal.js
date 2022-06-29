import React from "react";
import Modal from "../UI/Modal";
import classes from "./BillDetailModal.module.css";
import { uiActions } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import BillProducts from "./BillProducts";

const BillDetailModal = (props) => {
  const dispatch = useDispatch();
  const closeButton = () => {
    dispatch(uiActions.hideBillDetail());
  };

  const billProducts = props.products;
  let bpList

  if(billProducts.length===0 ){
    bpList =  <p>There is no products on this bill!</p>
  }
  else if(billProducts.length>0){ 
    bpList = billProducts.map(bp => (

      
      <BillProducts
        key={bp.product_id}
        productId={bp.product_id}
        productQuantity={bp.product_quantity}
        productCost={bp.products_cost}
      />
    ));
  }

  return (
    <Modal>
      <div className={classes.position}>
        <div>
          <p>Bill Number: {props.bn}</p>
          <p>Total Cost: {props.tc}</p>
          <p>Credit Card: {props.cc}</p>
          <ul>{bpList}</ul>
        </div>
        <button className={classes.close} onClick={closeButton}>
          close
        </button>
      </div>
    </Modal>
  );
};

export default BillDetailModal;
