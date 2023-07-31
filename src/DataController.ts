import {TodoTaskType} from "./Components/Todo/TodoTask";

const todoDataKey = 'data'

export const loadTodoData = (username: string): TodoTaskType[] => {
    const allDataRaw = localStorage.getItem(todoDataKey)
    if (allDataRaw) {
        const allData = JSON.parse(allDataRaw) as TodoDataRawType[]
        const userData = allData.find(a => a.username === username)
        if (userData)
            return userData.todos
    }
    return []
}

export type TodoDataRawType = {
    todos: TodoTaskType[],
    username: string
}
export const saveTodoData = (data: TodoDataRawType) => {
    let allDataString = localStorage.getItem(todoDataKey)
    let allData: TodoDataRawType[] | null = null
    if (allDataString) {
        allData = JSON.parse(allDataString) as TodoDataRawType[]
        const index = allData.findIndex(a => a.username === data.username)
        index === -1 ? allData.push(data) : allData[index] = data;
    }
    else
        allData = [data]
    localStorage.setItem(todoDataKey, JSON.stringify(allData));
}
