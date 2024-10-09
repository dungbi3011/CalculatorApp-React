import { useState, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [operator, setOperator] = useState("");
  const [previousValue, setPreviousValue] = useState("");

  const onClickHandler = (value) => {
    if (value === " = ") {
      // Handle equals
      if (previousValue && operator) {
        const result = eval(previousValue + operator + display);
        setOperator("");
        setDisplay(result.toString());
        setPreviousValue(result.toString());
      } else if (previousValue && !operator) {
        // If there's a previous value but no operator, set the operator
        setOperator(value);
        setDisplay("");
      } else {
        // If there's no previous value, set the previous value and operator
        setPreviousValue(display);
        setOperator(value);
        setDisplay("");
      }
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      // Handle operators
      if (previousValue && operator) {
        // If there's a previous value and operator, calculate the result and set it as the new previous value
        const result = eval(previousValue + operator + display);
        setOperator(value);
        setDisplay("");
        setPreviousValue(result.toString());
      } else if (previousValue && !operator) {
        // If there's a previous value but no operator, set the operator
        setOperator(value);
        setDisplay("");
      } else {
        // If there's no previous value, set the previous value and operator
        setPreviousValue(display);
        setOperator(value);
        setDisplay("");
      }
    } else {
      // Handle numbers and decimal point
      if (operator && !previousValue) {
        // If an operator is already set and there's no previous value, clear the display
        setDisplay("");
      }
      setDisplay((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    if (previousValue && operator) {
      const result = eval(previousValue + operator + display);
      setDisplay(result.toString());
      setPreviousValue(result.toString());
      setOperator("");
    }
  };

  const clearDisplay = () => {
    setDisplay('');
    setPreviousValue('');
    setOperator('');
  };

  const calculatePercentage = () => {
    const result = parseFloat(display) / 100;
    setDisplay(result.toString());
    setPreviousValue(result.toString());
    setOperator("");
  };

  const toggleSign = () => {
    if (display) {
      setDisplay((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        calculateResult();
      } else if (e.key === "Backspace") {
        clearDisplay();
      } else if (e.key === "%") {
        calculatePercentage();
      } else if ("0123456789+-*/.".includes(e.key)) {
        onClickHandler(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [display]);

  return (
    <div className="calculator">
      <div className="display">
        <div className="operator-row">{operator}</div>
        <div className="number-row">{display}</div>
      </div>
      <div className="buttons">
        <button className="symbol" onClick={clearDisplay}>
          AC
        </button>
        <button className="symbol" onClick={toggleSign}>
          +/-
        </button>
        <button className="symbol" onClick={calculatePercentage}>
          %
        </button>
        <button className="operation" onClick={() => onClickHandler("/")}>
          ÷
        </button>
        <button onClick={() => onClickHandler("7")}>7</button>
        <button onClick={() => onClickHandler("8")}>8</button>
        <button onClick={() => onClickHandler("9")}>9</button>
        <button className="operation" onClick={() => onClickHandler("*")}>
          x
        </button>
        <button onClick={() => onClickHandler("4")}>4</button>
        <button onClick={() => onClickHandler("5")}>5</button>
        <button onClick={() => onClickHandler("6")}>6</button>
        <button className="operation" onClick={() => onClickHandler("-")}>
          -
        </button>
        <button onClick={() => onClickHandler("1")}>1</button>
        <button onClick={() => onClickHandler("2")}>2</button>
        <button onClick={() => onClickHandler("3")}>3</button>
        <button className="operation" onClick={() => onClickHandler("+")}>
          +
        </button>
        <button className="button0" id="button0" onClick={() => onClickHandler("0")}>
          0
        </button>
        <button onClick={() => onClickHandler(".")}>.</button>
        <button className="operation" id="equal" onClick={calculateResult}>
          =
        </button>
      </div>
    </div>
  );
}