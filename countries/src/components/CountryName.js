const CountryName = ({ name, handleClick}) => {
  return (
    <div>
      <p>{name}</p>
      <button onClick={handleClick}>Show Info</button>
    </div>
  );
};

export default CountryName;
