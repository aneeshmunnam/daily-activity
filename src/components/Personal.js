import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";

export default function Personal({selectedDate}) {
    const [personalTasks, setPersonalTasks] = useState([]);

    const personalTask = useRef('');

    useEffect(() => {
        // Will pull data from rxdb
        setPersonalTasks([]);
    }, [selectedDate]);

    const handlePersonal = (e) => {
        if (personalTask && personalTask.current.length === 0) return;
        const task = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": personalTask.current.value,
            "status": false
        };
        setPersonalTasks([
            ...personalTasks,
            task
        ]);
        personalTask.current.value = '';
        e.preventDefault();
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
        <div>
            <h2 key="header">Personal</h2>
            <div className="row mb-4">
                <div className="col-auto">
                    <input type="text" 
                    className="form-control"
                    ref={personalTask}
                    placeholder="Take a personal task" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handlePersonal}>Personal task</button>
                </div>
            </div>
            <TaskList tasks={personalTasks} 
                    handleStatus={handlePersonalStatus} 
                    handleDeleteTask={handleDeletePersonalTask} 
                    handleEditTask={handleEditPersonalTask} />
        </div>
    );
}