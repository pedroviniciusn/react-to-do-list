import { api } from "../../api";

interface ITodoProps {
  id: string;
  todo: string;
  description: string;
  checked: boolean;
}

interface IGetTodosResponse {
  todos: ITodoProps[];
  todosDone: ITodoProps[];
  todosNotDone: ITodoProps[];
}

export async function getTodos(): Promise<IGetTodosResponse | undefined> {
  try {
    const { request } = await api.get("/todos");
    const todos = request.responseHeaders.todos as ITodoProps[];
    const todosDone = todos.filter((todo) => todo.checked === true);
    const todosNotDone = todos.filter((todo) => todo.checked === false);
    const response = {
      todos,
      todosDone,
      todosNotDone,
    };

    return response;
  } catch (error) {
    console.log(error);
  }
}
