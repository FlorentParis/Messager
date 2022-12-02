import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user_id: -1,
  channel: {},
};

const ChannelSlice = createSlice({
  name: 'channel',
  initialState: initialState,
  reducers: {
    setUserChoice: (state, action) => {
      state.user_id = action.payload;
    },
  },
});

export const {setUserChoice} = ChannelSlice.actions;
export default ChannelSlice.reducer;

export const userSelector = (state: any) => state.channel;
