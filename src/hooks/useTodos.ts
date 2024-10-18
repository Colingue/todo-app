import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import ky from "ky";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const data = await ky
        .get(`${process.env.REACT_APP_API_URL}/todos`)
        .json<Todo[]>();
      setTodos(data);
    } catch (error) {
      setError("Erreur lors de la récupération des todos");
      console.error("Erreur lors de la récupération des todos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      await ky.put(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
        json: {
          ...todo,
          completed: !todo.completed,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, isLoading, error, mutate: fetchTodos, toggleCompleted };
};
