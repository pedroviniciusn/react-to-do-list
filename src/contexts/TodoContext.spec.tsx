import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { TodoContext, TodoProvider } from "./TodoContext";
import * as apiMocked from "../services/hooks/useTodos";

jest.mock("../services/hooks/useTodos");

describe("Todo Context", () => {
  it("sets isVisibleDone status to false", () => {
    const TestComponent = () => {
      const { handleIsVisibleDone, isVisibleDone } = useContext(TodoContext);
      const role = "visible";

      return (
        <>
          <div role={role}>{isVisibleDone.toString()}</div>
          <button onClick={handleIsVisibleDone}>set value</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(screen.getByRole("visible").textContent).toEqual("true");

    const button = screen.getByText("set value");

    fireEvent.click(button);

    expect(screen.getByRole("visible").textContent).toEqual("false");

    fireEvent.click(button);

    expect(screen.getByRole("visible").textContent).toEqual("true");
  });

  it("sets addTodo status to true", () => {
    const TestComponent = () => {
      const { handleAddTodo, addTodo, handleCancelAddTodo } =
        useContext(TodoContext);
      const role = "addTodo";

      return (
        <>
          <div role={role}>{addTodo.toString()}</div>
          <button onClick={handleAddTodo}>Add todo</button>
          <button onClick={handleCancelAddTodo}>Cancel</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(screen.getByRole("addTodo").textContent).toEqual("false");

    const button = screen.getByText("Add todo");

    fireEvent.click(button);

    expect(screen.getByRole("addTodo").textContent).toEqual("true");

    const buttonCancel = screen.getByText("Cancel");

    fireEvent.click(buttonCancel);

    expect(screen.getByRole("addTodo").textContent).toEqual("false");
  });

  it("calling handleGetTodos", async () => {
    const TestComponent = () => {
      const { handleGetTodos, isReload } = useContext(TodoContext);
      const role = "reload";

      useEffect(() => {
        async function get() {
          await handleGetTodos();
        }

        get();
      }, [handleGetTodos, isReload]);

      return (
        <>
          <div role={role}>{isReload.toString()}</div>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(apiMocked.getTodos).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("reload").textContent).toEqual("false");
  });

  it("calling handlePostTodo", async () => {
    const TestComponent = () => {
      const { handlePostTodo, isReload } = useContext(TodoContext);
      const role = "reload";

      return (
        <>
          <div role={role}>{isReload.toString()}</div>
          <button onClick={() => handlePostTodo({todo: "test", checked: false})}>Add Task</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const button = screen.getByText("Add Task");

    expect(screen.getByRole("reload").textContent).toEqual("false");

    fireEvent.click(button);
    
    expect(apiMocked.postTodo).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByRole("reload").textContent).toEqual("true"));
  });

  it("calling handlePostTodo without passing todo value", async () => {
    const TestComponent = () => {
      const { handlePostTodo, isReload } = useContext(TodoContext);
      const role = "reload";

      return (
        <>
          <div role={role}>{isReload.toString()}</div>
          <button onClick={() => handlePostTodo({todo: "", checked: false})}>Add Task</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const button = screen.getByText("Add Task");

    expect(screen.getByRole("reload").textContent).toEqual("false");

    fireEvent.click(button);
    
    expect(apiMocked.postTodo).toHaveBeenCalledTimes(0);
    await waitFor(() => expect(screen.getByRole("reload").textContent).toEqual("false"));
  });

  it("calling handleDeleteTodo", async () => {
    const TestComponent = () => {
      const { handlePostTodo, handleDeleteTodo } = useContext(TodoContext);

      return (
        <>
          <button onClick={() => handlePostTodo({todo: "test", checked: false})}>Add Task</button>
          <button onClick={() => handleDeleteTodo("1")}>Delete Task</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const buttonAdd = screen.getByText("Add Task");

    fireEvent.click(buttonAdd);
    
    const buttonDelete = screen.getByText("Delete Task");
      
    fireEvent.click(buttonDelete);
    
    await waitFor(() => expect(apiMocked.deleteTodo).toHaveBeenCalledTimes(1))
  });

  it("calling handleEditTodo", async () => {
    const TestComponent = () => {
      const { handlePostTodo, handleEditTodo, handleEditButton,  } = useContext(TodoContext);

      return (
        <>
          <button onClick={() => handlePostTodo({todo: "test", checked: false})}>Add Task</button>
          <button onClick={() => handleEditButton("1")}>Edit Task</button>
          <button onClick={() => handleEditTodo({id:"1", checked: true, todo: "tested"})}>Edit post</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const buttonAdd = screen.getByText("Add Task");

    fireEvent.click(buttonAdd);
    
    const buttonEdit = screen.getByText("Edit Task");
      
    fireEvent.click(buttonEdit);

    const buttonEditPost = screen.getByText("Edit post");

    fireEvent.click(buttonEditPost);
    
    await waitFor(() => expect(apiMocked.editTodo).toHaveBeenCalledTimes(1))
  });

  it("calling handleCancelEditTodo", async () => {
    const TestComponent = () => {
      const { handlePostTodo, handleCancelEditTodo, handleEditButton, disableEditTodo} = useContext(TodoContext);
      const role = "edit";
      return (
        <>
          <div role={role}>{disableEditTodo.toString()}</div>
          <button onClick={() => handlePostTodo({todo: "test", checked: false})}>Add Task</button>
          <button onClick={() => handleEditButton("1")}>Edit Task</button>
          <button onClick={() => handleCancelEditTodo()}>Cancel edit task</button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const buttonAdd = screen.getByText("Add Task");

    fireEvent.click(buttonAdd);
    
    const buttonEdit = screen.getByText("Edit Task");
      
    fireEvent.click(buttonEdit);

    await waitFor(() => expect(screen.getByRole("edit").textContent).toEqual("false"));

    const buttonCancelEdit = screen.getByText("Cancel edit task");

    fireEvent.click(buttonCancelEdit);

    await waitFor(() => expect(screen.getByRole("edit").textContent).toEqual("true"));
  });
});
