import classes from './AuthForm.module.css';
import useInput from '../../hooks/use-input';
import Notification from '../UI/Notification';
import {useDispatch,useSelector} from 'react-redux';
import { uiActions } from '../../store/uiSlice';

const isUserOrAdminAndNotEmpty=(value)=>value.trim() !== '' && (value.trim().toLowerCase() === 'user' || value.trim().toLowerCase() === 'admin')
const isNotEmpty=(value)=>value.trim() !== '';

const CreateNewUserForm = () => {
  const notification=useSelector(state=>state.ui.notification)
  const dispatch=useDispatch()
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
  const {
    value: firstnameValue,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstname,
  } = useInput(isNotEmpty);
  const {
    value: lastnameValue,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastname,
  } = useInput(isNotEmpty);
  const {
    value: roleValue,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRole,
  } = useInput(isUserOrAdminAndNotEmpty);

  let formIsValid=false;
  if(usernameIsValid && passwordIsValid && firstnameIsValid && lastnameIsValid && roleIsValid){
  formIsValid=true;
}
  // 
  //
  //
  async function AddNewUser(userObj) {
    const token=localStorage.getItem('token')
    dispatch(
      uiActions.showNotification({
        component:'CreateNewUser',
        status: 'pending',
        title: 'Sending...',
        message: 'Creating user!',
      })
    );
    const user=JSON.stringify(userObj);
    const response = await fetch('https://localhost:7269/api/User/RegisterUser', {
      method: 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
    const data=await response.json()
    if (!response.ok) {
      console.log(data)
      throw new Error(data.errorMessage);
    }
    dispatch(
      uiActions.showNotification({
        component:'CreateNewUser',
        status: "success",
          title: "Success!",
          message: "User is successfully created",
      })
    );
   
  }
  


  const submitHandler = (event) => {
    event.preventDefault();

    const user={firsName:firstnameValue,lastName:lastnameValue,username:usernameValue,password:passwordValue,role:roleValue}
    console.log(user)
    AddNewUser(user).catch(error=>{
      dispatch(
        uiActions.showNotification({
          component:'CreateNewUser',
          status: "error",
            title: "Error!",
            message: 'Error occured while creating new user',
        })
      );
    })
   
    resetUsername()
    resetPassword()
    resetFirstname()
    resetLastname()
    resetRole()
  }
   

    //
    const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
    const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
    const firstnameClasses = firstnameHasError ? 'form-control invalid' : 'form-control';
    const lastnameClasses = lastnameHasError ? 'form-control invalid' : 'form-control';
    const roleClasses = roleHasError ? 'form-control invalid' : 'form-control';
    //
    const clearNotificationHandler=()=>{
      dispatch(uiActions.setNotificationToNull())
    }

 return (
    <section className={classes.auth}>
      {notification && notification.component==='CreateNewUser' &&
      
      <Notification
           status={notification.status}
           title={notification.title}
           message={notification.message}
         />}
      <h1>Create new user</h1> 
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

        <div className={firstnameClasses}>
          <label htmlFor='firstname'>First name:</label>
          <input
            type='text'
            id='firstname'
            value={firstnameValue}
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
          />
          {firstnameHasError && <p className={classes.errorText}>Please enter first name.</p>}
        </div>
        <div className={lastnameClasses}>
          <label htmlFor='lastname'>Last name:</label>
          <input
            type='text'
            id='lastname'
            value={lastnameValue}
            onChange={lastnameChangeHandler}
            onBlur={lastnameBlurHandler}
          />
          {lastnameHasError && <p className={classes.errorText}>Please enter last name.</p>}
        </div>
        <div className={roleClasses}>
          <label htmlFor='role'>Role:</label>
          <input
            type='text'
            id='role'
            value={roleValue}
            onChange={roleChangeHandler}
            onBlur={roleBlurHandler}
          />
          {roleHasError && <p className={classes.errorText}>Please enter role.</p>}
        </div>
        <div className={classes.actions}>
            <button disabled={!formIsValid}>Create User</button>
        </div>
      </form>
    </section>
  );
};

export default CreateNewUserForm;