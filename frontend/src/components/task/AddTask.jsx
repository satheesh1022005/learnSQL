import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addTask } from './taskService';

const AddTask = () => {
    const [taskData, setTaskData] = useState({ title: '', description: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleAddTask = () => {
        if (taskData.title && taskData.description) {
            console.log(taskData)
            addTask(taskData);
            setTaskData({ title: '', description: ''});
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className="container my-5 p-4 rounded shadow-sm" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
            <h2 className="text-center mb-4" style={{ color: '#4a4a4a' }}>Add New Task</h2>

            <div className="form-group mb-3">
                <label htmlFor="title">Task Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    required
                />
            </div>

            <button onClick={handleAddTask} className="btn btn-primary w-100 mb-3">
                Add Task
            </button>
        </div>
    );
};

export default AddTask;
