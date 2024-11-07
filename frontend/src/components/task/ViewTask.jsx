import { useEffect, useState } from "react";
import { viewTask } from "./taskService";
import SQLPlayground from "../SQLPlayground/SQLPlayground";

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await viewTask();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h3 style={styles.sidebarTitle}>Tasks</h3>
                <ul style={styles.taskList}>
                    {tasks?.map((task) => (
                        <section>
                            <li
                            key={task.id}
                            style={styles.taskItem}
                            onClick={() => setSelectedTask(task)}
                        >
                            {task.title}
                        </li>
                        
                        </section>
                        
                    ))}
                </ul>
            </div>
            <div style={styles.content}>
                {selectedTask ? (
                    <>
                        <h2 style={styles.taskTitle}>{selectedTask.title}</h2>
                        <p style={styles.taskDescription}>{selectedTask.description}</p>
                        <p style={styles.taskDate}>
                            Created on: {new Date(selectedTask.createdAt).toLocaleDateString()}
                        </p>
                        <SQLPlayground/>
                    </>
                ) : (
                    <p style={styles.placeholder}>Select a task to view details</p>
                )}
            </div>
        </div>
    );
};

// Styling for the component
const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#f0f0f5',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        overflowY: 'auto',
    },
    sidebarTitle: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '10px',
    },
    taskList: {
        listStyle: 'none',
        padding: 0,
    },
    taskItem: {
        padding: '10px',
        cursor: 'pointer',
        color: '#444',
        borderRadius: '4px',
        marginBottom: '5px',
        transition: 'background-color 0.3s',
    },
    taskItemHovered: {
        backgroundColor: '#e0e0eb',
    },
    content: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
    },
    taskTitle: {
        fontSize: '2rem',
        color: '#333',
    },
    taskDescription: {
        fontSize: '1.1rem',
        color: '#555',
        marginTop: '10px',
    },
    taskDate: {
        fontSize: '0.9rem',
        color: '#888',
        marginTop: '20px',
    },
    placeholder: {
        fontSize: '1.2rem',
        color: '#888',
        textAlign: 'center',
        marginTop: '50px',
    },
};

export default ViewTask;
