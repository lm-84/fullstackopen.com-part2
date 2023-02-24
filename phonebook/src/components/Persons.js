import React from "react";
import Person from "./Person";

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

export default Persons;
