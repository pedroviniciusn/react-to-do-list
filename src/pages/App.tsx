import React, { useEffect } from "react";
import { getTodos } from '../services/hooks/useTodos';
import "../styles/global.scss";

function App() {
  useEffect(() => {
    async function get() {
      const todos = await getTodos();
      console.log(todos)
    }

    get()
  }, [])

  return <h1>Hellor World</h1>;
}

export default App;
