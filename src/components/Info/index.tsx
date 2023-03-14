import { HTMLAttributes, useContext } from 'react';
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { TodoContext } from '../../contexts/TodoContext';

import styles from "./styles.module.scss"

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  done?: number;
  quantity?: number;
}

export function Info({done = 0, quantity = 0, ...rest}: InfoProps) {
  const { isVisibleDone } = useContext(TodoContext)

  if (quantity !== 0 && isVisibleDone) {
    return (
      <div className={styles.info} {...rest}> 
        <RxEyeOpen size="16px" />
        <span>Completed {done} of {quantity}</span>
      </div>
    )
  }

  if (quantity !== 0 && !isVisibleDone) {
    return (
      <div className={styles.info} {...rest}> 
        <RxEyeClosed size="16px" />
        <span>Completed {done} of {quantity}</span>
      </div>
    )
  }

  return (
    <>
    </>
  )
}