import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState, useEffect, useCallback } from "react";
import Notification from "../UI/Notification";
import {useSelector,useDispatch} from 'react-redux'
import { uiActions } from "../../store/uiSlice";
import { productActions } from "../../store/productSlice";


function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

const AvailableMeals = () => {
  const [products, setProducts] = useState([]);
  const dispatch=useDispatch();
  const notification=useSelector(state=>state.ui.notification)
  const productsDb=useSelector(state=>state.products.items)


  //add products to bil method  
  const addProductsToBill=useCallback(async (bp) => {
    const token = localStorage.getItem('token')
    const billProduct=JSON.stringify({bill_number:bp.billNumber,product_id:bp.product_id,product_quantity:bp.product_quantity,products_cost:bp.products_cost});
   await fetch('https://localhost:7269/api/BillProduct/AddProductToBillProduct', {
      method: 'POST',
      body: billProduct,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
  },[]);
  

  //method for deleting product
  const deleteProduct=useCallback(async (product)=> {
    const token=localStorage.getItem('token')
    const response = await fetch(`https://localhost:7269/api/Product/DeleteProduct/${product}`, {
      method: 'DELETE',
      headers:{
        'Authorization': 'Bearer '+token
      }
    });
    const data = await response.json();
    dispatch(productActions.deleteProduct(data))
  },[dispatch]);


  //method for fetching all products
  const fetchProducts = useCallback(async () => {
    dispatch(
      uiActions.showNotification({
        component:'AvailableMeals',
        status: 'pending',
        title: 'Fetching...',
        message: 'Fetching Products!',
      })
    );
    const response = await fetch("https://localhost:7269/api/Product");
    const responseData=await response.json()
    if (!response.ok) {

      throw new Error();
    }
    const loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({
        id: responseData[key].product_id,
        name: responseData[key].name,
        price: responseData[key].cost,
      });
    }
    wait(700)
    setProducts(loadedMeals);
    dispatch(uiActions.setNotificationToNull())
  }, [dispatch]);


  //runs every time componenet re-render and if productsDb,fetchProducts or dispatch change
  useEffect(() => {
    fetchProducts().catch((error) => {
      dispatch(
        uiActions.showNotification({
          component:'AvailableMeals',
          status: 'error',
          title: 'Error!',
          message: 'Connection error or product db is empty!',
        })
      );
      setProducts([])
    });
  }, [productsDb,fetchProducts,dispatch]);

  
  //list of products from db
  const mealsList = products.map((product) => (
    <MealItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      onAddProduct={addProductsToBill}
      onDeleteProduct={deleteProduct}
    />
  ));
  
  
  return (
    <section className={classes.meals}>
      <Card>
       
        {notification && notification.component==='AvailableMeals' && 
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        }
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
