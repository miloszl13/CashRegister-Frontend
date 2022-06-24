import {  useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart=useSelector(state=>state.bill.items);
  const totalNum=useSelector(state=>state.bill.totalAmount)
  // const numberOfCartItems = cart.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);
  // console.log(numberOfCartItems)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>BILL</span>
      <span className={classes.badge}>{totalNum}</span>
    </button>
  );
};

export default HeaderCartButton;
