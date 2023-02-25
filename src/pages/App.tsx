import React, { useEffect } from "react";
import { Input } from '../components/Input';
import { getTodos } from "../services/hooks/useTodos";
import styles from "./App.module.scss";

function App() {
  useEffect(() => {
    async function get() {
      const todos = await getTodos();
      console.log(todos);
    }

    get();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.containerContent}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>My checklist</h1>
            <Input placeholder='Add any description...' type='text' />
          </div>
        </header>
        <main className="containerContent">
          <Input placeholder='Title...' type='text'/>
        </main>
      </section>
    </div>
  );
}

export default App;
