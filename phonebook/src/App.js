import React, { useState } from "react";

const Header = (props) => {
  return <h2>{props.text}</h2>;
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return props.persons.map((person) => (
    <Person name={person.name} number={person.number} />
  ));
};

const Person = (props) => {
  return (
    <div key={props.name}>
      {props.name} {props.number}
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  function includesName(persons, name) {
    return persons.map((person) => person.name).includes(name);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (includesName(persons, newName)) {
      alert(newName + " is already added to phonebook");
      return;
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter filter={filter} handleFilter={handleFilter} />
      <Header text="Add new" />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <Header text="Numbers" />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
