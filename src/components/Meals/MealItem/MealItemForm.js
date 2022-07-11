import { useRef, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { uiActions } from '../../../store/uiSlice';
import { productActions } from '../../../store/productSlice';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const billnumber=useSelector(state=>state.bill.billNumber);
  const choosenBill=billnumber !== '';
  const isAdmin=useSelector(state=>state.ui.adminsPage)
  const dispatch=useDispatch();

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
  const onOpenUpdateProductForm = () => {
    dispatch(uiActions.showUpdateProductForm());
    dispatch(productActions.setSelecetedProductId(props.id));
    console.log(props.id)
  };


  return (
    <div>
    <form data-testid='mealItemForm' className={classes.form} onSubmit={submitHandler}>
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
    {!choosenBill && isAdmin && <button className={classes.btn} onClick={onDeleteProduct}>Delete product</button>}
    {isAdmin && <button className={classes.btn} onClick={onOpenUpdateProductForm}>Update product</button>}
    </div>
  );
};

export default MealItemForm;
