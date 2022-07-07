import {  useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { billActions } from '../../store/billSlice';
import {useDispatch,useSelector} from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import useInput from '../../hooks/use-input';
import Notification from '../UI/Notification';


const isNotEmpty=(value)=>value.trim() !== '';

const LoginForm = () => {
    //
    //
    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
      } = useInput(isNotEmpty);
      const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
      } = useInput(isNotEmpty);

      let formIsValid=false;
      if(usernameIsValid && passwordIsValid){
      formIsValid=true;
    }
//
//   
  const history = useHistory();
  const notification=useSelector(state=>state.ui.notification)
  const dispatch=useDispatch()
  const authCtx = useContext(AuthContext);

  async function GetUsersId(username){
    const token=localStorage.getItem('token')
    const response = await fetch(`https://localhost:7269/api/User/GetUsersId/${username}`,{
      headers:{
        'Authorization': 'Bearer '+token
      }
    });
    const data = await response.json();
    console.log(response)
    console.log(data);
    dispatch(billActions.setUserId(data))  
  }

  async function Login(userCredsObj) {
    const token=localStorage.getItem('token')
    const credentials=JSON.stringify(userCredsObj);
    console.log(credentials)
    const response = await fetch('https://localhost:7269/api/User/login', {
      method: 'POST',
      body: credentials,
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      }
    });
    const data=await response.json()
    console.log(data)
    if (!response.ok) {
      throw new Error('error');
    }
    const expirationTime = new Date(
            new Date().setHours(new Date().getHours() + 8)
          )
    authCtx.login(data, expirationTime.toISOString());
    GetUsersId(userCredsObj.username);    
    const getUserResponse = await fetch('https://localhost:7269/api/User/GetUserByCredentials', {
      method: 'POST',
      body: credentials,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
    const getUserData = await getUserResponse.json();
    dispatch(uiActions.setAdminsName(getUserData.firsName))
    dispatch(uiActions.setAdminsLastName(getUserData.lastName))
    if(getUserData.role === 'admin'){
      history.replace('/admin')
      dispatch(uiActions.isOnAdminsPage())
    }
    else if(getUserData.role === 'user'){
      history.replace('/homepage')
    }                                    
    
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid)  {
        return;
      }

      const credentials={username:usernameValue,password:passwordValue}
      Login(credentials).catch(error=>{
        dispatch(
          uiActions.showNotification({
            component:'LoginForm',
            status: 'error',
            title: 'Error!',
            message: 'Error occured while trying to log inn!',
          })
        );
      });
    
    resetUsername()
    resetPassword()
}

  const clearNotificationHandler=()=>{
    dispatch(uiActions.setNotificationToNull())
  }
 //
 const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
 const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
 //
 return (
    <section className={classes.auth}>
      <h1>Login</h1> 
      <form onSubmit={submitHandler} onFocus={clearNotificationHandler}>
        <div className={usernameClasses}>
        <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          {usernameHasError && <p className={classes.errorText}>Please enter username.</p>}
        </div>
        <div className={passwordClasses}>
        <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p className={classes.errorText}>Please enter password.</p>}
          </div>
        
        <div className={classes.actions}>
            <button disabled={!formIsValid} >Login</button>
        </div>
        {notification && notification.component==='LoginForm' &&
      
       <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />}
      </form>
    </section>
  );
};

export default LoginForm;