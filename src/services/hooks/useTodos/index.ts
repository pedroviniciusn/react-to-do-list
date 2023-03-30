import { api } from "../../api";

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
    return;
  }
}

export async function postTodo(data: ICreateTodo): Promise<void> {
  try {
    await api.post("/todos", {
      todo: {
        ...data,
      },
    });
  } catch (error) {
    return;
  }
}

export async function editTodo(data: IEditTodo): Promise<void> {
  try {
    await api.patch(`/todos/${data.id}`, {
      todo: {
        ...data,
      },
    });
  } catch (error) {
    return;
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    return;
  }
}
