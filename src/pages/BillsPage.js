import React, { useEffect } from 'react'
import BillsList from '../components/Bill/BillsList';
import {useDispatch} from 'react-redux'
import { uiActions } from '../store/uiSlice';

function BillsPage() {
    const dispatch=useDispatch();
    const hideButtons=()=>{
        dispatch(uiActions.isOnBillsListPage())
      }

    useEffect(()=>{
        hideButtons();
       
    },[])

  return (
    <div>
        <BillsList/>
    </div>
  )
}

export default BillsPage