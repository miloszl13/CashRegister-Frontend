import React,{  useEffect } from 'react'
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
  
    const onOpenBillForm=()=>{
      dispatch(uiActions.showBillForm());
    }
    const onCreateBill=()=>{
      dispatch(uiActions.showBillButton())
      dispatch(uiActions.showBillForm());
    }
    
    const onOpenProductForm=()=>{
      dispatch(uiActions.showProductForm());
    }
    const onCreateProduct=()=>{
  
    }
    

    useEffect(()=>{
      dispatch(uiActions.isNotOnBillsListPage())
    },[])
  
    return (

        <div>
          <Meals/>
          {displayBillForm && <BillForm onClose={onOpenBillForm} onCreate={onCreateBill}/>}
          {displayProductForm && <ProductForm onClose={onOpenProductForm} onCreate={onCreateProduct}/>}
        </div>

    );
  }
  
  export default HomePage;