import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    cartIsVisible: false,
    billFormVisible: false,
    productFormVisible: false,
    //
    updateProductFormVisible:false,
    //
    BillsListPage: false,
    billDetailIsVisible:false,
    BillById:false,
    currEchFormVisible:false,


    adminsPage:false,
    showAdminsMeals:false,
    createUserForm:false,
    adminsName:'',
    adminsLastName:'',
    initialAdminsPage:true,
  },
  reducers: {
    showUpdateProductForm(state){
     state.updateProductFormVisible =  !state.updateProductFormVisible;
    },

    onInitialAdminsPage(state){
      state.initialAdminsPage=true;
    },
    notOnInitialAdminsPage(state){
     state.initialAdminsPage=false;
    },



    showAdminsMeals(state){
      state.showAdminsMeals=true;
    },
    hideAdminsMeals(state){
      state.showAdminsMeals=false;
    },




    setAdminsName(state,action){
      state.adminsName=action.payload;
    },
    setAdminsLastName(state,action){
      state.adminsLastName=action.payload;
    },




    showCreateUserForm(state){
      state.createUserForm=true;
    },
    hideCreateUserForm(state){
      state.createUserForm=false;
    },
  


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



    showCurrExchForm(state){
      state.currEchFormVisible=!state.currEchFormVisible;
    },



    isOnAdminsPage(state){
      state.adminsPage=true;
    },
    isNotOnAdminPage(state){
      state.adminsPage=false;
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
