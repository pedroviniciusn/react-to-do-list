import {VscAdd} from "react-icons/vsc";

import styles from "./styles.module.scss"

interface ButtonProps {
  handleButton: () => void;
}

export function Button({handleButton}: ButtonProps) {
  return (
    <button className={styles.button} onClick={handleButton}>
      <VscAdd size= "16px"/>
      Add task
    </button>
  )
}