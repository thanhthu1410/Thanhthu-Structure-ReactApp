import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const findAllUsers = createAsyncThunk(
    "findAllUser",
    async () => {
        let result = axios.get(process.env.REACT_APP_SERVER_JSON + 'users')
        return (await result).data

    }
)


const createNewUsers = createAsyncThunk(
    "createNewUsers",
    async (newUser) => {
        let result = axios.post(process.env.REACT_APP_SERVER_JSON + 'users', newUser)
        return (await result).data

    }
)

const deleUserById = createAsyncThunk(
    "deleUserById",
    async (userId) => {
        let result = axios.delete(process.env.REACT_APP_SERVER_JSON + 'users/' + userId)
        return userId

    }
)

// update user 
const updateUser = createAsyncThunk(
    "updateUser",
    async (dataObj) => {
        console.log("userId edit", dataObj);
        let result = axios.put(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.editData)
        return (await result).data

    }
)

const setStatusUser = createAsyncThunk(
    "setStatusUser",
    async (dataObj) => {
        console.log("userId edit", dataObj);
        let result = axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.patchData)
        return (await result).data

    }
)
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        counter: 0,
        loading: false,
        users: []
    },
    reducers: {
        increase: (state, action) => {
            return {
                ...state, counter: state.counter + 1
            }
        },
        decrease: (state, action) => (
            { ...state, counter: state.counter - 1 }
        ),
        setCounter: (state, action) => ({
            ...state, counter: action.payload.number
        })

    },
    extraReducers: (builder) => {
        // find all users
        builder.addCase(findAllUsers.pending, (state, action) => {
            state.loading = true
            console.log("da vao pending", action.payload);
        });
        builder.addCase(findAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = [...action.payload]
            // console.log("da load xong",action.payload);
        });
        builder.addCase(findAllUsers.rejected, (state, action) => {
            state.loading = false
            // console.log("rejected",action.payload);
        })

        //create new user
        builder.addCase(createNewUsers.pending, (state, action) => {
            state.loading = true
            // console.log("da vao pending",action.payload);
        });
        builder.addCase(createNewUsers.fulfilled, (state, action) => {
            state.loading = false;
            console.log("addnew user", action.payload);
            state.users.push(action.payload)

        });
        builder.addCase(createNewUsers.rejected, (state, action) => {
            state.loading = false

        })

        /// deleteUser 
        builder.addCase(deleUserById.pending, (state, action) => {
            state.loading = true
            console.log("da vao delete", action.payload);
        });
        builder.addCase(deleUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter((user) => user.id !== action.payload)
            console.log("delete xong", action.payload);

        });
        builder.addCase(deleUserById.rejected, (state, action) => {
            state.loading = false

        })

        // updateUser

        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true
            console.log("da vao edit", action.payload);
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            state.users = state.users.map((user) => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })


        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false

        })

        /// set status user 
        
        builder.addCase(setStatusUser.pending, (state, action) => {
            state.loading = true
            console.log("da vao edit", action.payload);
        });
        builder.addCase(setStatusUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log("da vao fulfill set status" ,action );
            state.users = state.users.map((user) => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })
        });
        builder.addCase(setStatusUser.rejected, (state, action) => {
            state.loading = false

        })
    }
})


export const counterActions = {
    ...counterSlice.actions
    , findAllUsers,
    createNewUsers,
    deleUserById,
    updateUser,
    setStatusUser
}
export default counterSlice.reducer