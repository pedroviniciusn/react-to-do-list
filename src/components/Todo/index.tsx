import { Input } from "../Input";
import { RxHamburgerMenu, RxPlus } from "react-icons/rx";

import styles from "./styles.module.scss";
import { useContext, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';

interface TodoProps {
  id?: string;
  todo?: string;
  checked?: boolean;
}

export function Todo({ checked, id, todo }: TodoProps) {
  const [todoData, setTodoData] = useState("");
  const [checkedTodo, setCheckedTodo] = useState(false);

  const {handlePostTodo, handleEditTodo} = useContext(TodoContext);

  if (todo) {
    return (
      <div className={styles.todo} id={id}>
        <Input type="checkbox" onClick={() => handleEditTodo({id, todo, checked: checked === false ? true : false})} checked={checked} readOnly/>
        <Input type="text" placeholder="Title..." value={todo} disabled={true}/>
        <RxHamburgerMenu />
      </div>
    );
  }

  return (
    <div className={styles.addTodo}>
      <Input type="checkbox" defaultChecked={false} onChange={(e) => setCheckedTodo(e.target.checked)} readOnly/>
      <Input type="text" placeholder="Title..." onChange={(e) => setTodoData(e.target.value)} />
      <RxPlus onClick={() => handlePostTodo({todo: todoData, checked: checkedTodo})} />
    </div> 
  );
}
