import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../contexts/TodoContext";
import React from "react";
import App from "../../pages/App";

describe("App page", () => {
  it("renders correctly", async () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );

    expect(screen.getByText("What is your next challenge?")).toBeInTheDocument();
  });
});
