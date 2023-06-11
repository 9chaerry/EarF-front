import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: '',
};

const postingSlice = createSlice({
  name: 'posting',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setTitle, setContent } = postingSlice.actions;
export default postingSlice.reducer;
