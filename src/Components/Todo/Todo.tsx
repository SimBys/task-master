import TodoTask, {TodoTaskType} from "./TodoTask";
import React, {useContext, useState} from "react";
import {AuthContext, TodoDataContext} from "../../App";
import {saveTodoData} from "../../DataController";
import {Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField} from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export default function Todo() {
    const [showCompleted, setShowCompleted] = useState(false);
    const { tasks, setTasks } = useContext(TodoDataContext);
    const {user} = useContext(AuthContext);

    const save = (newData: TodoTaskType[]) => saveTodoData({todos: newData, username: user!.username})

    const onToggleTaskComplete = (id: number) => {
        const newData = tasks.map(a => a.id === id ? {...a, completed: !a.completed} : a)
        save(newData)
        setTasks(newData);
    }

    const addTask = (value: string) => {
        const lastTask = tasks.at(-1)
        const id = lastTask ? lastTask.id + 1 : 0
        const newData = [...tasks, {value, id: id}]
        save(newData)
        setTasks(newData);
    }

    const deleteTask = (id: number) => {
        const newData = tasks.filter(a => a.id !== id)
        save(newData)
        setTasks(newData);
    }

    const toggleFavorite = (id: number) => {
        const newData = tasks.map(a => a.id === id ? {...a, favorite: !a.favorite} : a)
        save(newData)
        setTasks(newData);
    }

    let dontAddTask = false
    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (dontAddTask) {
            dontAddTask = false
            return
        }
        const value = e.currentTarget.value.trim()
        if (value !== '')
            addTask(value)
        e.currentTarget.value = ''
    }

    function addTaskKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const value = e.currentTarget.value.trim()
            if (value !== '')
                addTask(value)
            e.currentTarget.value = ''
            return
        }

        if (e.key === 'Escape') {
            e.currentTarget.value = ''
            dontAddTask = true
            e.currentTarget.blur()
        }
    }

    function onEdit(id: number, value: string) {
        const newData = tasks.map(a => a.id === id ? {...a, value} : a)
        save(newData)
        setTasks(newData);
    }

    return <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2, border: 1 }}>
            {/*Add task*/}
            <TextField
                autoComplete={"off"}
                inputProps={{ onBlur: onBlur, onKeyDown: addTaskKeyDown }}
                label="Add a new task"
                fullWidth
            />

            <Container sx={{ overflow: 'auto', maxHeight: '65vh', paddingX: '0!important'}}>
                {/*Tasks*/}
                <List>
                    {tasks.filter(a => !a.completed)
                        .sort((a, b) => a.favorite ? 0 : 1)
                        .map((task, index) => <TodoTask key={task.id} task={task}
                            onToggleComplete={onToggleTaskComplete} onDelete={deleteTask} onEdit={onEdit} onToggleFavorite={toggleFavorite}
                        />)}
                </List>
                {/*Completed tasks*/}
                <List>
                    <ListItemButton onClick={() => setShowCompleted(!showCompleted)}>
                        <ListItemIcon>
                            {showCompleted ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                    </ListItemButton>
                    <Collapse in={showCompleted} timeout={200} >
                        {tasks.filter(a => a.completed).reverse().map((task, index) =>
                            <TodoTask key={task.id} task={task} onToggleComplete={onToggleTaskComplete}
                                      onDelete={deleteTask} onEdit={onEdit}/>)}
                    </Collapse>
                </List>


            </Container>

        </Paper>
    </Container>
}
