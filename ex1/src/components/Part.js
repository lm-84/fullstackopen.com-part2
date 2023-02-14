import React from "react";

const Part = (props) => {
  console.log(props);
  return (
    <div key={props.part.key}>
      {props.part.name} {props.part.exercises}
    </div>
  );
};

export default Part;
