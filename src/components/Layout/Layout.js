import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Layout.module.css";
import Header from "./Header";
import { uiActions } from "../../store/uiSlice";
import Cart from "../Cart/Cart";

const Layout = (props) => {
  const dispatch = useDispatch();
  const displayCart = useSelector((state) => state.ui.cartIsVisible);

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
    console.log("showcarthandler");
  };

  const onOpenBillForm = () => {
    dispatch(uiActions.showBillForm());
  };
  
  const onOpenCurrExch=()=>{
    dispatch(uiActions.showCurrExchForm());
  }

  const onOpenProductForm = () => {
    dispatch(uiActions.showProductForm());
  };

  return (
    <Fragment>
      {displayCart && <Cart onClose={showCartHandler} />}
      <Header
        onShowCart={showCartHandler}
        onShowCreateBill={onOpenBillForm}
        onShowProductForm={onOpenProductForm}
        onShowCurrExchForm={onOpenCurrExch}
      />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
