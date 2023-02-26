import React, { useEffect } from "react";
import { Button } from '../components/Button';
import { Info } from '../components/Info';
import { Input } from "../components/Input";
import { Todo } from "../components/Todo";
import { getTodos } from "../services/hooks/useTodos";
import styles from "./App.module.scss";

function App() {
  function handleButton() {
    
  }
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
            <Input placeholder="Add any description..." type="text" />
          </div>
        </header>
        <main className="containerContent">
          <div className={styles.todos}>
            <Todo />
            <Todo />
            <Todo />
            <Todo />
          </div>
          <div className={styles.infoAndButton}>
            <div className={styles.infoContainer}>
              <Info done={0} quantity={1}/>
            </div>
            <div className={styles.buttonContainer}>
              <Button handleButton={handleButton}/>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
