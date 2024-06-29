import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";
import { db } from "../common/db";

export default function Sweat({selectedDate}) {

    const workout = useRef('');
    const weight = useRef('');

    const [sweats, setSweats] = useState([]);

    useEffect(() => {
        const fetchSweats = async () => {
            try {
                const selectedWorkTasks = await db.sweatTasks.where("date").equals(selectedDate).toArray();
                setSweats(selectedWorkTasks);
            } catch (error) {
                console.log("Error fetching items for date" +selectedDate);
            }
        };
        fetchSweats();
    }, [selectedDate]);

    const handleSweat = async (e) => {
        console.log(workout.current.length);
        if ((workout.current && workout.current.length === undefined) || 
                        (weight.current && weight.current.length === undefined)) return;
        const sweatTask = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workout.current.value,
            "weight": weight.current.value,
            "status": false,
            "sweatType": true
        };
        await db.sweatTasks.add({
            id: sweatTask.id,
            task: sweatTask.task,
            weight: sweatTask.weight,
            status: sweatTask.status,
            date: selectedDate
        });
        setSweats([
            ...sweats,
            sweatTask
        ]);
        workout.current.value = '';
        weight.current.value = '';
        e.preventDefault();
    };

    const handleWorkoutStatus = (id) => {
        setSweats(sweats.map((task) => {
            if (task.id === id) {
                db.sweatTasks.update(id, {
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
        await db.sweatTasks.delete(id);
        setSweats(sweats.filter(task => task.id !== id));
    }

    const handleEditWorkoutTask = (editTask) => {
        setSweats(sweats.map((task) => {
            if (task.id === editTask.id) {
                if (task.task !== editTask.task) {
                    db.sweatTasks.update(task.id, {
                        task: editTask.task
                    });
                    task.task=editTask.task;
                }
                if (task.weight !== editTask.weight) {
                    db.sweatTasks.update(task.id, {
                        weight: editTask.weight
                    });
                    task.weight = editTask.weight;
                }
                return task;
            } else {
                return task;
            }
        }));
    }

    return (
        <div className="sweat">
            <h2>Sweaty</h2>
            <div className="row">
                <div className="col">
                    <input type="text"
                    className="form-control"
                    ref={workout}
                    placeholder="Workout" />
                </div>
                <div className="col">
                    <input type="text" 
                    ref={weight}
                    className="form-control"
                    placeholder="Weight" />
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSweat}>Add Workout</button>
                </div>
            </div>
            <br />
            <TaskList tasks={sweats} 
                    handleStatus={handleWorkoutStatus} 
                    handleDeleteTask={handleDeleteWorkoutTask} 
                    handleEditTask={handleEditWorkoutTask} />
        </div>
    );
}