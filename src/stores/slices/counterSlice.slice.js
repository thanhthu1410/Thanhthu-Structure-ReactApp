import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const findAllUsers = createAsyncThunk(
    "findAllUser",
    async () => {
        let result = axios.get(process.env.REACT_APP_SERVER_JSON + 'users')
       return (await result).data
        
    }
)
const counterSlice = createSlice({
    name : "counter",
    initialState:{
        counter : 0,
        loading : false,
        users : []
    },
    reducers: {
        increase: (state,action) => {
            return {
                ...state,counter : state.counter + 1
            } 
        },
        decrease: (state,action) => (
            {...state,counter:state.counter - 1}
        ),
        setCounter: (state,action) => ({
            ...state, counter : action.payload.number
        }),
        
    },
    extraReducers:  (builder)=>{
            // find all users
            builder.addCase(findAllUsers.pending,(state,action) => {
                state.loading = true
                console.log("da vao pending",action.payload);
            });
            builder.addCase(findAllUsers.fulfilled,(state,action) => {
                state.loading = false;
                state.users = [...action.payload]

                console.log("da load xong",action.payload);
            });
            builder.addCase(findAllUsers.rejected,(state,action) => {
                state.loading = false
                console.log("rejected",action.payload);
            })
    }
})


export const counterActions = {
    ... counterSlice.actions,findAllUsers
}
export default counterSlice.reducer