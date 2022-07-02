import { Fragment ,useContext} from 'react';
import {useSelector} from 'react-redux'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const billsList=useSelector(state=>state.ui.BillsListPage)
  const billNum=useSelector(state=>state.bill.billNumber)

  const logoutHandler=()=>{
    authCtx.logout();
  }
  
  return (
    <Fragment>
      <header className={classes.header}>
        <Link style={{textDecoration:'none' ,color:'white'}} to='/homepage'><h1>HOMEPAGE</h1></Link>
        {!billsList && <Link style={{textDecoration:'none'}} to='/billslist'><button className={classes.btn}>Bills List</button></Link>}
        {!billsList && <button className={classes.btn} onClick={props.onShowProductForm}>Add new Product</button>}
        {(billNum === '') && !billsList && <button className={classes.btn} onClick={props.onShowCreateBill}>Create Bill</button>} 
        {(billNum !== '') && !billsList && <HeaderCartButton onClick={props.onShowCart}/>}
        {!billsList && <button className={classes.btn} onClick={props.onShowCurrExchForm}>Currency Exchange</button>}
        <button className={classes.btn} onClick={logoutHandler}>Logout</button>
      </header>
    </Fragment>
  );
};
export default Header;