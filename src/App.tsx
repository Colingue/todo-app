import React, { useState } from "react";
import TodoList from "./components/TodoList";
import dayjs from "dayjs";
import { useTodos } from "./hooks/useTodos";
import TodoModalForm from "./components/TodoModalForm";

const App: React.FC = () => {
  const { todos, isLoading, mutate, toggleCompleted } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <div className="text-center">Chargement des tâches...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 to-gray-400">
      <div className="container mx-auto px-4 bg-gray-100 shadow-lg rounded-lg py-8 max-w-96 overflow-auto h-screen md:h-[80vh]">
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
          <TodoModalForm mutateTodos={mutate} setIsModalOpen={setIsModalOpen} />
        )}
        <TodoList toggleCompleted={toggleCompleted} todos={todos} />
      </div>
    </div>
  );
};

export default App;
