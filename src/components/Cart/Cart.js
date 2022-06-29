import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { billActions } from "../../store/billSlice";
import { uiActions } from "../../store/uiSlice";
import {useState,useRef } from 'react'

const Cart = (props) => {
  const cart = useSelector((state) => state.bill.items);
  const totalBillPrice = useSelector((state) => state.bill.totalBillPrice);
  const billNumber = useSelector((state) => state.bill.billNumber);
  const creditCard = useSelector((state) => state.bill.creditCard);

  const dispatch = useDispatch();
  const [printed,setPrinted]=useState(false);
  //changing bill number, and adding credit cardd
  const [creditCardAdd,setCreditCardAdd]=useState(false);
  
  const creditCardInputRef=useRef();
 

  const cartItemRemoveHandler = (id) => {
    dispatch(billActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(billActions.addItemToCart(item));
  };
  
  //Add credit card function
  async function AddCreditCard(billNumber,creditCard) {
    
    const response= await fetch(
      `https://localhost:7269/api/Bill/AddCreditCardToBill/${billNumber},${creditCard}`,
      {
        method: 'POST'  
      }
    );
    const data=await response.json()
    console.log(data)
  }
  //delete bill function
  async function deleteBill(bn) {
    
    const response = await fetch(`https://localhost:7269/api/Bill/delete/${bn}`, {
      method: 'DELETE',
      
    });
    const data = await response.json();
    console.log(data);
    
  }
 
  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.quantity}
          price={item.price}
          totalPrice={item.price * item.quantity}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const onCloseAfterPrint=()=>{
    setPrinted(prevState=>!prevState)
    props.onClose()
    dispatch(billActions.resetToInitial())
    dispatch(uiActions.showBillButton())
  }
  

   const onPrintHandler=()=>{
    setPrinted(prevState=>!prevState)
   }
   const onDeleteHandler=()=>{
    if( window.confirm('Are you sure you want to delete that Bill??')){
      deleteBill(billNumber);
      dispatch(billActions.resetToInitial())
      dispatch(uiActions.showBillButton())
      props.onClose();
    }
    else{
      return;
    }
   }

 
   const onOpenCreditCardHandler=()=>{
    setCreditCardAdd(prevState=>!prevState)
   }
   const onAddCreditCardHandler=(event)=>{
    event.preventDefault()
    const enteredCreditCard=creditCardInputRef.current.value;
    AddCreditCard(billNumber,enteredCreditCard);
    dispatch(billActions.setCreditCard(enteredCreditCard))
   }
  

  

  return (
    <Modal onClose={props.onClose}>
      {!printed && !creditCardAdd &&
      <div>
       <div className={classes.head}>
        <div>
        <span>Bill Number : </span>
        <span className={classes.sp}>{billNumber}</span>
        </div>
     
        {!creditCard && <button id="billButton" className={classes.billButton} onClick={onOpenCreditCardHandler}>Add Credit Card</button>}
      </div>
      {cartItems}
      <div className={classes.total}>
        <div>
        <span>Credit card: {creditCard}</span>
        </div>
        <div>
        <span>Total Price: </span>
        <span>{totalBillPrice}din</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button id="closeButton" className={classes["button--alt"]} onClick={props.onClose}>Close</button>
       <button id="billButton" className={classes.billButton} onClick={onPrintHandler}>Print</button>
       <button id="billButton" className={classes.billButton} onClick={onDeleteHandler}>Delete</button>
      </div> 
      </div> }
      {printed && 
      <div>
        <h1>Bill is successfuly printed !</h1>
        <button id="closeButton" className={classes.billButton} onClick={onCloseAfterPrint}>Close</button>
      </div>
      }
      
      {creditCardAdd && 
      <div className={classes.billChange}>
        <form className={classes.billChangeForm}>
          <div>
          <label htmlFor="creditCard">Credit card: </label>
          <input id="creditCard" type="text" ref={creditCardInputRef} ></input>
          </div>
          <div>
          <button className={classes.billButton} onClick={onOpenCreditCardHandler} >Back</button>
          <button className={classes.billButton} onClick={onAddCreditCardHandler}>Add</button>
          </div>
        
        </form>
      </div>
      }
    </Modal>
  );
};

export default Cart;
