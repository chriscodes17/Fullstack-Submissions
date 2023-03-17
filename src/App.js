import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const DisplayAnecdote = ({ text, value }) => {
  return (
    <div>
      <p>{text}</p>
      <p>This has {value || 0} votes</p>
    </div>
  );
};

const DisplayMostVote = ({ points, anecdotes }) => {
  if (!Object.keys(points).length) {
    return <div>No votes yet!</div>;
  }
  const pointsKeys = Object.keys(points);
  const highestValueIndex = pointsKeys.reduce((acc, key) => {
    if (points[acc] < points[key]) {
      acc = key;
      return acc;
    }
    return acc;
  }, pointsKeys[0]);
  return (
    <div>
      <p>{anecdotes[highestValueIndex]}</p>
      <p>Has {points[highestValueIndex]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  const handleRandomize = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const handleVote = () => {
    const pointsCopy = { ...points };
    pointsCopy[selected] = pointsCopy[selected] + 1 || 1; //if value exisits in obj, add by 1. Else set initial value to 1 on first click.
    setPoints(pointsCopy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} value={points[selected]} />
      <Button handleClick={handleRandomize} text="Randomize" />
      <Button handleClick={handleVote} text="Vote" />
      <h1>Anecdote with the most votes</h1>
      <DisplayMostVote points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
