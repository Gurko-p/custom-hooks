import axios from "axios";
import { useCallback } from "react";
import './App.css'
import useRequest from "./hooks/useRequest";

function App() {
  const fetchTodos = useCallback(() => {
    return axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
}, [])

  const [todos, loading, error] = useRequest(fetchTodos)
  console.log(todos, "todos");

  if (loading) {
      return <h1>Идет загрузка...</h1>
  }

  if (error) {
      return <h1>Произошла ошибка при загрузке данных</h1>
  }

  return (
      <div>
          {todos && todos.map(todo =>
              <div key={todo.id} style={{padding: 30, border: '2px solid black'}}>
                  {todo.id}. {todo.title}
              </div>
          )}
      </div>
  );
}

export default App
