import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const todos = await Todo.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Todo.countDocuments();

    res.json({
      todos,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
