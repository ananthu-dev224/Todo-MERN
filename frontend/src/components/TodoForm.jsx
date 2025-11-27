import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function TodoForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required!");

    await API.post("/todos", { title, description });
    toast.success("Todo Added!");
    setTitle("");
    setDesc("");
    refresh();
  };

  return (
    <form className="mb-5" onSubmit={addTodo}>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Add Todo
      </button>
    </form>
  );
}
