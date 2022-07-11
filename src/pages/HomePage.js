import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillForm from "../components/Bill/BillForm";
import { uiActions } from "../store/uiSlice";
import ProductForm from "../components/Product/ProductForm";
import "../index.css";
import AvailableMeals from "../components/Meals/AvailableMeals";
import CurrencyExchangeForm from "../components/CurrencyExchange/CurrencyExchangeForm";
//
//
import CreateNewUserForm from '../components/Auth/CreateNewUser'
import UpdateProductForm from '../components/Product/UpdateProductForm'

function HomePage() {
  const displayBillForm = useSelector((state) => state.ui.billFormVisible);
  const displayCurrExch = useSelector((state) => state.ui.currEchFormVisible);
  const displayUpdateProductForm = useSelector(state=>state.ui.updateProductFormVisible)
  const [createdProduct, setCreatedProduct] = useState(false);
//
//
//
const displayProductForm = useSelector((state) => state.ui.productFormVisible);
const dispatch = useDispatch();
const adminsMeals = useSelector((state) => state.ui.showAdminsMeals);
const newUserForm = useSelector((state) => state.ui.createUserForm);
const adminsName = useSelector((state) => state.ui.adminsName);
const adminsLastname = useSelector((state) => state.ui.adminsLastName);
const initial = useSelector(state=>state.ui.initialAdminsPage);
const admin=useSelector(state=>state.ui.adminsPage)
//
//
//
  const showBillForm = () => {
    dispatch(uiActions.showBillForm());
    dispatch(uiActions.setNotificationToNull());
  };

  const onCloseCurrExch = () => {
    dispatch(uiActions.showCurrExchForm());
  };

  const showProductForm = () => {
    dispatch(uiActions.showProductForm());
    setCreatedProduct((prevState) => !prevState);
    console.log(createdProduct);
    dispatch(uiActions.setNotificationToNull());
  };

  const closeUpdateProductForm=()=>{
    dispatch(uiActions.showUpdateProductForm())
  }

  useEffect(() => {
    dispatch(uiActions.isNotOnBillsListPage());
  }, [createdProduct, dispatch]);

  return (
    <div>
      {initial && admin && <div className="title">
        <h4>Welcome {adminsName} {adminsLastname}</h4>
      </div>}
  
      {(!admin || (!initial && adminsMeals)) && <AvailableMeals />}
      {!initial && newUserForm && admin &&  <CreateNewUserForm />}
      
      {displayBillForm && <BillForm onClose={showBillForm} />}
      {displayProductForm && <ProductForm onClose={showProductForm} />} 
      {displayCurrExch && <CurrencyExchangeForm onClose={onCloseCurrExch} />}
      {displayUpdateProductForm && <UpdateProductForm onClose={closeUpdateProductForm}/>}
    </div>
  );
}

export default HomePage;
