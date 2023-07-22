import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll, vote } from "./requests";
import { useContext } from "react";
import notificationContext from "./NotificationContext";
import { notificationActionHandler } from "./NotificationContext";

const App = () => {
  const [notification, dispatch] = useContext(notificationContext);
  const { data, isError, isLoading} = useQuery("anecdotes", getAll);
  const queryClient = useQueryClient();

  const voteMutation = useMutation(vote, {
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((item) => (item.id === data.id ? data : item))
      );
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    notificationActionHandler(`Voted for - ${anecdote.content}`)(dispatch);
  };

  const anecdotes = data;

  if (isLoading) {
    return <span>Loading ....</span>;
  }

  if (isError) {
    return <div>Anecdote service is not avaliable due to issues with the server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div
          style={{ marginBottom: "15px", border: "1px solid black", padding: "0.5rem" }}
          key={anecdote.id}
        >
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes {""}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
