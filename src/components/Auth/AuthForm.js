import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const roleInputRef=useRef();
  const [token,setToken]=useState('');

  async function AddNewUser(userObj) {
    //setNotificationObj({component:'ProductForm',status:'pending',title:'Sending',message:'Sending...'})
    const user=JSON.stringify(userObj);
    const response = await fetch('https://localhost:7269/api/User/RegisterUser', {
      method: 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data=await response.json()
    if (!response.ok) {
      console.log(data)
      throw new Error(data.errorMessage);
    }
    //dispatch(productActions.addProduct(productObj))
    //setNotificationObj({component:'ProductForm',status:'success',title:'Success!',message:'Successfuly created product'})
  }
  async function Login(userCredsObj) {
    //setNotificationObj({component:'ProductForm',status:'pending',title:'Sending',message:'Sending...'})
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
    console.log(response)
    const data=await response.json()
    setToken(data);
    console.log(data)
    if (!response.ok) {
      console.log(data)
      throw new Error('error');
    }
    const expirationTime = new Date(
            new Date().getTime() + new Date().getTime() * 1000
          );
          authCtx.login(data, expirationTime.toISOString());
          history.replace('/homepage');
    
   // dispatch(productActions.addProduct(productObj))
   // setNotificationObj({component:'ProductForm',status:'success',title:'Success!',message:'Successfuly created product'})
  }

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    // optional: Add validation

    setIsLoading(true);

    //REGISTER
    //const enteredFirstName=firstNameInputRef.current.value;
    //const enteredLastName=lastNameInputRef.current.value;
   // const enteredRole=roleInputRef.current.value;
    // const user={firsName:enteredFirstName,lastName:enteredLastName,username:enteredUsername,password:enteredPassword,role:enteredRole}
    // console.log(user)
    // AddNewUser(user).catch(error=>{
    //   console.log('error');
    // })

    //LOGIN
    const credentials={username:enteredUsername,password:enteredPassword}
    console.log(credentials)
    Login(credentials);

    setIsLoading(false);
    // let url;
    // if (isLogin) {
    //   url =
    //     'https://localhost:7269/api/User/login';
    // } else {
    //   url =
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24';
    // }
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = 'Authentication failed!';
    //         // if (data && data.error && data.error.message) {
    //         //   errorMessage = data.error.message;
    //         // }

    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     const expirationTime = new Date(
    //       new Date().getTime() + +data.expiresIn * 1000
    //     );
    //     authCtx.login(data.idToken, expirationTime.toISOString());
    //     history.replace('/');
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };
   console.log(token);
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Register user'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
          />
          </div>
          {!isLogin && 
          <div>
          <div className={classes.control}>
          <label htmlFor='fname'>First name</label>
          <input type='text' id='fname' ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
        <label htmlFor='lname'>Last name</label>
        <input type='text' id='lname' ref={lastNameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='role'>Role</label>
        <input type='text' id='role' ref={roleInputRef} />
      </div>
      </div>}
        
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create User'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Register new user' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;