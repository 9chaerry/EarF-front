import { createSlice } from '@reduxjs/toolkit';

interface SelectedBadgeState {
  badge: string;
}

const initialState: SelectedBadgeState = {
  badge: '신규',
};

const selectedBadgeSlice = createSlice({
  name: 'selectedBadge',
  initialState,
  reducers: {
    setSelectedBadge: (state, action) => {
      state.badge = action.payload.badge;
    },
  },
});

export const { setSelectedBadge } = selectedBadgeSlice.actions;
export default selectedBadgeSlice;
