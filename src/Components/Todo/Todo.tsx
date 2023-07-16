import TodoTask from "./TodoTask";
import {useContext, useEffect, useState} from "react";
import {TodoDataContext} from "../../App";
import {saveTodoData} from "../../DataController";
import {Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField} from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export default function Todo() {
    const [showCompleted, setShowCompleted] = useState(false);
    const ctx = useContext(TodoDataContext)

    const tasks = ctx.tasks
    const setTasks = ctx.setTasks

    useEffect(() => saveTodoData(tasks), [tasks]);

    const onToggleTaskComplete = (id: number) => setTasks(tasks.map(a => a.id === id ? {...a, completed: !a.completed} : a))

    const addTask = (value: string) => setTasks([...tasks, {value, id: tasks.length + 1}])

    const deleteTask = (id: number) => setTasks(tasks.filter(a => a.id !== id))

    const toggleFavorite = (id: number) => setTasks(tasks.map(a => a.id === id ? {...a, favorite: !a.favorite} : a))



    return <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
            {/*Add task*/}
            <TextField
                autoComplete={"off"}
                onBlur={(e) => addTask(e.target.value)}
                label="Add a new task"
                fullWidth
            />

            <Container sx={{ overflow: 'auto', maxHeight: '60vh', paddingX: '0!important'}}>
                {/*Tasks*/}
                <List>
                    {tasks.filter(a => !a.completed)
                        .sort((a, b) => a.favorite ? 0 : 1)
                        .map((task, index) => <TodoTask key={task.id} task={task}
                            onToggleComplete={onToggleTaskComplete} onDelete={deleteTask} onToggleFavorite={toggleFavorite}
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
                                      onDelete={deleteTask}/>)}
                    </Collapse>
                </List>


            </Container>

        </Paper>
    </Container>
}
