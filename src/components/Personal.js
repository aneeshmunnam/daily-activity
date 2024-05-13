import { useEffect, useState } from "react";
import TaskList from "../common/TaskList";

export default function Personal({selectedDate}) {
    const [personalTasks, setPersonalTasks] = useState([]);

    const [personalTask, setPersonalTask] = useState({
        "id": 0,
        "task": "",
        "status": false
    });

    useEffect(() => {
        // Will pull data from rxdb
        setPersonalTasks([]);
    }, [selectedDate]);

    const handlePersonal = (e) => {
        if (personalTask && personalTask.task.length === 0) return;
        setPersonalTasks([
            ...personalTasks,
            personalTask
        ]);
        setPersonalTask({
            "id": 0,
            "task": "",
            "status": false
        });
        e.preventDefault();
    };

    const handlePersonalTask = (e) => {
        setPersonalTask({
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": e.target.value,
            "status": false
        })
    };

    const handlePersonalStatus = (id) => {
        setPersonalTasks(personalTasks.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeletePersonalTask = (id) => {
        setPersonalTasks(personalTasks.filter(task => task.id !== id));
    }

    const handleEditPersonalTask = (editTask) => {
        setPersonalTasks(personalTasks.map((task) => {
            if (task.id === editTask.id) {
                task.task=editTask.task;
                return task;
            } else {
                return task;
            }
        }));
    }

    return (
        <div className="container">
            <h3 key="header">Personal</h3>
            <TaskList tasks={personalTasks} 
                    handleStatus={handlePersonalStatus} 
                    handleDeleteTask={handleDeletePersonalTask} 
                    handleEditTask={handleEditPersonalTask} />
            <div className="row mb-4">
                <div className="col-auto">
                    <input type="text" 
                    className="form-control"
                    value={personalTask.task}
                    placeholder="Take a task" 
                    onChange={handlePersonalTask} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handlePersonal}>Add task</button>
                </div>
            </div>
        </div>
    );
}