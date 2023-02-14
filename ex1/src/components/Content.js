import React from "react";
import Part from "./Part";

const Content = (props) => {
  console.log(props);
  return props.parts.map((part) => <Part key={part.id} part={part} />);
};

export default Content;
