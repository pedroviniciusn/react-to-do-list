import React, { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { Input } from "../components/Input";
import { Todo } from "../components/Todo";
import { TodoContext } from "../contexts/TodoContext";
import styles from "./App.module.scss";

function App() {
  const [todos, setTodos] = useState<any>([]);
  const [todosDone, setTodosDone] = useState<any>([]);
  const [todosNotDone, setTodosNotDone] = useState<any>([]);

  const {
    handleGetTodos,
    isReload,
    handleIsVisibleDone,
    isVisibleDone,
    handleAddTodo,
    addTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    async function get() {
      const response = await handleGetTodos();
      setTodos(response?.todos);
      setTodosDone(response?.todosDone);
      setTodosNotDone(response?.todosNotDone);
    }

    get();
  }, [handleGetTodos, isReload]);

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
          <div className={styles.todos} id="todoContainer">
            {todos.length === 0 && !addTodo ? (
              <div className={styles.question}>
                <span>What is your next challenge?</span>
              </div>
            ) : isVisibleDone ? (
              todos?.map((item: any) => {
                return (
                  <Todo
                    checked={item.checked}
                    id={item.id}
                    todo={item.todo}
                    key={item.id}
                  />
                );
              })
            ) : (
              todosNotDone?.map((item: any) => {
                return (
                  <Todo
                    checked={item.checked}
                    id={item.id}
                    todo={item.todo}
                    key={item.id}
                  />
                );
              })
            )}
            {addTodo && todos.length === 0 ? (
              <Todo /> ? (
                addTodo && <Todo />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className={styles.infoAndButton}>
            <div className={styles.infoContainer} onClick={handleIsVisibleDone}>
              <Info done={todosDone.length} quantity={todos.length} />
            </div>
            <div className={styles.buttonContainer}>
              <Button handleButton={handleAddTodo} />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
