///bind react application
import {createSlice,configureStore} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:"auth",
    initialState:{
        // isLogin:false
        isLogin: localStorage.getItem('isLogin') === 'true',
    },
    reducers:{
        login(state){
            state.isLogin=true
            localStorage.setItem('isLogin', 'true');
        },
        logout(state){
            state.isLogin=false
            localStorage.setItem('isLogin', 'false');
        }
    }
})

export const authActions=authSlice.actions

export const store=configureStore({
    reducer:authSlice.reducer,
})
// ///bind react application
// import {createSlice,configureStore} from '@reduxjs/toolkit'

// const authSlice=createSlice({
//     name:"auth",
//     initialState:{
//         isLogin:false
//     },
//     reducers:{
//         login(state){
//             state.isLogin=true
//         },
//         logout(state){
//             state.isLogin=false
//         }
//     }
// })

// export const authActions=authSlice.actions

// export const store=configureStore({
//     reducer:authSlice.reducer,
// })