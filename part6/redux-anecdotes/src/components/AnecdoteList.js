import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notificationHandler } from "../reducers/notificationReduce";

export default function AnecdoteList() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return [...anecdotes];
    }
    return anecdotes.filter((item) =>
      item.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const voteHandler = (ancedote) => {
    const { content } = anecdotes.find((item) => item.id === ancedote.id);
    dispatch(notificationHandler(`You voted for: ${content}`, 10));
    dispatch(vote(ancedote));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div style={{ display: "flex", gap: "10px" }} key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            - has {anecdote.votes} {""}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
