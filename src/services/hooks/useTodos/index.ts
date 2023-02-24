import { api } from "../../api";

interface ITodoProps {
  id: string;
  todo: string;
  description: string;
  checked: boolean;
}

interface IGetTodosResponse {
  todos: ITodoProps[];
}

export async function getTodos(): Promise<IGetTodosResponse[] | undefined> {
  try {
    const { request } = await api.get("/todos");
    const todos = request.responseHeaders.todos;
    return todos;
  } catch (error) {
    console.log(error);
  }
}
