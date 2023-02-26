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
  return (
    <div className={styles.todo} id={id}>
      <Input type="checkbox" />
      <Input type="text" placeholder="Title..." />
      <RxHamburgerMenu />
    </div>
  );
}
