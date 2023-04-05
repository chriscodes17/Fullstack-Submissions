const Filter = ({ handleFilterName, filterName }) => {
  return (
    <div>
      Filter: <input onChange={handleFilterName} value={filterName} />
    </div>
  );
};

export default Filter;
