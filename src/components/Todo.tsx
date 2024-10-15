import React, { useState } from "react";
import { Todo as TodoType } from "../types/todo";
import dayjs from "dayjs";

interface TodoProps {
  todo: TodoType;
  toggleComplete: (todo: TodoProps["todo"]) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, toggleComplete }) => {
  const [isToBeCompleted, setIsToBeCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsToBeCompleted(true);

    setTimeout(() => {
      toggleComplete(todo);
      setIsToBeCompleted(false);
      console.log("toggleComplete ", todo);
    }, 1000);
  };

  const isChecked = isToBeCompleted ? !todo.completed : todo.completed;

  return (
    <li
      key={todo.id}
      className={`bg-white rounded-lg p-4 transition-opacity duration-500 ${
        isChecked ? "opacity-50" : "opacity-100"
      }`}
    >
      <div>
        <div className="flex justify-between">
          <div>
            <span className={`${isChecked ? "line-through" : ""} font-bold`}>
              {todo.title}
            </span>
            <p className="text-gray-500 text-sm">{todo.description}</p>
          </div>
          <div>
            <input
              type="checkbox"
              className="h-6 w-6 rounded-full focus:ring-0 focus:outline-none"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 mt-2"></div>

        <div className="flex items-center w-full mt-2">
          {dayjs(todo.deadline).isSame(dayjs(), "day") && (
            <span className="text-gray-700 mr-2">Today</span>
          )}
          <span className="text-gray-400">
            {dayjs(todo.deadline).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Todo;
