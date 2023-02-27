import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

import styles from "./styles.module.scss"
interface InfoProps {
  done?: number;
  quantity?: number;
  isVisible?: boolean;
}

export function Info({done = 0, quantity = 0, isVisible = false}: InfoProps) {
  if (quantity !== 0 && isVisible) {
    return (
      <div className={styles.info}> 
        <RxEyeOpen size="16px" />
        <span>Completed {done} of {quantity}</span>
      </div>
    )
  }

  if (quantity !== 0 && !isVisible) {
    return (
      <div className={styles.info}> 
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