import { render, screen } from "@testing-library/react";
import { Info } from ".";

describe("Info Component", () => {
  it("renders correctly", () => {
    render(<Info done={2} quantity={2} />);

    expect(screen.getByText("Completed 2 of 2")).toBeInTheDocument();
  });
});
