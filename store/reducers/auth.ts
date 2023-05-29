import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  username: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null
};

export const login = createAsyncThunk('user/login',
  async (params : dataLogin ,{rejectWithValue}) => {
    const {username, password } = params;
    const response = await axios.post('https://api.realworld.io/api/users/login',{
      user : {email:username, password }
    }).then(res => res).catch(error => error)
    if(!response.status){
      return rejectWithValue(response)
    }
     return response
  }

)
export const register = createAsyncThunk('user/register', 
  async (params : dataRegister, {rejectWithValue}) => {
    const {username, email, password} = params;
    const response = await axios.post('https://api.realworld.io/api/users',{
      user: {email, password, username}
    }).then(res => res).catch(error => error)

    if(!response.status){
      return rejectWithValue(response)
    }
    return response;
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLocal : (state)=> {
    let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    isLogged = JSON.parse(isLogged);
    state.username = isLogged?.username;
    },
    logout: () => {
      localStorage.removeItem('isLogin');
      return initialState
    } 
  },
  extraReducers:(builder) => {
    builder.addCase(login.pending,(state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled,(state,action) => {
      state.isLoggedIn = true;
      const { user : { username , token} } = action.payload.data;
      state.username = username;
      state.token = token;
    });
    builder.addCase(login.rejected,(state, action : any ) => {
      state.isLoading = false;
      state.error =  action.payload.response.data.errors
    });
    builder.addCase(register.pending,(state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled,(state, action : any) => {
      state.isLoggedIn = true;
      const { user : { username, token } } = action.payload.data;
      state.username = username;
      state.token = token;
    });
    builder.addCase(register.rejected,(state, action : any) => {
      state.isLoading = false;
      state.error = action.payload.response.data.errors;
    })
  }

});

export const {
  setLocal,
  logout
} = authSlice.actions;

export default authSlice.reducer;

