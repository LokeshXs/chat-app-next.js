import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit"


type AppBarType = {
    isSideBarOpen:boolean
}


const initialState:AppBarType = {
    isSideBarOpen:false
}


export const ChatAppBarSlice = createSlice({
    name:"app bar slice",
    initialState,
    reducers:{
        toggleSideBar:(state)=>{
            state.isSideBarOpen = !state.isSideBarOpen
        }
    }
})


export const {toggleSideBar} = ChatAppBarSlice.actions;

export default ChatAppBarSlice.reducer;