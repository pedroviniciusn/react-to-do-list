import { Input } from "../Input";
import {
  RxPlus,
  RxPencil2,
  RxTrash,
  RxPencil1,
  RxCross2,
} from "react-icons/rx";

import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";

interface TodoProps {
  id?: string;
  todo?: string;
  checked?: boolean;
}

export function Todo({ checked, id, todo = "" }: TodoProps) {
  const [todoData, setTodoData] = useState("");
  const [checkedTodo, setCheckedTodo] = useState(false);

  const {
    handlePostTodo,
    handleCancelAddTodo,
    handleEditTodo,
    handleEditButton,
    disableEditTodo,
    handleDeleteTodo,
    taskIdEdit,
  } = useContext(TodoContext);

  useEffect(() => {
    setTodoData(todo);
  }, [todo]);

  if (todo && id === taskIdEdit) {
    return (
      <div className={styles.editTodo} id={id}>
        <Input
          type="checkbox"
          onClick={() =>
            handleEditTodo({
              id,
              todo,
              checked: checked === false ? true : false,
            })
          }
          checked={checked}
          readOnly
        />
        <Input
          type="text"
          placeholder="Title..."
          value={todoData}
          onChange={(e) => setTodoData(e.target.value)}
          disabled={disableEditTodo}
        />
        <RxPencil1
          onClick={() =>
            handleEditTodo({
              id,
              todo: todoData,
            })
          }
        />
      </div>
    );
  }

  if (todo) {
    return (
      <div className={styles.todo} id={id}>
        <Input
          type="checkbox"
          onClick={() =>
            handleEditTodo({
              id,
              todo,
              checked: checked === false ? true : false,
            })
          }
          checked={checked}
          readOnly
        />
        <Input
          type="text"
          placeholder="Title..."
          value={todo}
          disabled={disableEditTodo}
        />
        <div className={styles.options}>
          <RxPencil2 onClick={() => handleEditButton(id as string)} />
          <RxTrash onClick={() => handleDeleteTodo(id as string)} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.addTodo}>
      <Input
        type="checkbox"
        defaultChecked={false}
        onChange={(e) => setCheckedTodo(e.target.checked)}
        readOnly
      />
      <Input
        type="text"
        placeholder="Title..."
        onChange={(e) => setTodoData(e.target.value)}
      />
      <div className={styles.options}>
        <RxPlus
          onClick={() =>
            handlePostTodo({ todo: todoData, checked: checkedTodo })
          }
        />
        <RxCross2 onClick={() => handleCancelAddTodo()} />
      </div>
    </div>
  );
}
