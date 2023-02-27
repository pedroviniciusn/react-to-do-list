import { Input } from "../Input";
import { RxHamburgerMenu } from "react-icons/rx";

import styles from "./styles.module.scss";

interface TodoProps {
  id?: string;
  todo?: string;
  description?: string;
  checked?: boolean;
}

export function Todo({ checked, description, id, todo }: TodoProps) {
  if (todo) {
    return (
      <div className={styles.todo} id={id} key={id}>
        <Input type="checkbox" />
        <Input type="text" placeholder="Title..." value={todo} disabled/>
        <RxHamburgerMenu />
      </div>
    );
  }

  return (
    <div className={styles.todo}>
      <Input type="checkbox" onChange={(e) => console.log(e.target.checked)}/>
      <Input type="text" placeholder="Title..." />
      <RxHamburgerMenu />
    </div>
  );
}
