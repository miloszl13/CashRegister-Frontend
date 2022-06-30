import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import billSlice from './billSlice';
import productSlice from './productSlice';
import billsHistorySlice from './billHistorySlice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, bill: billSlice.reducer,products:productSlice.reducer,billsHistory:billsHistorySlice.reducer },
});

export default store;