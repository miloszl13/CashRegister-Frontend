import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    cartIsVisible: false,
    billFormVisible: false,
    productFormVisible: false,
    createdBill: false,
    BillsListPage: false,
    billDetailIsVisible:false,
    BillById:false
  },
  reducers: {
    showCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    isOnBillsListPage(state) {
      state.BillsListPage = true;
    },
    isNotOnBillsListPage(state){
      state.BillsListPage=false;
    },
    showBillForm(state) {
      state.billFormVisible = !state.billFormVisible;
    },
    showBillButton(state) {
      state.createdBill = !state.createdBill;
    },
    showProductForm(state) {
      state.productFormVisible = !state.productFormVisible;
    },
    showBillDetail(state){
      state.billDetailIsVisible=true;
    },
    hideBillDetail(state){
      state.billDetailIsVisible=false;
    },
    
    hideBillByIdForm(state){
      state.BillById=false;
    },
    showBillByIdForm(state){
      state.BillById=true;
    },




    
    showNotification(state, action) {
      state.notification = {
        component:action.payload.component,
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setNotificationToNull(state){
      state.notification=null;
      
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
