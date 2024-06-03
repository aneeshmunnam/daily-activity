import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";

export default function Work({selectedDate}) {
    const [workTasks, setWorkTasks] = useState([]);

    const workTask = useRef('');

    // useEffect(() => {
    //     const tasks = JSON.parse(localStorage.getItem("workTasksWithDate"));
    //     if (tasks) {
    //         setWorkTasks(tasks);
    //     }
    // }, []);

    useEffect(() => {
        let selectedWorkTasks = localStorage.getItem("workTasksWithDate") ? 
                    JSON.parse(localStorage.getItem("workTasksWithDate")) : [];
        selectedWorkTasks.filter(task => task.date === selectedDate)
        setWorkTasks(selectedWorkTasks);
    }, [selectedDate]);

    useEffect(() => {
        if (workTasks.length > 0) {
            let currentTasks = JSON.parse(localStorage.getItem("workTasksWithDate"));
            if (currentTasks)
                currentTasks.push(workTasks);
            else 
                currentTasks = workTasks;
            localStorage.setItem("workTasksWithDate", JSON.stringify(currentTasks));
        }
        console.log(localStorage.getItem("workTasksWithDate"));
    }, [workTasks]);

    const handleWork = (e) => {
        if (workTask.current && workTask.current.length === 0) return;
        const task = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workTask.current.value,
            "status": false,
            "date": selectedDate
        };
        setWorkTasks([
            ...workTasks,
            task
        ]);
        // workTasks.push(task);
        // localStorage.setItem("workTasksWithDate", JSON.stringify(workTasks));
        workTask.current.value = '';
        e.preventDefault();
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
                    ref={workTask}
                    placeholder="Take a work task" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleWork}>Work task</button>
                </div>
            </div>
            <TaskList tasks={workTasks} 
                    handleStatus={handleWorkStatus} 
                    handleDeleteTask={handleDeleteWorkTask} 
                    handleEditTask={handleEditWorkTask} />
        </div>
    );
}