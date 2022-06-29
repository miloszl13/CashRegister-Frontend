import { createSlice } from '@reduxjs/toolkit';

const billSlice=createSlice({
    name:'bill',
    initialState:{
        items: [],
        totalAmount: 0,
        totalBillPrice:0,
        billNumber:'a',
        creditCard:''
    },
reducers: {
  
    resetToInitial(state){
      state.items=[];
      state.totalAmount=0;
      state.totalBillPrice=0;
      state.billNumber='a';
      state.creditCard='';
    },
    createBill(state,action){
      const billNum=action.payload;
      state.billNumber=billNum;
    },
    setCreditCard(state,action){
      state.creditCard=action.payload
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.amount,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalBillPrice=state.totalBillPrice+(newItem.price*newItem.amount);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.totalBillPrice=state.totalBillPrice+newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalBillPrice=state.totalBillPrice-existingItem.price;
    },
  },
});

export const billActions = billSlice.actions;

export default billSlice;
