const PersonForm = ({
  addPerson,
  handleNewName,
  handleNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        Number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">Add Person</button>
      </div>
    </form>
  );
};

export default PersonForm;
