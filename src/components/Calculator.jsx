import { useState, useEffect } from "react";

export default function Calculator() {

    const [display, setDisplay] = useState('');

    const onClickHandler = (value) => {
        setDisplay(prev => prev + value);
    };

    const calculateResult = () => {
        try {
            setDisplay(eval(display).toString());
        } catch {
            setDisplay('Error');
        }
    };

    const clearDisplay = () => {
        setDisplay('');
    };

    const calculatePercentage = () => {
        setDisplay((parseFloat(display) / 100).toString());
    };

    const toggleSign = () => {
        if (display) {
            setDisplay((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                calculateResult();
            } else if (e.key === 'Backspace') {
                clearDisplay();
            } else if (e.key === '%') {
                calculatePercentage();
            } else if ('0123456789+-*/.'.includes(e.key)) {
                onClickHandler(e.key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [display]);

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="buttons">
                <button className="symbol" onClick={clearDisplay}>AC</button>
                <button className="symbol" onClick={toggleSign}>+/-</button>
                <button className="symbol" onClick={calculatePercentage}>%</button>
                <button className="operation" onClick={() => onClickHandler(' / ')}>÷</button>
                <button onClick={() => onClickHandler('7')}>7</button>
                <button onClick={() => onClickHandler('8')}>8</button>
                <button onClick={() => onClickHandler('9')}>9</button>
                <button className="operation" onClick={() => onClickHandler(' * ')}>x</button>
                <button onClick={() => onClickHandler('4')}>4</button>
                <button onClick={() => onClickHandler('5')}>5</button>
                <button onClick={() => onClickHandler('6')}>6</button>
                <button className="operation" onClick={() => onClickHandler(' - ')}>-</button>
                <button onClick={() => onClickHandler('1')}>1</button>
                <button onClick={() => onClickHandler('2')}>2</button>
                <button onClick={() => onClickHandler('3')}>3</button>
                <button className="operation" onClick={() => onClickHandler(' + ')}>+</button>
                <button className="button0" id="button0" onClick={() => onClickHandler('0')}>0</button>
                <button onClick={() => onClickHandler('.')}>.</button>
                <button className="operation" id="equal" onClick={calculateResult}>=</button>
            </div>
        </div>
    );
}
