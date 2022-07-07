import { Fragment ,useContext} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { uiActions } from '../../store/uiSlice';

const Header = (props) => {
  
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const billsList=useSelector(state=>state.ui.BillsListPage)
  const billNum=useSelector(state=>state.bill.billNumber)
  const isAdmin=useSelector(state=>state.ui.adminsPage)
  const mealsOpened=useSelector(state=>state.ui.showAdminsMeals)
  const history=useHistory();
  const dispatch=useDispatch()
  
  const onShowMeals=()=>{
    dispatch(uiActions.notOnInitialAdminsPage())
    dispatch(uiActions.hideCreateUserForm())
    dispatch(uiActions.showAdminsMeals())
  }
  const onShowCreateNewUser=()=>{
    dispatch(uiActions.notOnInitialAdminsPage())
    dispatch(uiActions.hideAdminsMeals())
    dispatch(uiActions.showCreateUserForm())
  }
  
  const logoutHandler=()=>{
    authCtx.logout();
    history.replace('/auth')
    dispatch(uiActions.isNotOnAdminPage())
  }
  console.log(isLoggedIn)
  const addproductBtnClasses= mealsOpened ? classes.btn : classes.disabled;
  return (
    <Fragment>
      <header className={classes.header}>
        {isAdmin && isLoggedIn &&<button className={classes.btn} onClick={onShowMeals}>Meals</button>}
        {isAdmin && isLoggedIn &&<button className={classes.btn} onClick={onShowCreateNewUser}>Create new user</button>}
        {isAdmin && isLoggedIn && <button disabled={!mealsOpened} className={addproductBtnClasses} onClick={props.onShowProductForm} >Add new Product</button>}

        {!isAdmin && isLoggedIn && <Link style={{textDecoration:'none' ,color:'white'}} to='/homepage'><h1>{billsList ? 'back to HOMEPAGE' : 'HOMEPAGE'}</h1></Link>}
        {!isAdmin && isLoggedIn && !billsList && <Link style={{textDecoration:'none'}} to='/billslist'><button className={classes.btn}>Bills List</button></Link>}
        {!isAdmin && isLoggedIn && (billNum === '') && !billsList && <button className={classes.btn} onClick={props.onShowCreateBill}>Create Bill</button>} 
        {!isAdmin && isLoggedIn && (billNum !== '') && !billsList && <HeaderCartButton onClick={props.onShowCart}/>}
        {!isAdmin && isLoggedIn && !billsList && <button className={classes.btn} onClick={props.onShowCurrExchForm}>Currency Exchange</button>}
        {!isAdmin && !isLoggedIn && <h1>Welcome</h1>}

        {isLoggedIn && <button className={classes.btn} onClick={logoutHandler}>Logout</button>}
        
      </header>
    </Fragment>
  );
};
export default Header;