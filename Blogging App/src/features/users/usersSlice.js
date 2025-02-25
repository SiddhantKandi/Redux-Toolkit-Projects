import { createSlice, createAsyncThunk,createSelector } from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
})

const initialState = []

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return [...action.payload];
        })
    }
});

export const selectAllUsers = (state) => state.users;

const selectUserId = (_,userId) => userId;

export const selectUserById = createSelector(
    [selectAllUsers,selectUserId], //dependencies
    (users,userId) => users.find(user => user.id === userId)
)

export default usersSlice.reducer;