import API from "../api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useState } from "react";

export default function TodoItem({ todo, refresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const updateStatus = async (e) => {
    try {
      await API.put(`/todos/${todo._id}`, { status: e.target.value });
      toast.info("Status Updated");
      refresh();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const saveEdit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      await API.put(`/todos/${todo._id}`, { title, description });
      toast.success("Todo Updated");
      setEditing(false);
      refresh();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteTodo = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this todo?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await API.delete(`/todos/${todo._id}`);
              refresh();
              toast.success("Todo deleted successfully");
            } catch (err) {
              toast.error("Failed to delete");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
      {editing ? (
        <div>
          <input
            className={`w-full border p-2 rounded mb-2 ${
              !title.trim() ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            required
            placeholder="Enter todo title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border border-gray-300 p-2 rounded mb-2"
            value={description}
            placeholder="Enter description (optional)"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            className="bg-green-600 text-white px-3 py-1.5 rounded mr-2"
            onClick={saveEdit}
          >
            Save
          </button>

          <button
            className="bg-gray-500 text-white px-3 py-1.5 rounded"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
              {todo.description && (
                <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
              )}

              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-semibold text-gray-700">Status:</span>
                <select
                  className="text-sm border border-gray-300 rounded-md p-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={todo.status}
                  onChange={updateStatus}
                >
                  <option>Pending</option>
                  <option>In-Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
              onClick={deleteTodo}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
