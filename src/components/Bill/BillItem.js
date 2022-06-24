import React  from "react";
import classes from "./BillItem.module.css";


const BillItem = (props) => {


  async function deleteBill(bn) {
    
    const response = await fetch(`https://localhost:7269/api/Bill/delete/${bn}`, {
      method: 'DELETE',
      
    });
    const data = await response.json();
    console.log(data);
  }
  const onDeleteBill=()=>{
    if( window.confirm('Are you sure you want to delete that Bill??')){
      deleteBill(props.id);
    }
    else{
      return;
    }
  }
  
  return (
    
    <li className={classes.bill}>
      <div>
        <div className={classes.info}>
          <p>Bill number: {props.id}</p>
        </div>
        <div className={classes.info}>
          <p>Total cost : {props.totalCost}</p>
        </div>
        <div className={classes.info}>
          <p>Credit card: {props.creditCard}</p>
        </div>
        <div className={classes.price}></div>
      </div>
      <div>
        <button className={classes.delete} onClick={onDeleteBill}>delete bill</button>
      </div>
      
    </li>
    
  );
};

export default BillItem;
