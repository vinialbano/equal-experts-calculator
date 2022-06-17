/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Calculator } from "./calculator";

describe("Calculator", () => {
  it("should start with the value of zero", async () => {
    const { container } = render(<Calculator />);
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("0");
  });

  it("should add a number to the current operand", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("0"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("10");
  });

  it("should add a float number to the current operand", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("."));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("1.");

    fireEvent.click(screen.getByText("5"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent(
      "1.5"
    );
  });

  it("should add a number and operator to the previous operand", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 +"
    );
    expect(container.querySelector(".current-operand")).toHaveTextContent("0");
  });

  it("should change the operator on the previous operand", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 +"
    );

    fireEvent.click(screen.getByText("-"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 -"
    );

    fireEvent.click(screen.getByText("x"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 x"
    );

    fireEvent.click(screen.getByText("÷"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 ÷"
    );
  });

  it("should add two numbers", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));

    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 +"
    );
    expect(container.querySelector(".current-operand")).toHaveTextContent("2");

    fireEvent.click(screen.getByText("="));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("3");
  });

  it("should subtract two numbers", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("2"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 -"
    );
    expect(container.querySelector(".current-operand")).toHaveTextContent("2");

    fireEvent.click(screen.getByText("="));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("-1");
  });

  it("should multiply two numbers", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("x"));
    fireEvent.click(screen.getByText("2"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 x"
    );
    expect(container.querySelector(".current-operand")).toHaveTextContent("2");

    fireEvent.click(screen.getByText("="));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("2");
  });

  it("should divide two numbers", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("÷"));
    fireEvent.click(screen.getByText("2"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent(
      "1 ÷"
    );
    expect(container.querySelector(".current-operand")).toHaveTextContent("2");

    fireEvent.click(screen.getByText("="));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent(
      "0.5"
    );
  });

  it("should invert the sign of a number", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+/-"));
    expect(container.querySelector(".current-operand")).toHaveTextContent("-1");

    fireEvent.click(screen.getByText("+/-"));
    expect(container.querySelector(".current-operand")).toHaveTextContent("1");
  });

  it("should transform a number to percentage", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("%"));
    expect(container.querySelector(".current-operand")).toHaveTextContent(
      "0.01"
    );
  });

  it("should reset the calculator", async () => {
    const { container } = render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("AC"));
    expect(container.querySelector(".previous-operand")).toHaveTextContent("");
    expect(container.querySelector(".current-operand")).toHaveTextContent("0");
  });
});
