import React from 'react';

const Display = ({ previousValue, operator, display }) => {
  return (
    <div className="display">
      <div className="previous-value">{previousValue}</div>
      <div className="operator-row">{operator}</div>
      <div className="number-row">{display}</div>
    </div>
  );
};

export default Display;