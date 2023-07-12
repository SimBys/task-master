import styles from './TodoTask.module.css'
import {KeyboardEvent, useState} from "react";

export type TodoTaskType = {
    id: number,
    value: string,
    completed?: boolean,
    due?: Date,
    favorite?: boolean,
}

type Props = {
    onValueChange?: (value: string) => void,
    task?: TodoTaskType,
    onComplete?: (id: number) => void,
    onUncomplete?: (id: number) => void,
    onDelete?: (id: number) => void,
    onToggleFavorite?: (id: number) => void,
    isAddTask?: boolean,
}

/**
 * Todo task component
 * @param props.isAddTask - Whether the component is used for adding tasks
 */
export default function TodoTask(props: Props) {
    const [value, setValue] = useState(props.task?.value ?? '')

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!props.isAddTask || e.key !== 'Enter' || !value || !value.trim()) return

        props.onValueChange?.(value)
        setValue('')
    }

    return <div className={styles.container}>
        {!props.isAddTask && <button className={styles.doneButton} onClick={() => props.task?.completed ?
            props.onUncomplete?.(props.task.id) : props.onComplete?.(props.task?.id ?? -1)}>
            {props.task?.completed ? 'Back' : 'Done'}</button>}
        <input onKeyDown={onInputKeyDown} type="text" placeholder={props.isAddTask ? 'Add task' : ''} value={value}
               onChange={a => setValue(a.target.value)}/>
        {!props.isAddTask && <button className={props.task?.favorite ? styles.favorite : ''}
            onClick={() => props.onToggleFavorite?.(props.task!.id)}>Favorite</button>}
        {!props.isAddTask && <button className={styles.deleteButton} onClick={() => props.onDelete!(props.task!.id)}>Delete</button>}
    </div>
}