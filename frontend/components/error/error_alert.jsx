import React from "react";
import { Popup } from "../widgets";

/**
 * @param {string[]} errors
 */
const ErrorAlert = ({errors}) => {
  return errors.length > 0 ? <Popup>
    <ul>
      { errors.map((error, idx) => <li key={`error-${idx}`}>{ error }</li>) }
    </ul>
  </Popup> : null
}

export default ErrorAlert;