import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popup : false,
    themeRoot : 'dark',
}

const settingSlice = createSlice({
    name:'setting',
    initialState,
    reducers : {
        setPopup: (state, action) => {
            state.popup = action.payload
        },
        setTheme: (state, action) => {
            state.themeRoot = action.payload
        }
    }

})

export const {
    setPopup,
    setTheme
} = settingSlice.actions;

export default settingSlice.reducer;





