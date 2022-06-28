import { Fragment } from 'react';
import {useSelector} from 'react-redux'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const showBill=useSelector(state=>state.ui.createdBill)
  const billsList=useSelector(state=>state.ui.BillsListPage)
 
  return (
    <Fragment>
      <header className={classes.header}>
        <Link style={{textDecoration:'none' ,color:'white'}} to='/homepage'><h1>HOMEPAGE</h1></Link>
        {!billsList && <Link style={{textDecoration:'none'}} to='/billslist'><button className={classes.btn}>Bills List</button></Link>}
        {!billsList && <button className={classes.btn} onClick={props.onShowProductForm}>Add new Product</button>}
        {!showBill && !billsList && <button className={classes.btn} onClick={props.onShowCreateBill}>Create Bill</button>}
        {showBill && !billsList && <HeaderCartButton onClick={props.onShowCart}/>}
      </header>
    </Fragment>
  );
};
export default Header;