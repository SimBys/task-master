import {TodoTaskType} from "./Components/Todo/TodoTask";

const todoDataKey = 'todo'

export const loadTodoData = () => {
    const value = localStorage.getItem(todoDataKey)
    if (value)
        return JSON.parse(value) as TodoTaskType[]
}

export const saveTodoData = (data: any) => {
    localStorage.setItem(todoDataKey, JSON.stringify(data))
}
