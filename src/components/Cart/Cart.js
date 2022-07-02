import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { billActions } from "../../store/billSlice";
import { uiActions } from "../../store/uiSlice";
import {useState,useRef ,useCallback} from 'react'
import Notification from "../UI/Notification";


const Cart = (props) => {
  const cart = useSelector((state) => state.bill.items);
  const totalBillPrice = useSelector((state) => state.bill.totalBillPrice);
  const billNumber = useSelector((state) => state.bill.billNumber);
  const creditCard = useSelector((state) => state.bill.creditCard);
  const notification=useSelector(state=>state.ui.notification)
  const dispatch = useDispatch();
  const [printed,setPrinted]=useState(false);
  const [deleting,setDeleting]=useState(false);
  const [creditCardAdd,setCreditCardAdd]=useState(false);
  const creditCardInputRef=useRef();
 


  const addProductsToBill=useCallback(async (bp) => {
    const billProduct=JSON.stringify({bill_number:bp.bill_number,product_id:bp.product_id,product_quantity:bp.product_quantity,products_cost:bp.products_cost});
    await fetch('https://localhost:7269/api/BillProduct/AddProductToBillProduct', {
      method: 'POST',
      body: billProduct,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },[]);
  const deleteProductFromBill=useCallback(async (billNumber,productId,quantity) => {
    console.log(billNumber,productId,quantity)
    const response=await fetch(`https://localhost:7269/api/BillProduct/deleteBillProduct/${billNumber},${productId},${quantity}`, {
      method: 'DELETE'
      })
      const data=await response.json()
      console.log(data)
    },[]);


 
  
  //Add credit card function
  async function AddCreditCard(billNumber,creditCard) {
    dispatch(
      uiActions.showNotification({
        component:'Cart',
        status: 'pending',
        title: 'Sending...',
        message: 'Adding credit card..',
      })
    );
    const response= await fetch(
      `https://localhost:7269/api/Bill/AddCreditCardToBill/${billNumber},${creditCard}`,
      {
        method: 'POST'  
      }
    );
    const data=await response.json()
    if(!response.ok){
      throw new Error();
    }
    console.log(data)
    dispatch(
      uiActions.showNotification({
        component:'Cart',
        status: "success",
          title: "Success!",
          message: "Credit card is added successfully",
      })
    );
  }
  //delete bill function
  async function deleteBill(bn) {
    dispatch(
      uiActions.showNotification({
        component:'Cart',
        status: 'pending',
        title: 'Deleting...',
        message: 'Deleting..',
      })
    );
    const response = await fetch(`https://localhost:7269/api/Bill/delete/${bn}`, {
      method: 'DELETE',
      
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error();
    }
    console.log(data);
    dispatch(
      uiActions.showNotification({
        component:'Cart',
        status: "success",
          title: "Success!",
          message: "Bill successfuly deleted!",
      })
    );
    setDeleting(true);
  }
 










  const cartItemRemoveHandler = (id) => {
    dispatch(billActions.removeItemFromCart(id));
    deleteProductFromBill(billNumber,id,1)
  };

  const cartItemAddHandler = (item) => {
    console.log(item)
    const bp = {bill_number:billNumber,product_id:item.id,product_quantity:1,products_cost:0};
    console.log(bp)
    dispatch(billActions.addItemToCart(item));
    addProductsToBill(bp)
     
  };











  //const bp=JSON.stringify({bill_number:billNumber,product_id:bp.product_id,product_quantity:bp.product_quantity,products_cost:bp.products_cost});
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
  const onCloseAfterPrintAndDelete=()=>{
    setPrinted(prevState=>!prevState)
    props.onClose()
    dispatch(billActions.resetToInitial())
    dispatch(uiActions.showBillButton())
  }
 

   const onPrintHandler=()=>{
    setPrinted(prevState=>!prevState)
    
    dispatch(
      uiActions.showNotification({
        component:'Cart',
        status: "success",
          title: "Success!",
          message: "Bill is successfuly printed!",
      })
    );
   
   }
   const onDeleteHandler=()=>{
    if( window.confirm('Are you sure you want to delete that Bill??')){
      deleteBill(billNumber).catch(error=>{
        dispatch(
          uiActions.showNotification({
            component:'Cart',
            status: 'error',
            title: 'Error...',
            message: 'Failed to delete bill',
          })
        );
        setDeleting(true);
      });
      dispatch(billActions.resetToInitial())
      dispatch(uiActions.showBillButton())
      //props.onClose();
    }
    else{
      return;
    }
   }

 
   const onOpenCreditCardHandler=()=>{
    setCreditCardAdd(prevState=>!prevState)
    dispatch(uiActions.setNotificationToNull())
   }
   const onAddCreditCardHandler=(event)=>{
    event.preventDefault()
    const enteredCreditCard=creditCardInputRef.current.value;
    AddCreditCard(billNumber,enteredCreditCard).catch(error=>{
      dispatch(
        uiActions.showNotification({
          component:'Cart',
          status: 'error',
          title: 'Error...',
          message: 'Failed to add credit card',
        })
      );
    });
    dispatch(billActions.setCreditCard(enteredCreditCard))
   }
  
   const clearNotificationHandler=()=>{
    dispatch(uiActions.setNotificationToNull())
   }
  
  return (
    <Modal onClose={props.onClose}>
      
      {!printed && !creditCardAdd &&  !deleting &&
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
      <div >
       
        <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
          <br/>
        <div className={classes.closeButtons}>
        <button id="closeButton" className={classes.billButton} onClick={onCloseAfterPrintAndDelete}>Close</button>
        </div>
        
      </div>
      }
      {deleting && 
      <div>
      {notification && notification.component==='Cart' && 
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        }
      <br/>
      <div className={classes.closeButtons}>
      <button id="closeButton" className={classes.billButton} onClick={onCloseAfterPrintAndDelete}>Close</button>
      </div>
      </div>
      }
      
      {creditCardAdd && 
      <div className={classes.billChange}>
        <form className={classes.billChangeForm} onFocus={clearNotificationHandler}>
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
      {notification && notification.component==='Cart' && !deleting && !printed &&
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        }

    </Modal>
  );
};

export default Cart;
