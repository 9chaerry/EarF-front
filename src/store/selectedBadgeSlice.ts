import { createSlice } from '@reduxjs/toolkit';
import { userInfo } from 'api/fetcher';
import { getToken } from 'api/token';
import { User } from 'types/types';

async function isLoggedIn(): Promise<string> {
  const userData: User = (await userInfo()) as User;
  const defaultBadge = userData.checkedBadge;
  return defaultBadge;
}

interface SelectedBadgeState {
  badge: string | Promise<string>;
}

const initialState: SelectedBadgeState = {
  badge: getToken() ? '신규' : isLoggedIn(),
};

const selectedBadgeSlice = createSlice({
  name: 'SelectedBadge',
  initialState,
  reducers: {
    setSelectedBadge: (state, action) => {
      state.badge = action.payload.badge;
    },
  },
});

export const { setSelectedBadge } = selectedBadgeSlice.actions;
export default selectedBadgeSlice;
