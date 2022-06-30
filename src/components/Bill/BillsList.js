import Card from "../UI/Card";
import BillItem from "../Bill/BillItem";
import classes from "./BillsList.module.css";
import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { uiActions } from "../../store/uiSlice";
import BillDetailModal from "./BillDetailModal";
import BillById from "./BillById";
import Notification from "../UI/Notification";

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}


const BillsList = () => {
  const [bills, setBills] = useState([]);
  const billDetail = useSelector((state) => state.ui.billDetailIsVisible);
  const [bp, setbp] = useState({});
  const [ps, setps] = useState([]);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState(false);
  const byIdForm = useSelector((state) => state.ui.BillById);
  const [filteredBill,setFilteredBill]=useState({})
  const notification = useSelector((state) => state.ui.notification);
  const billsDb=useSelector(state=>state.billsHistory.history)
  

  const fetchBills = useCallback(async () => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching...',
        message: 'Fetching bills!',
      })
    );
    
    const response = await fetch("https://localhost:7269/api/Bill/GetAllBills");

    if (!response.ok) {
      
      throw new Error("Something went wrong!");
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
    wait(700);
    dispatch(uiActions.setNotificationToNull())
    
  },[dispatch]);



  const onViewDetailModal = (bn) => {
   
   GetBillProducts(bn).catch(error=>{
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching bills details failed!',
        })
      );
      
    });
    
    
    dispatch(uiActions.showBillDetail());
       
  };

  async function GetBillProducts(billNumber) {
    
    const response = await fetch(`https://localhost:7269/api/Bill/GetBillById${billNumber}`);
    if (!response.ok) {
      
       throw new Error("Something went wrong!");
      
    }
    const responseData = await response.json();
    setbp(responseData);
    setps(responseData.bill_Products)
    
  }

  //open search form
  const onSearchByIdForm = () => {
    dispatch(uiActions.showBillByIdForm());
  };

  //list output
  const billsList = bills.map((bill) => (
        <BillItem
          key={bill.id}
          id={bill.id}
          totalCost={bill.totalCost}
          creditCard={bill.creditCard}
          onViewDetail={onViewDetailModal}
        />
      ));
  
 

  //method that filters bills
  const onFilterHandler = (billNum) => {
    const findedBill = bills.find((bill) => bill.id === billNum);
    setFilteredBill(findedBill);
    setFiltered(true);
  };
  
  //back to not filtered list
  const backToNotFiltered=()=>{
    setFiltered(false);
  }
  //close search form
  const onCloseHandler = () => {
    dispatch(uiActions.hideBillByIdForm());
  };

  useEffect(() => {
    
    fetchBills().catch(error=>{
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching bills failed!',
        })
      );
      setBills([])
    });
   
  }, [billsDb,fetchBills,dispatch]);

  return (
    <section className={classes.bills}>
      
      {byIdForm && (
        <BillById onClose={onCloseHandler} onFilter={onFilterHandler} />
      )}
      {billDetail && (
        <BillDetailModal
          bn={bp.bill_number}
          tc={bp.total_cost}
          cc={bp.credit_card}
          products={ps}
          //
        />
      )}

   
      {!billDetail && (
        <Card>


          {notification && (
          <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          />
      )}


         {!filtered && billsList.length !== 0 && <button className={classes.btn} onClick={onSearchByIdForm}>Get bill by id</button>}
         {filtered && <button className={classes.btn} onClick={backToNotFiltered}>Back to bills </button>}
          {!filtered && <ul>{billsList}</ul>}
      
          {filtered && (
            <ul>
               <BillItem
                id={filteredBill.id}
                totalCost={filteredBill.totalCost}
                creditCard={filteredBill.creditCard}
                onViewDetail={onViewDetailModal}
               /> 
            </ul>
          )}
        </Card>
      )}
    </section>
  );
};

export default BillsList;
