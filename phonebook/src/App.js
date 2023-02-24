import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
            setConfirmMessage("Updated " + newName);
            setTimeout(() => setConfirmMessage(""), 5000);
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
          setConfirmMessage("Added " + newName);
          setTimeout(() => setConfirmMessage(""), 5000);
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
        setConfirmMessage("Database read");
        setTimeout(() => setConfirmMessage(""), 5000);
      })
      .catch((error) => {
        alert("an error has ocurred reading the data base");
      });
  }, []);

  const handleDelete = (personToDelete) => {
    if (
      window.confirm(`Do you really want to delete ${personToDelete.name}?`)
    ) {
      const personsAux = persons;
      const FilteredPersonsAux = filteredPersons;
      personService
        .erase(personToDelete.id)
        .then((response) => {
          setPersons(
            personsAux.filter((person) => person.name !== personToDelete.name)
          );
          setFilteredPersons(
            FilteredPersonsAux.filter(
              (person) => person.name !== personToDelete.name
            )
          );
          setConfirmMessage("Deleted " + personToDelete.name);
          setTimeout(() => setConfirmMessage(""), 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personToDelete.name} has already been removed from server`
          );
          setPersons(
            personsAux.filter((person) => person.name !== personToDelete.name)
          );
          setFilteredPersons(
            FilteredPersonsAux.filter(
              (person) => person.name !== personToDelete.name
            )
          );
          setTimeout(() => setErrorMessage(""), 5000);
        });
    }
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={confirmMessage} classText={"message"} />
      <Notification message={errorMessage} classText={"error"} />
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
