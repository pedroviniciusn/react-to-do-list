import { render, screen } from "@testing-library/react";
import { Todo } from ".";

interface inputProps {
  checked?: boolean;
  value?: string;
}

describe("Todo Component", () => {
  it("renders correctly", () => {
    render(
      <Todo todo={"testing"} id={"1"} />
    );

    const inputCheck = screen.getByTitle("check") as inputProps;
    const input = screen.getByPlaceholderText("Title...") as inputProps;
   
    expect(inputCheck.checked).toEqual(false);
    expect(input.value).toEqual("testing");
  });
  
  it("renders correctly if not passing todo value", () => { 
    render(
      <Todo />
    );

    const input = screen.getByPlaceholderText("Title...") as inputProps;

    expect(input.value).toEqual("");
  });

  it("renders correctly if checked equals true", () => { 
    render(
      <Todo checked={true} todo={"testing"} id={"2"}/>
    );

    const inputCheck = screen.getByTitle("check") as inputProps;

    expect(inputCheck.checked).toEqual(true);
  });
});
