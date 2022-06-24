import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import billSlice from './billSlice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, bill: billSlice.reducer },
});

export default store;