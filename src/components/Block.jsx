import React from "react";

const Block = (props) => {
  return (
    <div onClick={props.onCLick} className="block">
      <h1 style={props.value === "X" ? { color: "red" } : { color: "green" }}>
        {props.value}
      </h1>
    </div>
  );
};

export default Block;
