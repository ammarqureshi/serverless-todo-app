import { TodoDAO } from '../dao/todoDAO'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodoUpdate } from '../models/TodoUpdate'
import { getDownloadUrl } from './imageService'
import * as uuid from 'uuid'

const todoDAO = new TodoDAO()

export async function getTodos(userId: string): Promise<TodoItem[]> {
  //fetch items for user
  const todoItems = await todoDAO.getTodos(userId)

  for (const todoItem of todoItems) {
    delete todoItem.userId

    if (todoItem.hasUpload === true)
      todoItem.attachmentUrl = getDownloadUrl(todoItem.todoId, userId)
  }

  return todoItems
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const itemId = uuid.v4()

  return await todoDAO.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl: null,
    createdAt: new Date().toISOString(),
    hasUpload: false
  })
}

export async function updateTodo(
  todoId: string,
  userId: string,
  updateTodoRequest: UpdateTodoRequest
): Promise<TodoUpdate> {
  return await todoDAO.updateTodo(todoId, userId, {
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    done: updateTodoRequest.done
  })
}

export async function deleteTodo(
  todoId: string,
  userId: string
): Promise<void> {
  await todoDAO.deleteTodo(todoId, userId)
}

export async function getTodo(todoId: string): Promise<TodoItem> {
  return await todoDAO.getTodo(todoId)
}

export async function updateImageUploaded(
  todoId: string,
  userId: string
): Promise<void> {
  await todoDAO.updateHasUpload(todoId, userId)
}
