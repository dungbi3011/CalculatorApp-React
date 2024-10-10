import { useState, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState(""); // Bottom display (results)
  const [operator, setOperator] = useState(null); // Current operator
  const [previousValue, setPreviousValue] = useState(null); // Previous result/number
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false); // Waiting for next number
  const [operationString, setOperationString] = useState(""); // Top operation display

  const onClickHandler = (value) => {
    if (["+", "-", "*", "/"].includes(value)) {
      if (previousValue === null) { 
        setPreviousValue(display);
        setOperationString(display + " " + value); 
      } else if (operator) {
        const result = calculate(previousValue, display, operator);
        setDisplay(result.toString());
        setPreviousValue(result); 
        setOperationString(result.toString() + " " + value); 
      }
      setOperator(value); // Set new operator
      setWaitingForSecondOperand(true); // Await the second number
    } else if (value === "=") {
      if (operator && previousValue !== null) {
        const result = calculate(previousValue, display, operator);
        setDisplay(result.toString());
        setOperationString(operationString + " " + display + " ="); // Append the current display and = to the top line
        setPreviousValue(null); // Reset previous value
        setOperator(null); // Clear operator
      }
    } else if (value === "AC") {
      setDisplay("");
      setPreviousValue(null);
      setOperator(null);
      setOperationString(""); // Clear the operation display
      setWaitingForSecondOperand(false);
    } else if (value === "+/-") {
      setDisplay((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev));
      setOperationString("");
    } else if (value === "%") {
      const result = parseFloat(display) / 100;
      setDisplay(result.toString());
      setOperationString("");
    } else if (value === ".") {
      if (!display.includes(".")) {
        setDisplay((prev) => (prev === "" ? "0." : prev + "."));
        setOperationString("");
      }
    } else { // Handle numbers
      if (waitingForSecondOperand) {
        // When starting a new input after an operator
        setDisplay(value);
        setWaitingForSecondOperand(false); // Reset flag to allow normal input
      } else {
        setDisplay((prev) => (prev === "0" ? value : prev + value));
      }
    }
  };

  const calculate = (firstValue, secondValue, operator) => {
    const firstNum = parseFloat(firstValue);
    const secondNum = parseFloat(secondValue);

    switch (operator) {
      case "+":
        return firstNum + secondNum;
      case "-":
        return firstNum - secondNum;
      case "*":
        return firstNum * secondNum;
      case "/":
        return firstNum / secondNum;
      default:
        return secondValue;
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setPreviousValue(null);
    setOperator(null);
    setOperationString("");
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        onClickHandler("=");
      } else if (e.key === "Backspace") {
        clearDisplay();
      } else if (e.key === "%") {
        onClickHandler("%");
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
        {/* Display the current operation string above the result */}
        <div className="operation-row">{operationString}</div>
        <div className="number-row">{display || "0"}</div> {/* Show the display or "0" */}
      </div>
      <div className="buttons">
        <button className="symbol" onClick={() => onClickHandler("AC")}>
          AC
        </button>
        <button className="symbol" onClick={() => onClickHandler("+/-")}>
          +/-
        </button>
        <button className="symbol" onClick={() => onClickHandler("%")}>
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
        <button className="operation" id="equal" onClick={() => onClickHandler("=")}>
          =
        </button>
      </div>
    </div>
  );
}
