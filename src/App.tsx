import React, { useEffect, useState } from "react";
import ky from "ky";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import { Todo } from "./types/todo";
import dayjs from "dayjs";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // Fetch tous les todos depuis l'API
  const fetchTodos = async () => {
    try {
      const data = await ky
        .get("http://localhost:8080/api/todos")
        .json<Todo[]>();
      setTodos(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des todos", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ky.post("http://localhost:8080/api/todos", {
        json: {
          title,
          description,
          completed: false,
          deadline,
        },
      });
      setTitle("");
      setDescription("");
      setDeadline("");
      setIsModalOpen(false);
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Omit<Todo, "id">) => {
    try {
      const todo = await ky
        .post("http://localhost:8080/api/todos", { json: newTodo })
        .json<Todo>();
      setTodos([...todos, todo]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un todo", error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      await ky.put(`http://localhost:8080/api/todos/${updatedTodo.id}`, {
        json: updatedTodo,
      });
      fetchTodos();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du todo", error);
    }
  };

  if (isLoading) {
    return <div className="text-center">Chargement des tâches...</div>;
  }

  const toggleCompleted = async (todo: Todo) => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 to-gray-400">
      <div className="container mx-auto px-4 bg-gray-100 shadow-lg rounded-lg py-8 max-w-96 overflow-auto h-full lg:h-[80vh]">
        <div className="flex items-center">
          <div className="w-8/12 mb-6">
            <p className="font-semibold text-xl">Todo App</p>
            <p className="text-gray-500 text-sm">
              {dayjs().format("dddd, D MMMM")}
            </p>
          </div>
          <div className="w-4/12">
            <button
              type="submit"
              className="bg-blue-200 text-blue-500 hover:bg-blue-600 py-1 w-full rounded-lg flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-2xl mr-2">+</span>New Task
            </button>
          </div>
        </div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl mb-4">Add Todo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </Modal>
        )}
        <TodoList toggleCompleted={toggleCompleted} todos={todos} />
      </div>
    </div>
  );
};

export default App;
