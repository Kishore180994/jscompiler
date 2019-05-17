import React from 'react';

/**
 * I'm `not` using this component for now.
 * Just stored this component for future 
 * purposes
 */
const Button = ({result, children}) => {
  let executeCode = () => {
    console.log(result);
  }
  return (
    <button onClick={executeCode}>{children}</button>
  );
};

export default Button;