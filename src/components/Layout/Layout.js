import { Fragment } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import classes from './Layout.module.css';
import Header from './Header';
import { uiActions } from '../../store/uiSlice';
import Cart from '../Cart/Cart';

const Layout = (props) => {
    const dispatch=useDispatch();
    // const displayBillForm=useSelector(state=>state.ui.billFormVisible)
    const displayCart=useSelector(state=>state.ui.cartIsVisible)
    // const displayProductForm=useSelector(state=>state.ui.productFormVisible)
  
  
    const showCartHandler = () => {
      dispatch(uiActions.showCart())
    };
  
    const onOpenBillForm=()=>{
      dispatch(uiActions.showBillForm());
    }
    // const onCreateBill=()=>{
    //   dispatch(uiActions.showBillButton())
    //   dispatch(uiActions.showBillForm());
    // }
    
    const onOpenProductForm=()=>{
      dispatch(uiActions.showProductForm());
    }
    // const onCreateProduct=()=>{
  
    // }
    
  return (
    <Fragment>
      {displayCart && <Cart onClose={showCartHandler} />}
      <Header onShowCart={showCartHandler} onShowCreateBill={onOpenBillForm} onShowProductForm={onOpenProductForm}/>
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;