import React, { useCallback, useEffect } from 'react'
import BillsList from '../components/Bill/BillsList';
import {useDispatch,useSelector} from 'react-redux'
import { uiActions } from '../store/uiSlice';

function BillsPage() {
    const dispatch=useDispatch();
    const hidedBtn=useSelector(state=>state.ui.BillsListPage);

    const hideButtons=useCallback(()=>{
        dispatch(uiActions.isOnBillsListPage())
      },[dispatch]);
    
    useEffect(()=>{
        
      hideButtons();
        
    },[hideButtons,hidedBtn])
    
   

  return (
  <div>
     
        
        <BillsList />
    </div>
 
        
  )
}

export default BillsPage;