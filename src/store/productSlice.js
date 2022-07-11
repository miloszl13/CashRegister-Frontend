import { createSlice } from '@reduxjs/toolkit';

const productSlice=createSlice({
    name:'products',
    initialState:{
        items: [],
        selectedProductId:0
    },
reducers: {
    addProduct(state,action){
        state.items= [...state.items,action.payload]
    },
    deleteProduct(state,action){
        state.items= [...state.items.filter(item=>item.product_id!==action.payload.product_id)]
    },
    setToEmpty(state){
        state.items=[];
    },

    

    setSelecetedProductId(state,action){
      state.selectedProductId=action.payload;  
    },
    resetSelectedProductId(state){
      state.selectedProductId=0;
    }

}
})

export const productActions = productSlice.actions;

export default productSlice;
