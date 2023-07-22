import { createNew } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import notificationContext from "../NotificationContext";
import { notificationActionHandler } from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(notificationContext);
  const queryClient = useQueryClient();
  const mutation = useMutation(createNew, {
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(data));
    },
    onError: (error) => {
      console.log(error)
      notificationActionHandler(`Error: ${error.response.data.error}`)(dispatch);
    },
  });
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    mutation.mutate(content);
    notificationActionHandler(`New anecdote added - ${content}`)(dispatch);
    event.target.anecdote.value = "";
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
