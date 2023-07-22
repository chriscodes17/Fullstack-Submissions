import { createSlice } from "@reduxjs/toolkit";
import ancedoteService from "../services/ancedote";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAction(state, action) {
      return state.map((item) => (item.id === action.payload.id ? action.payload : item));
    },
    setAncedote(state, action) {
      return action.payload;
    },
    appendAncedote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { voteAction, setAncedote, appendAncedote } = anecdoteSlice.actions;

export const initializeAncedotes = () => {
  return async (dispatch) => {
    const response = await ancedoteService.getAll();
    dispatch(setAncedote(response));
  };
};

export const createAncedote = (content) => {
  return async (dispatch) => {
    const response = await ancedoteService.createNew(content);
    dispatch(appendAncedote(response));
  };
};

export const vote = (ancedote) => {
  return async (dispatch) => {
    const updatedObj = { ...ancedote, votes: ancedote.votes + 1 };
    const response = await ancedoteService.update(ancedote.id, updatedObj);
    dispatch(voteAction(response));
  };
};

export default anecdoteSlice.reducer;
