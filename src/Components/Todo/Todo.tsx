import TodoTask from "./TodoTask";
import React, {useContext, useEffect, useState} from "react";
import {TodoDataContext} from "../../App";
import {saveTodoData} from "../../DataController";
import {Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField} from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export default function Todo() {
    const [showCompleted, setShowCompleted] = useState(false);
    const { tasks, setTasks } = useContext(TodoDataContext);

    useEffect(() => saveTodoData(tasks), [tasks]);

    const onToggleTaskComplete = (id: number) => setTasks(tasks.map(a => a.id === id ? {...a, completed: !a.completed} : a))

    const addTask = (value: string) => {
        const lastTask = tasks.at(-1)
        const id = lastTask ? lastTask.id + 1 : 0
        return setTasks([...tasks, {value, id: id}]);
    }

    const deleteTask = (id: number) => setTasks(tasks.filter(a => a.id !== id))

    const toggleFavorite = (id: number) => setTasks(tasks.map(a => a.id === id ? {...a, favorite: !a.favorite} : a))

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
        setTasks(tasks.map(a => a.id === id ? {...a, value} : a))
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
