import { createSlice } from '@reduxjs/toolkit';

const billsHistorySlice=createSlice({
    name:'billHistory',
    initialState:{
        history: [],
    },
reducers: {
    addBill(state,action){
        state.history= [...state.history,action.payload]
    },
    deleteBill(state,action){
        state.history= [...state.history.filter(bill=>bill.bill_number!==action.payload.bill_number)]
    },
    setToEmpty(state){
        state.history=[];
    }


}
})

export const billsHistoryActions = billsHistorySlice.actions;

export default billsHistorySlice;
