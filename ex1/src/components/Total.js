import React from "react";

const getSumExercises = (parts) => {
  return parts.reduce((sum, part) => sum + part.exercises, 0);
};

const Total = (props) => {
  return <b>total of {getSumExercises(props.parts)} exercises</b>;
};

export default Total;
