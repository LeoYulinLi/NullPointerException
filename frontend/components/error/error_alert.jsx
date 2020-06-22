import React from "react";

/**
 * @param {string[]} errors
 */
const ErrorAlert = ({errors}) => {
  return errors && <div className="alert danger">
    <ul>
      { errors.map((error, idx) => <li key={`error-${idx}`}>{ error }</li>) }
    </ul>
  </div>
}

export default ErrorAlert;