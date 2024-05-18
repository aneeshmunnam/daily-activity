import { useEffect, useState } from "react";
import TaskList from "../common/TaskList";

export default function Work({selectedDate}) {
    const [workTasks, setWorkTasks] = useState([]);

    const [workTask, setWorkTask] = useState({
        "id": 0,
        "task": "",
        "status": false
    });

    useEffect(() => {
        setWorkTasks([]);
    }, [selectedDate]);

    const handlePersonal = (e) => {
        if (workTask && workTask.task.length === 0) return;
        setWorkTasks([
            ...workTasks,
            workTask
        ]);
        setWorkTask({
            "id": 0,
            "task": "",
            "status": false
        });
        e.preventDefault();
    };

    const handleWorkTask = (e) => {
        setWorkTask({
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": e.target.value,
            "status": false
        })
    };

    const handleWorkStatus = (id) => {
        setWorkTasks(workTasks.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeleteWorkTask = (id) => {
        setWorkTasks(workTasks.filter(task => task.id !== id));
    }

    const handleEditWorkTask = (editTask) => {
        setWorkTasks(workTasks.map((task) => {
            if (task.id === editTask.id) {
                task.task=editTask.task;
                return task;
            } else {
                return task;
            }
        }));
    }

    return (
        <div>
            <h2 key="header">Work</h2>
            <div className="row mb-4">
                <div className="col-auto">
                    <input type="text" 
                    className="form-control"
                    value={workTask.task}
                    placeholder="Take a work task" 
                    onChange={handleWorkTask} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handlePersonal}>Work task</button>
                </div>
            </div>
            <TaskList tasks={workTasks} 
                    handleStatus={handleWorkStatus} 
                    handleDeleteTask={handleDeleteWorkTask} 
                    handleEditTask={handleEditWorkTask} />
        </div>
    );
}