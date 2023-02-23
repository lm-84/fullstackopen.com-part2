import React, { useState, useEffect } from "react";
import personService from "./services/persons";

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
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
      handleDelete={() => props.handleDelete(person)}
    />
  ));
};

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}{" "}
      <button onClick={() => props.handleDelete(props.person)}>delete</button>
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
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
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
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  function includesName(persons, name) {
    return persons.map((person) => person.name).includes(name);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    if (includesName(persons, newName)) {
      if (
        window.confirm(
          newName +
            " is already added to phonebook, replace the old number with a new one?"
        ) === true &&
        newName !== ""
      ) {
        personService
          .update(
            persons.find((person) => person.name === newName).id,
            personObject
          )
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : response
              )
            );
            setFilteredPersons(
              filteredPersons.map((person) =>
                person.name !== newName ? person : response
              )
            );
          })
          .catch((error) => {
            alert("an error has occurred updating the person");
          });
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          const personsNew = [...persons, response];
          setPersons(personsNew);
          setFilteredPersons(personsNew);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert("an error has occurred saving the new person");
        });
    }
  };

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
        setFilteredPersons(persons);
      })
      .catch((error) => {
        alert("an error has ocurred reading the data base");
      });
  }, []);

  const handleDelete = (personToDelete) => {
    if (
      window.confirm(`Do you really want to delete ${personToDelete.name}?`)
    ) {
      personService
        .erase(personToDelete.id)
        .then((response) => {
          const personsAux = persons;
          setPersons(
            personsAux.filter((person) => person.name !== personToDelete.name)
          );
          setFilteredPersons(
            personsAux.filter((person) => person.name !== personToDelete.name)
          );
        })
        .catch((error) => {
          alert("An error has occurred deleting the person");
        });
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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
