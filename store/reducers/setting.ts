import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popup : false,
    themeRoot : 'dark',
    lang : 'en',
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
        },
        setLang: (state, action) => {
            state.lang = action.payload
        }
    }

})

export const {
    setPopup,
    setTheme,
    setLang
} = settingSlice.actions;

export default settingSlice.reducer;





