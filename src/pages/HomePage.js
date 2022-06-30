import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillForm from "../components/Bill/BillForm";
import { uiActions } from "../store/uiSlice";
import ProductForm from "../components/Product/ProductForm";
import "../index.css";
import AvailableMeals from "../components/Meals/AvailableMeals";

function HomePage() {
  const dispatch = useDispatch();
  const displayBillForm = useSelector((state) => state.ui.billFormVisible);
  const displayProductForm = useSelector((state) => state.ui.productFormVisible);
  const [createdProduct, setCreatedProduct] = useState(false);

  
  const onOpenBillForm = () => {
    dispatch(uiActions.showBillForm());
    dispatch(uiActions.setNotificationToNull())

  };


  const onOpenProductForm = () => {
    dispatch(uiActions.showProductForm());
    setCreatedProduct((prevState) => !prevState);
    console.log(createdProduct);
    dispatch(uiActions.setNotificationToNull())
  };

  useEffect(() => {
    dispatch(uiActions.isNotOnBillsListPage());
  }, [createdProduct, dispatch]);

  
  return (
    <div>
      <AvailableMeals />
      {displayBillForm && <BillForm onClose={onOpenBillForm} />}
      {displayProductForm && <ProductForm onClose={onOpenProductForm} />}
    </div>
  );
}

export default HomePage;
