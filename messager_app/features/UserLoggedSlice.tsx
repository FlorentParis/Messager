import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useGetJWT from '../hook/useGetJWT';

const initialState = {
    JWT: '',
    user_id: -1,
}

interface UserInterface {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (form: UserInterface) => {
    const login = useGetJWT();
    return login(form.username, form.password).then(res => res);
  },
);

const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState: initialState,
    reducers: {
        setLoggedUser: (state, action) => {
            console.log('work');
            /* state.JWT = action.payload.JWT; */
        },
        logoutLoggedUser: state => (state = initialState),
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.JWT = payload.JWT;
            state.user_id = payload.user_id;
        });
    },
});

export const {setLoggedUser} = userLoggedSlice.actions;
export default userLoggedSlice.reducer;

export const userSelector = (state: any) => state.userLogged;
