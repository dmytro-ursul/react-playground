import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  value: string | null;
}

const initialState: TokenState = {
  value: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    removeToken: (state) => {
      state.value = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
