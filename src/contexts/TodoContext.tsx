import { createContext, ReactNode, useState } from "react";
import { getTodos } from "../services/hooks/useTodos";

interface ITodoProps {
  id: string;
  todo: string;
  description: string;
  checked: boolean;
}

interface IGetTodosResponse {
  todos?: ITodoProps[];
  todosDone?: ITodoProps[];
  todosNotDone?: ITodoProps[];
}

interface TodoContextData {
  handleGetTodos: () => Promise<IGetTodosResponse | undefined>;
  handleIsVisibleDone: () => void;
  isVisibleDone: boolean;
}

interface TodoProviderProps {
  children: ReactNode;
}
export const TodoContext = createContext({} as TodoContextData);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [isVisibleDone, setIsVisibleDone] = useState(false);

  const handleIsVisibleDone = () => {
    setIsVisibleDone(isVisibleDone === false ? true : false);
  };

  const handleGetTodos = async () => {
    const response = await getTodos();

    return response;
  };
  return (
    <TodoContext.Provider
      value={{ handleGetTodos, handleIsVisibleDone, isVisibleDone }}
    >
      {children}
    </TodoContext.Provider>
  );
};
