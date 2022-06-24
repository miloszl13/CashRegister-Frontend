import Card from '../UI/Card'
import BillItem from '../Bill/BillItem';
import classes from './BillsList.module.css';
import {useState,useEffect} from 'react';

  

const BillsList = () => {
  const[bills,setBills]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch(
        'https://localhost:7269/api/Bill/GetAllBills'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedBills = [];


      for (const key in responseData) {
        loadedBills.push({
          id: responseData[key].bill_number,
          totalCost: responseData[key].total_cost,
          creditCard: responseData[key].credit_card,
        });
      }

      setBills(loadedBills);
      setIsLoading(false);
    };
    fetchBills().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [bills]);

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


  const billsList = bills.map((bill) => (
    <BillItem
      key={bill.id}
      id={bill.id}
      totalCost={bill.totalCost}
      creditCard={bill.creditCard}
    />
  ));

  return (
    <section className={classes.bills}>
      <Card>
        <ul>{billsList}</ul>
      </Card>
    </section>
  );
};

export default BillsList;
