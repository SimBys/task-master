import styles from './Dashboard.module.css';
import Todo from "../Components/Todo/Todo";

export default function Dashboard() {
    return (
        <>
            <Todo />
            <p className={styles.footer}>*All data is stored locally in your browser. No data is sent to any server.</p>
        </>
    );
}