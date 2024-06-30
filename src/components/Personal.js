import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";
import { db } from "../common/db";

export default function Personal({selectedDate}) {
    const [personalTasks, setPersonalTasks] = useState([]);

    const personalTask = useRef('');

    useEffect(() => {
        const fetchPersonalTasks = async () => {
            try {
                const selectedPersonalTasks = await db.personalTasks.where("date").equals(selectedDate).toArray();
                setPersonalTasks(selectedPersonalTasks);
            } catch (error) {
                console.log("Error fetching items for date" +selectedDate);
            }
        };
        fetchPersonalTasks();
    }, [selectedDate]);

    const handlePersonal = async (e) => {
        if (personalTask && personalTask.current.value.length === 0) return;
        const task = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": personalTask.current.value,
            "status": false
        };
        await db.personalTasks.add({
            id: task.id,
            task: task.task,
            status: task.status,
            date: selectedDate
        });
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
                db.personalTasks.update(id, {
                    status: !task.status
                });
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeletePersonalTask = async (id) => {
        await db.personalTasks.delete(id);
        setPersonalTasks(personalTasks.filter(task => task.id !== id));
    }

    const handleEditPersonalTask = (editTask) => {
        setPersonalTasks(personalTasks.map((task) => {
            if (task.id === editTask.id) {
                task.task=editTask.task;
                db.personalTasks.update(task.id, {
                    task : editTask.task
                });
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
                <div className="col-10">
                    <input type="text" 
                    className="form-control"
                    ref={personalTask}
                    placeholder="Take a personal task" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handlePersonal}>
                        <i className="bi bi-plus-square-fill"></i>
                    </button>
                </div>
            </div>
            <TaskList tasks={personalTasks} 
                    handleStatus={handlePersonalStatus} 
                    handleDeleteTask={handleDeletePersonalTask} 
                    handleEditTask={handleEditPersonalTask} />
        </div>
    );
}