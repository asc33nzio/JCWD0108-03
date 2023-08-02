import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionData: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionData: (state, action) => {
      state.transactionData = action.payload;
    },
  },
});

export const { setTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;