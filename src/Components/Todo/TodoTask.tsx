import styles from './TodoTask.module.css'
import {KeyboardEvent, useState} from "react";

export type TodoTaskType = {
    id: number, value: string, completed?: boolean, due?: Date,
}

type Props = {
    task?: TodoTaskType,
    onComplete?: (id: number) => void,
    onUncomplete?: (id: number) => void,
    onValueChange?: (value: string) => void,
    onDelete?: (id: number) => void,
    addTaskFunc?: (value: string) => void, // function to add a task
}

/**
 * Todo task component
 * @param props.addTaskFunc function to add a task - when provided, the component will be used to add tasks
 */
export default function TodoTask(props: Props) {
    const [value, setValue] = useState(props.task?.value ?? '')

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!props.addTaskFunc || e.key !== 'Enter' || !value || !value.trim()) return

        props.addTaskFunc(value)
        setValue('')
    }

    return <div className={styles.container}>
        {!props.addTaskFunc && <button className={styles.doneButton} onClick={() => props.task?.completed ?
            props.onUncomplete?.(props.task.id) : props.onComplete?.(props.task?.id ?? -1)}>
            {props.task?.completed ? 'Back' : 'Done'}</button>}
        <input onKeyDown={onInputKeyDown} type="text" placeholder={props.addTaskFunc ? 'Add task' : ''} value={value}
               onChange={a => setValue(a.target.value)}/>
        {!props.addTaskFunc && <button className={styles.deleteButton} onClick={() => props.onDelete!(props.task!.id)}>Delete</button>}
    </div>
}