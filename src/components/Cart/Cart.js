import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { billActions } from "../../store/billSlice";

const Cart = (props) => {
  const cart = useSelector((state) => state.bill.items);
  const totalBillPrice = useSelector((state) => state.bill.totalBillPrice);
  const totalNum = useSelector((state) => state.bill.totalAmount);
  const hasItems = totalNum > 0;
  const billNumber = useSelector((state) => state.bill.billNumber);
  const dispatch = useDispatch();

  const cartItemRemoveHandler = (id) => {
    dispatch(billActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(billActions.addItemToCart(item));
  };
  

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

  return (
    <Modal onClose={props.onClose}>
      <div>
        <span>Bill Number : </span>
        <span>{billNumber}</span>
        <button id="billButton" className={classes.billButton}>Change BN</button>
      </div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalBillPrice}din</span>
      </div>
      <div className={classes.actions}>
        <button id="closeButton" className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button id="billButton" className={classes.billButton}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
