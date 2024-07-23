import { useEffect, useRef, useState } from "react"
import TaskList from "../common/TaskList";
import { db } from "../common/db";

export default function Warmup({selectedDate}) {

    const workout = useRef('');

    const [warmups, setWarmups] = useState([]);

    useEffect(() => {
        const fetchWarmups = async () => {
            try {
                const selectedWorkTasks = await db.warmupTasks.where("date").equals(selectedDate).toArray();
                setWarmups(selectedWorkTasks);
            } catch (error) {
                console.log("Error fetching items for date" +selectedDate);
            }
        };
        fetchWarmups();
        console.log("date changed"+selectedDate);
    }, [selectedDate]);

    const handleWarmup = async (e) => {
        if (workout.current && workout.current.value.length === 0) {
            alert("Please provide details for warmup.");
            return;
        }
        const warmupTask = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workout.current.value,
            "status": false,
            "warmup": true
        };
        await db.warmupTasks.add({
            id: warmupTask.id,
            task: warmupTask.task,
            status: warmupTask.status,
            date: selectedDate,
            warmup: warmupTask.warmup
        });
        setWarmups([
            ...warmups,
            warmupTask
        ]);
        workout.current.value = "";
        e.preventDefault();
    };

    const handleWorkoutStatus = (id) => {
        setWarmups(warmups.map((task) => {
            if (task.id === id) {
                db.warmupTasks.update(id, {
                    status: !task.status
                });
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeleteWorkoutTask = async (id) => {
        await db.warmupTasks.delete(id);
        setWarmups(warmups.filter(task => task.id !== id));
    };

    const handleEditWorkoutTask = (editTask) => {
        setWarmups(warmups.map((task) => {
            if (task.id === editTask.id) {
                if (task.task !== editTask.task) {
                    db.warmupTasks.update(task.id, {
                        task: editTask.task
                    });
                    task.task=editTask.task;
                }
                return task;
            } else {
                return task;
            }
        }));
    }

    return (
        <div>
            <h2>Warmup</h2>
            <br />
            <div className="row">
                <div className="col-9">
                    <textarea
                        key="workout"
                        className="form-control w-100 textarea-height"
                        ref={workout}
                        placeholder="Add warmup tasks" 
                        id="warmupTextarea" />
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-lg" onClick={handleWarmup}>
                        <i>Before Workout</i>
                    </button>
                </div>
            </div>
            <br />
            <TaskList tasks={warmups} 
                    handleStatus={handleWorkoutStatus} 
                    handleDeleteTask={handleDeleteWorkoutTask} 
                    handleEditTask={handleEditWorkoutTask} />
        </div>
    )
}