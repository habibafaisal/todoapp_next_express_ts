"use client";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "@/api/tasks/tasks";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    if (!token) {
      router.push("/auth/login");
    }

    try {
      const response = await getTasks(token);
      if (response) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // Handle task creation
  const handleCreateTask = async () => {
    if (!newTask.trim()) {
      alert("Error: Task cannot be empty.");
      return;
    }

    if (!userId || !token) {
      alert("Error: You must be logged in to create a task.");
      return;
    }

    try {
      const response = await createTask(
        userId,
        newTask,
        "Task description here",
        token
      );
      await fetchTasks();
      if (response) {
        alert("Success: Task created!");
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const handleToggleCompletion = async (id: string) => {
    const updatedTask = tasks.find((task) => task._id === id);
    if (!updatedTask) return;

    try {
      const updatedData = {
        ...updatedTask,
        completed: !updatedTask.completed,
      };
      const response = await updateTask(id, updatedData, token);
      if (response) {
        await fetchTasks();
        alert("Success: Task updated!");
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await deleteTask(id, token);
      if (response) {
        await fetchTasks();
        alert("Success: Task deleted!");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-4">
          To-Do List
        </h1>
        <p className="mt-2 text-lg text-center text-gray-700">
          Create, update, and manage your tasks.
        </p>

        {/* Task creation form */}
        <div className="mt-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Add a new task"
          />
          <button
            onClick={handleCreateTask}
            className="mt-2 w-full px-6 py-2 text-white bg-blue-600 rounded-md font-semibold"
          >
            Add Task
          </button>
        </div>

        {/* Task list */}
        <ul className="mt-6 space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task._id)}
                  className="h-5 w-5 text-blue-600"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  } text-lg text-gray-800`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="px-4 py-2 text-white bg-red-600 rounded-md font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
