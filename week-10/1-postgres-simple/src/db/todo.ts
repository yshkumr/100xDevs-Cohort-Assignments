import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const insertTodoQuery =
    "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING title, description, done, id";

  const values = [userId, title, description];

  const response = await client.query(insertTodoQuery, values);

  return response.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const updateTodoQuery =
    "UPDATE todos SET done = true WHERE id = $1 RETURNING title, description, done, id";

  const values = [todoId];

  const response = await client.query(updateTodoQuery, values);

  return response.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const todoQuery = "SELECT * FROM todos WHERE user_id = $1";

  const values = [userId];

  const response = await client.query(todoQuery, values);

  return [...response.rows];
}
