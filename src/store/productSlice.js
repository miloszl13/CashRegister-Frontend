import { createSlice } from '@reduxjs/toolkit';

const productSlice=createSlice({
    name:'products',
    initialState:{
        items: [],
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
    }


}
})

export const productActions = productSlice.actions;

export default productSlice;
