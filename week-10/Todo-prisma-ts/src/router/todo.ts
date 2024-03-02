import { Request, Router } from "express";
import zod from "zod";

import { authMiddleware } from "../middleware/middleware";
import prisma from "../config/db";

const router = Router();

const todoCheck = zod.object({
  title: zod.string().min(3),
  description: zod.string().min(5),
});

const updateTodoCheck = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
  completed: zod.boolean().optional(),
});

interface AuthRequest extends Request {
  userId?: number;
}

router.post("/createtodo", authMiddleware, async (req: AuthRequest, res) => {
  const validInps = todoCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  const { title, description } = req.body;

  if (typeof req.userId !== "number") {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const userId = req.userId;

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });

  res.status(200).json({
    message: "Todo added successfully to user with id " + userId,
  });
});

router.put("/updatetodo/:todoId", authMiddleware, async (req, res) => {
  const { todoId } = req.params;

  const realTodoId = parseInt(todoId);

  const todo = await prisma.todo.findUnique({
    where: {
      id: realTodoId,
    },
  });

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const validInps = updateTodoCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id: realTodoId,
    },
    data: {
      title: validInps.data.title ?? todo.title,
      description: validInps.data.description ?? todo.description,
      completed: validInps.data.completed ?? todo.completed,
    },
  });

  res.status(200).json({
    message: "Todo updated successfully",
    updatedTodo,
  });
});

router.delete("/deletetodo/:todoId", authMiddleware, async (req, res) => {
  const { todoId } = req.params;

  const realTodoId = parseInt(todoId);

  const todo = await prisma.todo.findUnique({
    where: {
      id: realTodoId,
    },
  });

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  await prisma.todo.delete({
    where: {
      id: realTodoId,
    },
  });

  res.status(200).json({
    message: "Todo deleted successfully",
  });
});

router.get("/todos", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;

  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json({
    todos,
  });
});

router.get("/userandtodos", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;

  const userAndTodos = await prisma.todo.findMany({
    where: {
      userId,
    },
    select: {
      user: true,
      id: true,
      title: true,
      description: true,
      completed: true,
    },
  });
});

export default router;
