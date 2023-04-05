import Person from "./Person";

const DisplayPersons = ({ persons, filterName, removePerson }) => {
  const personsToShow = !filterName
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName)
      );
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          removePerson={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default DisplayPersons;
