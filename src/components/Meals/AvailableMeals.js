import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useState,useEffect,useCallback} from 'react';

  

const AvailableMeals = () => {
  const[products,setProducts]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchProducts =useCallback( async () => {
    const response = await fetch(
      'https://localhost:7269/api/Product'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    const loadedMeals = [];


    for (const key in responseData) {
      loadedMeals.push({
        id: responseData[key].product_id,
        name: responseData[key].name,
        price: responseData[key].cost,
      });
    }

    setProducts(loadedMeals);
    setIsLoading(false);
  },[]);

  useEffect(() => {
    
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[fetchProducts]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }


  const mealsList = products.map((product) => (
    <MealItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
