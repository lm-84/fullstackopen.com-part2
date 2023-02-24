import React from "react";

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}{" "}
      <button onClick={() => props.handleDelete(props.person)}>delete</button>
    </div>
  );
};

export default Person;
