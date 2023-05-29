import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popup : false,
    theme : 'dark'
}

const settingSlice = createSlice({
    name:'setting',
    initialState,
    reducers : {
        setPopup: (state, action) => {
            state.popup = action.payload
        },
        setTheme: (state, action) => {
            state.popup = action.payload
        }
    }

})

export const {
    setPopup
} = settingSlice.actions;

export default settingSlice.reducer;





