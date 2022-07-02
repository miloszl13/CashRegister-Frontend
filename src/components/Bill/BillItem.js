import React  from "react";
import classes from "./BillItem.module.css";
import {useSelector,useDispatch} from 'react-redux'
import { billsHistoryActions } from "../../store/billHistorySlice";
import { billActions } from "../../store/billSlice";

const BillItem = (props) => {
  const billDetail=useSelector(state=>state.ui.billDetailIsVisible)
  const dispatch=useDispatch();
  const billNumb=useSelector(state=>state.bill.billNumber)

  async function deleteBill(bn) {
    
    const response = await fetch(`https://localhost:7269/api/Bill/delete/${bn}`, {
      method: 'DELETE',
      
    });
    const data = await response.json();
    console.log(data);
    dispatch(billsHistoryActions.deleteBill(data))
    if(bn===billNumb){
      dispatch(billActions.resetToInitial())
    }
  }

  const onDeleteBill=()=>{
    if( window.confirm('Are you sure you want to delete that Bill??')){
      deleteBill(props.id);
      
    }
    else{
      return;
    }
  }
  
    
    
    const onViewDetails=()=>{
      
      props.onViewDetail(props.id);
    }


  return (
    <div>
     <div>
   {!billDetail && <li className={classes.bill}>
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
      <div className={classes.buttons}>
        <button className={classes.delete} onClick={onDeleteBill}>Delete bill</button>
        <button className={classes.delete} onClick={onViewDetails}>View details</button>
      </div>
    </li>}
    </div>
    <div>
    

    </div>  
    </div>
  );
}
export default BillItem;
