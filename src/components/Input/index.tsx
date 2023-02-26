import { InputHTMLAttributes } from 'react';

import styles from "./styles.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type: string;
}

export function Input({ placeholder = "", type = "" , ...rest}: InputProps) {
  return <input className={styles.input} placeholder={placeholder} type={type} {...rest}/>;
}
