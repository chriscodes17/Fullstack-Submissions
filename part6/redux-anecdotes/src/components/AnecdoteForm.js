import { useDispatch } from "react-redux";
import { createAncedote } from "../reducers/anecdoteReducer";
import { notificationHandler } from "../reducers/notificationReduce";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    if (event.target.input.value === "") return;
    const content = event.target.input.value;
    dispatch(notificationHandler(`You added: ${content}`, 10));
    event.target.input.value = "";
    dispatch(createAncedote(content));
  };
  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input name="input" />
      </div>
      <button>create</button>
    </form>
  );
}
