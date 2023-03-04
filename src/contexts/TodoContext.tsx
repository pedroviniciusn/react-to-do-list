import { createContext, ReactNode, useState } from "react";
import {
  deleteTodo,
  editTodo,
  getTodos,
  postTodo,
} from "../services/hooks/useTodos";

interface ITodoProps {
  id: string;
  todo: string;
  checked: boolean;
}

interface ICreateTodo {
  todo: string;
  checked: boolean;
}

interface IEditTodo {
  id?: string;
  todo?: string;
  checked?: boolean;
}

interface IGetTodosResponse {
  todos?: ITodoProps[];
  todosDone?: ITodoProps[];
  todosNotDone?: ITodoProps[];
}

interface TodoContextData {
  handleGetTodos: () => Promise<IGetTodosResponse | undefined>;
  handlePostTodo: ({ todo, checked }: ICreateTodo) => void;
  handleIsVisibleDone: () => void;
  handleAddTodo: () => void;
  handleEditTodo: ({ id, checked, todo }: IEditTodo) => void;
  handleEditButton: (id: string) => void;
  taskIdEdit: string;
  handleDeleteTodo: (id: string) => void;
  disableEditTodo: boolean;
  isVisibleDone: boolean;
  isReload: boolean;
  addTodo: boolean;
}

interface TodoProviderProps {
  children: ReactNode;
}
export const TodoContext = createContext({} as TodoContextData);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [isVisibleDone, setIsVisibleDone] = useState(true);
  const [isReload, setIsReload] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [disableEditTodo, setDisableEditTodo] = useState(true);
  const [taskIdEdit, setTaskIdEdit] = useState("");

  const handleIsVisibleDone = () => {
    setIsVisibleDone(isVisibleDone === false ? true : false);
  };

  const handleAddTodo = () => {
    setAddTodo(true);
  };

  const handleGetTodos = async () => {
    const response = await getTodos();

    setIsReload(false);

    return response;
  };

  const handlePostTodo = async ({
    todo,
    checked,
  }: ICreateTodo): Promise<void> => {
    if (todo === "") {
      return;
    }

    await postTodo({
      todo,
      checked,
    });

    setAddTodo(false);
    setIsReload(true);
  };

  const handleEditTodo = async (data: IEditTodo): Promise<void> => {
    await editTodo(data);

    setDisableEditTodo(true);
    setDisableEditTodo(true);
    setTaskIdEdit("");
    setIsReload(true);
  };

  const handleEditButton = (id: string) => {
    setTaskIdEdit(id);
    setDisableEditTodo(false);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    await deleteTodo(id);
    setIsReload(true);
  };

  return (
    <TodoContext.Provider
      value={{
        handleGetTodos,
        handlePostTodo,
        handleIsVisibleDone,
        isVisibleDone,
        isReload,
        handleAddTodo,
        addTodo,
        handleEditTodo,
        handleEditButton,
        disableEditTodo,
        handleDeleteTodo,
        taskIdEdit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
