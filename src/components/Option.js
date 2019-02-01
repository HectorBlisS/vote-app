import React from "react";

const Option = ({
  image,
  title,
  student,
  selected,
  id,
  onClick,
  votesNumber
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={selected ? "card selected" : votesNumber ? "disabled" : "card"}
    >
      <div className="container">
        <h4>
          <b>{student.username || "Sin nombre"}</b>
        </h4>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Option;
