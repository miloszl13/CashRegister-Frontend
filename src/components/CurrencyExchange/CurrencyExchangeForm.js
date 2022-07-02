import React,{useState} from 'react'
import useInput from '../../hooks/use-input';
import Modal from '../UI/Modal';
import Notification from '../UI/Notification';
import classes from './CurrencyExchangeForm.module.css'

//form input validations
const isRsdEurUsdAndNotEmpty=(value)=>value.trim() !== '' && (value.trim() === 'rsd' || value.trim()==='usd' || value.trim()==='eur');
const isNotLessThanOrEqualToZero = (value)=>  value > 0 && value.length < 11



function CurrencyExchangeForm(props) {
    const [notificationObj,setNotificationObj]=useState({component:'',status:'',title:'',message:''});
    const [resultValue,setResultValue]=useState();
    const [sameCurrencies,areSameCurrencies]=useState(false);

    const {
        value:firstCurrencyValue,
        isValid:firstCurrencyIsValid,
        hasError:firstCurrencyHasErrors,
        valueChangeHandler:firstCurrencyChangeHandler,
        inputBlurHandler:firstCurrencyBlurHandler,
        reset:resetFirstCurrency
      }=useInput(isRsdEurUsdAndNotEmpty);
      const {
        value:amountValue,
        isValid:amountIsValid,
        hasError:amountHasErrors,
        valueChangeHandler:amountChangeHandler,
        inputBlurHandler:amountBlurHandler,
        reset:resetAmount
      }=useInput(isNotLessThanOrEqualToZero);
      const {
        value:secondCurrencyValue,
        isValid:secondCurrencyIsValid,
        hasError:secondCurrencyHasErrors,
        valueChangeHandler:secondCurrencyChangeHandler,
        inputBlurHandler:secondCurrencyBlurHandler,
        reset:resetSecondCurrency
      }=useInput(isRsdEurUsdAndNotEmpty);
      
      let formIsValid=false;
      
      if(firstCurrencyIsValid && amountIsValid && secondCurrencyIsValid){
        
        formIsValid=true;
      
      }
      
      //method that exchange amount 
      
        async function Exchange(curr1,amount,curr2) {
            setNotificationObj({component:'CurrencyExchangeForm',status:'pending',title:'Exchanging',message:'Exchanging...'})
            const response = await fetch(`https://localhost:7269/api/CurrencyExchange/Exchange/${curr1},${amount},${curr2}`);
            const data=await response.json()
            const result = data.toFixed(2)
            setResultValue(result);
            if (!response.ok) {
            throw new Error();
            }
            setNotificationObj({component:'ProductForm',status:'success',title:'Success!',message:'Amount exchanged successfuly'})
        }



        const onSubmitHandler=(event)=>{
            event.preventDefault()
            if (!formIsValid)  {
              return;
            }
            if((firstCurrencyValue.trim() !== '' && secondCurrencyValue.trim() !== '')&&((firstCurrencyValue.trim() === secondCurrencyValue.trim()))){
                areSameCurrencies(true)
                return;
              }  
            Exchange(firstCurrencyValue,amountValue,secondCurrencyValue).catch(error=>{
              setNotificationObj({component:'ProductForm',status:'error',title:'Error!',message:'Failed to exchange!'})
            })
            //reset inputs to initial
            resetFirstCurrency()
            resetSecondCurrency()
            resetAmount()
          }




          //when click on any form input element,this method runs
          const clearNotificationHandler=()=>{
            setNotificationObj({component:'',status:'',title:'',message:''})
           }
        //  const hanleSecondCurrencyOnChange=()=>{
        //     //secondCurrencyChangeHandler()
        //     if((firstCurrencyValue.trim() !== '' && secondCurrencyValue.trim() !== '')&&((firstCurrencyValue.trim() === secondCurrencyValue.trim()))){
        //         areSameCurrencies(true)
        //     }  
        //   }
          //
        const firstCurrencyClasses = firstCurrencyHasErrors ? 'form-control invalid' : 'form-control';
        const amountClasses = amountHasErrors ? 'form-control invalid' : 'form-control';
        const secondCurrencyClasses = secondCurrencyHasErrors ? 'form-control invalid' : 'form-control';
        
  return (
    <Modal>
    
     <form onSubmit={onSubmitHandler} onFocus={clearNotificationHandler}>
      <div>
        <div className={firstCurrencyClasses}>
          <label htmlFor='curr1'>Currency : (rsd,eur,usd) </label>
          <input
            type='text'
            id='curr1'
            value={firstCurrencyValue}
            onChange={firstCurrencyChangeHandler}
            onBlur={firstCurrencyBlurHandler}
          />
          {firstCurrencyHasErrors && <p className="error-text">Enter valid currency (eur,rsd,usd)</p>}
        </div>
        <div className={amountClasses}>
          <label htmlFor='amount'>Amount : </label>
          <input
            type='number'
            id='amount'
            value={amountValue}
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
          />
          {amountHasErrors && <p className="error-text">Enter valid amount: <br/> (value must be greather than 0) <br/> (length cant be greater than 10) </p>}
        </div>
      
      <div className={secondCurrencyClasses}>
        <label htmlFor='curr2'>to currency : (rsd,eur,usd) </label>
        <input
          type='text'
          id='curr2'
          value={secondCurrencyValue}
          onChange={secondCurrencyChangeHandler}
          onBlur={secondCurrencyBlurHandler}
        />
        {secondCurrencyHasErrors && <p className="error-text">Enter valid currency (eur,rsd,usd)</p>}
        {sameCurrencies && <p className='error-text'>You cant change to the same currency</p>}
      </div>
      {resultValue && <label className={classes.result}>Result : {resultValue}</label>}
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button disabled={!formIsValid} className={classes.button}>Exchange</button>
      </div>
    </form>



      <br/>
      {notificationObj.component !== '' && 
      <Notification
      status={notificationObj.status}
      title={notificationObj.title}
      message={notificationObj.message}
    />
    }
    </Modal>
  )
}

export default CurrencyExchangeForm