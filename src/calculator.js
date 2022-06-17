import React from "react";
import { Textfit } from "react-textfit";

function DigitButton(props) {
  return (
    <button
      className={`digit-button ${props.className}`}
      onClick={props.onClick}
      value={props.value}
    >
      {props.value}
    </button>
  );
}

function OperatorButton(props) {
  return (
    <button
      className={`operator-button ${props.className}`}
      onClick={props.onClick}
      value={props.value}
    >
      {props.value}
    </button>
  );
}

function Display(props) {
  return (
    <div className="display">
      <Textfit className="previous-operand" mode="single" max={18}>
        {props.previousOperand} {props.operator}
      </Textfit>
      <Textfit className="current-operand" mode="single" max={30}>
        {props.currentOperand || "0"}
      </Textfit>
    </div>
  );
}

function Logo() {
  return (
    <img
      src="https://www.equalexperts.com/wp-content/themes/equalexperts/assets/logo.svg"
      alt="[=] Equal Experts"
    ></img>
  );
}

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "0",
      previousOperand: null,
      operator: null,
    };
  }

  addDigit = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let currentOperand = this.state.currentOperand;
    if (value === "0" && currentOperand === "0") {
      return;
    }
    if (value === "." && currentOperand.includes(".")) {
      return;
    }
    if (currentOperand === "0") {
      if (value === ".") {
        currentOperand = "0.";
      } else {
        currentOperand = value;
      }
    } else {
      currentOperand += value;
    }
    this.setState({
      currentOperand,
    });
  };

  chooseOperator = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let { currentOperand, previousOperand } = this.state;
    if (previousOperand === null && currentOperand === "0") {
      return;
    }
    if (currentOperand === "0") {
      this.setState({
        operator: value,
      });
      return;
    }
    if (previousOperand === null) {
      if (currentOperand.includes(".")) {
        let lastChar = currentOperand.slice(-1);
        while (lastChar === "0" || lastChar === ".") {
          currentOperand = currentOperand.slice(0, -1);
          lastChar = currentOperand.slice(-1);
        }
      }
      this.setState({
        previousOperand: currentOperand,
        currentOperand: "0",
        operator: value,
      });
      return;
    }
    this.calculate({ newOperator: value });
  };

  calculate = ({ newOperator = null } = {}) => {
    const { currentOperand, previousOperand, operator } = this.state;
    const prev = parseFloat(previousOperand);
    const cur = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(cur)) {
      return;
    }
    let result = "";
    switch (operator) {
      case "+":
        result = prev + cur;
        break;
      case "-":
        result = prev - cur;
        break;
      case "x":
        result = prev * cur;
        break;
      case "÷":
        result = prev / cur;
        break;
      default:
        result = "";
    }
    if (newOperator) {
      this.setState({
        previousOperand: result.toString(),
        currentOperand: "0",
        operator: newOperator,
      });
    } else {
      this.setState({
        previousOperand: null,
        currentOperand: result.toString(),
        operator: null,
      });
    }
  };

  invertSignal = () => {
    const { currentOperand } = this.state;
    if (currentOperand === "0") {
      return;
    }
    let result = "";
    if (currentOperand.includes("-")) {
      result = currentOperand.slice(1);
    } else {
      result = "-" + currentOperand;
    }
    this.setState({
      currentOperand: result,
    });
  };

  calculatePercentage = () => {
    const { currentOperand } = this.state;
    const cur = parseFloat(currentOperand);
    if (isNaN(cur)) {
      return;
    }
    this.setState({
      currentOperand: (cur / 100).toString(),
    });
  };

  clear = () => {
    this.setState({
      currentOperand: "0",
      previousOperand: null,
      operator: null,
    });
  };

  render() {
    return (
      <div className="calculator">
        <Logo />
        <Display
          previousOperand={this.state.previousOperand}
          operator={this.state.operator}
          currentOperand={this.state.currentOperand}
        />
        <OperatorButton value="AC" onClick={this.clear} />
        <OperatorButton value="+/-" onClick={this.invertSignal} />
        <OperatorButton value="%" onClick={this.calculatePercentage} />
        <OperatorButton value="÷" onClick={this.chooseOperator} />
        <DigitButton value="7" onClick={this.addDigit} />
        <DigitButton value="8" onClick={this.addDigit} />
        <DigitButton value="9" onClick={this.addDigit} />
        <OperatorButton value="x" onClick={this.chooseOperator} />
        <DigitButton value="4" onClick={this.addDigit} />
        <DigitButton value="5" onClick={this.addDigit} />
        <DigitButton value="6" onClick={this.addDigit} />
        <OperatorButton value="-" onClick={this.chooseOperator} />
        <DigitButton value="1" onClick={this.addDigit} />
        <DigitButton value="2" onClick={this.addDigit} />
        <DigitButton value="3" onClick={this.addDigit} />
        <OperatorButton value="+" onClick={this.chooseOperator} />
        <DigitButton value="0" onClick={this.addDigit} />
        <DigitButton value="." onClick={this.addDigit} />
        <OperatorButton value="=" onClick={this.calculate} />
      </div>
    );
  }
}
