import React,{  useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Meals from '../components/Meals/Meals';
import BillForm from '../components/Bill/BillForm';
import { uiActions } from '../store/uiSlice';
import ProductForm from '../components/Product/ProductForm';
import '../index.css'

function HomePage() {
    const dispatch=useDispatch();
    const displayBillForm=useSelector(state=>state.ui.billFormVisible)
    const displayProductForm=useSelector(state=>state.ui.productFormVisible)
    const [createdProduct,setCreatedProduct]=useState(false);
  
    const onOpenBillForm=()=>{
      dispatch(uiActions.showBillForm());
     
    }
    const onCreateBill=()=>{
      dispatch(uiActions.showBillButton())
      dispatch(uiActions.showBillForm());
    }
    
    const onOpenProductForm=()=>{
      dispatch(uiActions.showProductForm());
      setCreatedProduct(prevState=>!prevState)
      console.log(createdProduct)
    }
   
    

    useEffect(()=>{
      dispatch(uiActions.isNotOnBillsListPage())
    },[createdProduct,dispatch])
  
    return (

        <div>
          <Meals/>
          {displayBillForm && <BillForm onClose={onOpenBillForm} onCreate={onCreateBill} />}
          {displayProductForm && <ProductForm onClose={onOpenProductForm} />}
        </div>

    );
  }
  
  export default HomePage;