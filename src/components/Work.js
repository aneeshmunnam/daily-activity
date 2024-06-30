import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";
import { db } from "../common/db";

export default function Work({selectedDate}) {
    const [workTasks, setWorkTasks] = useState([]);

    const workTask = useRef('');

    useEffect(() => {
        const fetchWorkTasks = async () => {
            try {
                const selectedWorkTasks = await db.workTasks.where("date").equals(selectedDate).toArray();
                setWorkTasks(selectedWorkTasks);
            } catch (error) {
                console.log("Error fetching items for date" +selectedDate);
            }
        };
        fetchWorkTasks();
    }, [selectedDate]);

    const handleWork = async (e) => {
        if (workTask.current && workTask.current.value.length === 0) return;
        const task = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workTask.current.value,
            "status": false,
            "date": selectedDate
        };

        await db.workTasks.add({
            id: task.id,
            task: task.task, 
            status: task.status,
            date: selectedDate
        });

        setWorkTasks([
            ...workTasks,
            task
        ]);
        workTask.current.value = '';
        e.preventDefault();
    };

    const handleWorkStatus = (id) => {
        setWorkTasks(workTasks.map((task) => {
            if (task.id === id) {
                db.workTasks.update(id, {
                    status: !task.status
                });
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeleteWorkTask = async (id) => {
        await db.workTasks.delete(id);
        setWorkTasks(workTasks.filter(task => task.id !== id));
    }

    const handleEditWorkTask = (editTask) => {
        setWorkTasks(workTasks.map(async (task) => {
            if (task.id === editTask.id) {
                await db.workTasks.update(task.id, {
                    task: editTask.task
                });
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
                <div className="col-10">
                    <input type="text" 
                    className="form-control"
                    ref={workTask}
                    placeholder="Take a work task" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleWork}>
                    <i className="bi bi-plus-square-fill"></i>
                    </button>
                </div>
            </div>
            <TaskList tasks={workTasks} 
                    handleStatus={handleWorkStatus} 
                    handleDeleteTask={handleDeleteWorkTask} 
                    handleEditTask={handleEditWorkTask} />
        </div>
    );
}