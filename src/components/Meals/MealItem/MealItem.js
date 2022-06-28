import {useSelector,useDispatch} from 'react-redux'
import { billActions } from '../../../store/billSlice';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = (props) => {
  const cart=useSelector((state)=>state.bill.items);
  const billNum=useSelector((state)=>state.bill.billNumber);
  console.log(billNum)
  const dispatch=useDispatch();
  
  const price = `$${props.price.toFixed(2)}`;
  
  async function addProductsToBill(bp) {
    const billProduct=JSON.stringify({bill_number:bp.billNumber,product_id:bp.product_id,product_quantity:bp.product_quantity,products_cost:bp.products_cost});
    const response = await fetch('https://localhost:7269/api/BillProduct/AddProductToBillProduct', {
      method: 'POST',
      body: billProduct,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    console.log(billProduct)
  }


  const addToCartHandler = amount => {
    dispatch(billActions.addItemToCart({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    }));
    console.log(amount)
   addProductsToBill({
    billNumber:billNum,
    product_id:props.id,
    product_quantity:amount,
    products_cost:0
  })
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
