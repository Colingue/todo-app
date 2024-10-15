import React, { useState } from "react";
import { Todo } from "../types/todo";

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, "id">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onAddTodo({
        title,
        description,
        completed: false,
      });

      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
        className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de la tâche"
        className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
      />
      <input
        type="date"
        className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Ajouter une tâche
      </button>
    </form>
  );
};

export default TodoForm;
