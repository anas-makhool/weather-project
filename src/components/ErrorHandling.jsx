import React from "react";

const ErrorHandling = ({ children }) => {
  return (
    <div>
      <h1>Oops!</h1>
      <h3>{children}</h3>
    </div>
  );
};

export default ErrorHandling;
