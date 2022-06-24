import {useSelector,useDispatch} from 'react-redux'
import { billActions } from '../../../store/billSlice';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = (props) => {
  const cart=useSelector((state)=>state.bill.items);
  const dispatch=useDispatch();
  
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    dispatch(billActions.addItemToCart({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    }));
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
