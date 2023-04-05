import { useState, useEffect } from "react";
import personService from "./services/persons";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const clearInputs = () => {
    setNewName("");
    setnewNumber("");
  };

  const updateNumber = (person) => {
    const confirm = window.confirm(
      `${newName} already exists, would you like to replace the old number with the new one?`
    );
    if (confirm) {
      const personUpdate = { ...person, number: newNumber };
      personService.update(person.id, personUpdate).then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : updatedPerson))
        );
        handleMessage(
          `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`
        );
        clearInputs();
      });
    }
    clearInputs();
    return;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      updateNumber(person);
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObj).then((person) => {
      setPersons(persons.concat(person));
      handleMessage(`Added ${person.name}`);
      clearInputs();
    });
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
      return;
    }
    return;
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setnewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterName={handleFilterName} filterName={filterName} />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <DisplayPersons
        persons={persons}
        filterName={filterName}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
