import { Fragment } from 'react';
import {useSelector} from 'react-redux'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const billsList=useSelector(state=>state.ui.BillsListPage)
  const billNum=useSelector(state=>state.bill.billNumber)
  
  console.log(billNum)
  return (
    <Fragment>
      <header className={classes.header}>
        <Link style={{textDecoration:'none' ,color:'white'}} to='/homepage'><h1>HOMEPAGE</h1></Link>
        {!billsList && <Link style={{textDecoration:'none'}} to='/billslist'><button className={classes.btn}>Bills List</button></Link>}
        {!billsList && <button className={classes.btn} onClick={props.onShowProductForm}>Add new Product</button>}
        {(billNum === '') && !billsList && <button className={classes.btn} onClick={props.onShowCreateBill}>Create Bill</button>} 
        {(billNum !== '') && !billsList && <HeaderCartButton onClick={props.onShowCart}/>}

      </header>
    </Fragment>
  );
};
export default Header;