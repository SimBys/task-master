import styles from './TodoTask.module.css'
import React, {KeyboardEvent, useState} from "react";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import BackIcon from '@mui/icons-material/ArrowUpward';
import {Button, IconButton, ListItem, TextField} from "@mui/material";

export type TodoTaskType = {
    id: number,
    value: string,
    completed?: boolean,
    due?: Date,
    favorite?: boolean,
}

type Props = {
    task: TodoTaskType,
    onToggleComplete: (id: number) => void,
    onDelete: (id: number) => void,
    onEdit: (id: number, value: string) => void,
    onToggleFavorite?: (id: number) => void,
}

export default function TodoTask(props: Props) {
    const [value, setValue] = useState(props.task.value ?? '')

    let dontEditTask = false
    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (dontEditTask) {
            dontEditTask = false
            return
        }
        const value = e.currentTarget.value.trim()
        if (value !== '')
            props.onEdit(props.task.id, value)
        e.currentTarget.value = ''
    }

    function editKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.currentTarget.blur()
            return
        }

        if (e.key === 'Escape') {
            e.currentTarget.value = ''
            dontEditTask = true
            e.currentTarget.blur()
        }
    }


    return <ListItem key={props.task.id ?? 'add task'} sx={{ p: '2px 0'}}>
            {<IconButton style={{color: props.task.completed ? 'white' : 'greenyellow'}} onClick={() => props.onToggleComplete(props.task.id)}>
                {props.task.completed ? <BackIcon /> : <DoneIcon />}</IconButton>}

            <TextField
                fullWidth
                value={value}
                onChange={a => setValue(a.target.value)}
                className={styles.input}
                size='small'
                autoComplete={"off"}
                inputProps={{ onBlur: onBlur, onKeyDown: editKeyDown }}
            />

            {<IconButton style={{color: props.task.favorite ? 'gold' : 'white'}} onClick={() => props.onToggleFavorite?.(props.task.id)}>
                <StarIcon /></IconButton>}
            {<IconButton className={styles.deleteButton} onClick={() => props.onDelete(props.task.id)}>
                <DeleteIcon color={'error'} /></IconButton>}
    </ListItem>
}
