import React from "react";

const Alert = (props) => {
  const colorClasses = {
    red: "bg-red-100 border-red-500 text-red-700",
    green: "bg-green-100 border-green-500 text-green-700",
    orange: "bg-orange-100 border-orange-500 text-orange-700",
    blue: "bg-blue-100 border-blue-500 text-blue-700",
  };
  const { heading, message, color } = props;
  const colorClass = colorClasses[color];

  return (
    <div className={`${colorClass} p-4`} role="alert">
      <p className="font-bold">{heading}</p>
      <p>{message}.</p>
    </div>
  );
};

export default Alert;
