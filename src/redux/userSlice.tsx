import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IState {
    _id: string;
    name: string;
    email: string;
    profile_pic: string;
    token: string;
}

const initialState: IState = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profile_pic = action.payload.profile_pic;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state, action: PayloadAction<void>) => {
            state._id = '';
            state.name = '';
            state.email = '';
            state.profile_pic = '';
        },
    },
});

// Action
export const { setUser, setToken, logout } = userSlice.actions;

//Selector
// export const getUserCurrentSelector = (state: RootState) => state.userSlice.user;
// export const getIsFetching = (state: RootState) => state.userSlice.isFetching;
// export const getIsErrorSelector = (state: RootState) => state.userSlice.error;
// export const getIsSuccessSelector = (state: RootState) => state.userSlice.success;

export default userSlice.reducer;
