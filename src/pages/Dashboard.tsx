import styles from './Dashboard.module.css';
import Todo from "../Components/Todo/Todo";

export default function Dashboard() {
    return (
        <>
            <h1 style={{textAlign: 'center'}}>TASK MASTER</h1>
            <h2 style={{textAlign: 'center'}}>The Ultimate TODO</h2>

            <Todo />

            <p className={styles.footer}>*All data is stored locally in your browser. No data is sent to any server.</p>
        </>
    );
}