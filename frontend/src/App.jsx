import { useEffect, useState } from "react";
import API from "./api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import Pagination from "./components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import "react-confirm-alert/src/react-confirm-alert.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/todos?page=${page}&limit=3`);

      if (data.todos.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setTodos(data.todos);
        setPages(data.pages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-3 text-center">Todo List</h1>

      <TodoForm refresh={fetchTodos} />

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={35} />
        </div>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Todos Found</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} refresh={fetchTodos} />
        ))
      )}

      {todos.length > 0 && pages > 1 && (
        <Pagination page={page} pages={pages} setPage={setPage} />
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
