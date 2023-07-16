import {NavLink} from "react-router-dom";
import {
    AppBar,
    Button,
    Container,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Toolbar,
    Typography
} from '@mui/material'
import React, {useState} from "react";

/**
 * @desc First page the user sees before logging in.
 */


export default function About() {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleTaskChange = (event: any) => {
        setTask(event.target.value);
    };

    const handleAddTask = () => {
        if (task.trim() !== '') {
            // @ts-ignore
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const handleDeleteTask = (index: any) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <TextField
                    label="Add a new task"
                    fullWidth
                    value={task}
                    onChange={handleTaskChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddTask} fullWidth>
                    Add
                </Button>
                <List sx={{ mt: 2 }}>
                    {tasks.map((task, index) => (
                        <ListItem key={index} secondaryAction={
                            <Button color="secondary" onClick={() => handleDeleteTask(index)}>Delete</Button>
                        }>
                            <TextField value={task}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
}
