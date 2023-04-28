import {createSlice} from '@reduxjs/toolkit';
export const TutorsSlice = createSlice({
  name: 'TutorsSlice',
  initialState: {
    allTutors: null,
    user : null
  },
  reducers: {
    setAllTutors: (state, action) => {
      state.allTutors = action.payload;
    },
  },
});
export const {setAllTutors} = TutorsSlice.actions;
export default TutorsSlice.reducer;
