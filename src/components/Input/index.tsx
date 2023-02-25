import styles from "./styles.module.scss"

interface InputProps {
  placeholder: string;
  type: string;
}

export function Input({ placeholder = "", type = "" }: InputProps) {
  return <input className={styles.input} placeholder={placeholder} type={type} />;
}
