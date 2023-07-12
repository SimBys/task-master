import styles from './Todo.module.css'
import TodoTask, {TodoTaskType} from "./TodoTask";
import {useEffect, useState} from "react";

export default function Todo() {
    const [tasks, setTasks] = useState<TodoTaskType[]>([{value: 'Task 1', id: 1}, {
        value: 'Task 2',
        id: 2
    }, {value: 'Task 3', id: 3},]);
    const [showCompleted, setShowCompleted] = useState(false);

    const onTaskComplete = (id: number) => {
        setTasks(tasks.map(a => a.id === id ? {...a, completed: true} : a))
    }

    const onTaskUncomplete = (id: number) => {
        setTasks(tasks.map(a => a.id === id ? {...a, completed: false} : a))
    }

    const addTask = (value: string) => setTasks([...tasks, {value, id: tasks.length + 1}])

    const toggleShowCompletedTasks = () => setShowCompleted(!showCompleted)

    const deleteTask = (id: number) => setTasks(tasks.filter(a => a.id !== id))

    const toggleFavorite = (id: number) => setTasks(tasks.map(a => a.id === id ? {...a, favorite: !a.favorite} : a))


    return <div className={styles.container}>
        <h2>Todo</h2>

        <TodoTask onValueChange={addTask} isAddTask/>

        <div className={styles.taskContainer}>
            {/*Tasks*/}
            {tasks.filter(a => !a.completed).sort((a, b) => a.favorite ? 0 : 1).map((task, index) => <TodoTask key={task.id} task={task}
                onComplete={onTaskComplete} onDelete={deleteTask} onToggleFavorite={toggleFavorite}/>)}
            {/*Completed tasks toggle*/}
            <div>
                <h5>Completed</h5>
                <button className={styles.showCompletedTasksButton} onClick={toggleShowCompletedTasks}>Show</button>
            </div>
            {/*Completed tasks*/}
            {showCompleted && tasks.filter(a => a.completed).reverse().map((task, index) =>
                <TodoTask key={task.id} task={task} onUncomplete={onTaskUncomplete} onDelete={deleteTask}/>)}
        </div>

    </div>
}