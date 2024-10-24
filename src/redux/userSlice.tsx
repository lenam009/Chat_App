import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const initialState: IUserSlice = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    token: '',
    onlineUser: [],
    socketConnection: null,
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
            state.token = '';
            state.socketConnection = null;
        },
        setOnlineUser: (state, action: PayloadAction<string[]>) => {
            state.onlineUser = action.payload;
        },
        setSocketConnection: (state, action: PayloadAction<Socket<DefaultEventsMap, DefaultEventsMap>>) => {
            //@ts-ignore
            state.socketConnection = action.payload;
        },
    },
});

// Action
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } = userSlice.actions;

//Selector
// export const getUserCurrentSelector = (state: RootState) => state.userSlice.user;
// export const getIsFetching = (state: RootState) => state.userSlice.isFetching;
// export const getIsErrorSelector = (state: RootState) => state.userSlice.error;
// export const getIsSuccessSelector = (state: RootState) => state.userSlice.success;

export const getUser = (state: RootState) => state.userSlice;

export default userSlice.reducer;
