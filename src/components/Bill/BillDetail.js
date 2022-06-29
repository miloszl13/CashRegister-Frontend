import React from "react";
import BillProducts from "./BillProducts";
import Modal from "../UI/Modal";


function BillDetail(props) {
  const billProducts = props.billproducts;

  const bpList = billProducts.map((bp) => (
    <BillProducts
      key={bp.product_id}
      productId={bp.product_id}
      productQuantity={bp.product_quantity}
      productCost={bp.products_cost}
    />
  ));
   
  return (
    <Modal>
    <div>
      <p>Bill Number: {props.bn}</p>
      <p>Total Cost: {props.tc}</p>
      <p>Credit Card: {props.cc}</p>
      <ul>{bpList}</ul>
    </div>
    </Modal>
    
  );
}

export default BillDetail;
