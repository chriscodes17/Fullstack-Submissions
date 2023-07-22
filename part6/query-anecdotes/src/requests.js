import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (content) => {
  const newAnecdote = { content: content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const vote = async (anecdote) => {
  const { id } = anecdote;
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};
