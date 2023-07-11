import './Todo.css'
import TodoTask from "./TodoTask";

export default function Todo() {


    return <div className={'container'}>
        <h2>Todo</h2>

        <div className="task-container">
            <TodoTask />
            <TodoTask />
            <TodoTask />
        </div>
    </div>
}