import React, { useState } from "react";
import Tabs from "./Tabs";
import Todo from "./Todo";
import { Todo as TodoType } from "../types/todo";

interface TodoListProps {
  todos: TodoType[];
  toggleCompleted: (todo: TodoType) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompleted }) => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "Completed") return todo.completed;
    if (activeTab === "Open") return !todo.completed;
    return true;
  });

  return (
    <div>
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        countCompleted={todos.filter((todo) => todo.completed).length}
        countOpen={todos.filter((todo) => !todo.completed).length}
      />
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleCompleted} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
