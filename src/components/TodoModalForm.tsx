import { useState } from "react";
import Modal from "./Modal";
import ky from "ky";

type TodoModalFormProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  mutateTodos: () => void;
};

type TodoModalFormState = {
  title: string;
  description: string;
  deadline: string;
};

export default function TodoModalForm({
  setIsModalOpen,
  mutateTodos,
}: TodoModalFormProps) {
  const [formState, setFormState] = useState<TodoModalFormState>({
    title: "",
    description: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ky.post("http://localhost:8080/api/todos", {
        json: {
          ...formState,
          completed: false,
        },
      });
      setFormState({
        title: "",
        description: "",
        deadline: "",
      });
      mutateTodos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <Modal onClose={() => setIsModalOpen(false)}>
      <h2 className="text-xl mb-4 font-bold">Add a task</h2>
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
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
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
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            value={formState.deadline}
            onChange={(e) =>
              setFormState({ ...formState, deadline: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row-reverse gap-4">
          <button
            type="submit"
            className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="border-gray-300 border-2 px-4 py-2 rounded hover:border-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
