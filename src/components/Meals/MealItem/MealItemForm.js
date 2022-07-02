import { useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const billnumber=useSelector(state=>state.bill.billNumber);
  const choosenBill=billnumber !== '';

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  //method that runs after click on delete product button
  const onDeleteProduct=()=>{
    if( window.confirm('Are you sure you want to delete that Product??')){
      props.onDelete(props.id);
    }
    else{
      return;
    }
  }
  


  return (
    <div>
    <form className={classes.form} onSubmit={submitHandler}>
      {choosenBill && <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />}
      {choosenBill && <button>+ Add</button>}
      
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
    {!choosenBill && <button className={classes.delete} onClick={onDeleteProduct}>Delete product</button>}
    </div>
  );
};

export default MealItemForm;
