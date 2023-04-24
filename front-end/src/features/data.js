import {createSlice} from "@reduxjs/toolkit";
import generateAvatar from "../modules/generateAvatar";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        value: {
            myUser: null,
            users: []
        }
    },
    reducers: {
        setUsers: (state, action) => {
            state.value.users = action.payload.map(user => ({
                ...user,
                avatarUrl: generateAvatar(user.email)
            }));
        },
        setMyUser: (state, action) => {
            state.value.myUser = {
                ...action.payload,
                avatarUrl: generateAvatar(action.payload.email)
              };
        },
    }
})

export const {
    setUsers,
    setMyUser
} = dataSlice.actions

export default dataSlice.reducer;