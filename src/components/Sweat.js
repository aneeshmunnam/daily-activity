import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";
import { db } from "../common/db";

export default function Sweat({selectedDate}) {

    const workout = useRef('');
    const weight = useRef(0);
    const reps = useRef(0);
    const workoutType = useRef('');
    const rounds = useRef('');
    const time = useRef('');

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
        if ((workout.current && workout.current.value.length === 0) || 
                        (weight.current && weight.current.value.length === 0)) return;
        const sweatTask = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workout.current.value,
            "weight": weight.current.value.length === 0  ? ' ' : weight.current.value,
            "status": false,
            "reps": reps.current.value.length === 0 ? ' ' : reps.current.value,
            "sweatType": true
        };
        await db.sweatTasks.add({
            id: sweatTask.id,
            task: sweatTask.task,
            weight: sweatTask.weight,
            status: sweatTask.status,
            reps: sweatTask.reps,
            date: selectedDate
        });
        setSweats([
            ...sweats,
            sweatTask
        ]);
        workout.current.value = '';
        weight.current.value = '';
        reps.current.value = '';
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
                <div className="row mt-3">
                    <div className="col-6">
                        <select className="form-select"
                            aria-label="Default select example" ref={workoutType}>
                            <option value="Select">Select Workout Type</option>
                            <option value="AMRAP">AMRAP</option>
                            <option value="EMOM">EMOM</option>
                            <option value="E2MO2M">E2MO2M</option>
                            <option value="E3MO3M">E3MO3M</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <input type="text" 
                        placeholder="Rounds"
                        ref={rounds}
                        className="form-control"
                        key="rounds"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-5">
                        <input type="text"
                        key="workout"
                        className="form-control"
                        ref={workout}
                        placeholder="Workout" />
                    </div>
                    <div className="col-2">
                        <input type="text" 
                        key="weight"
                        ref={weight}
                        className="form-control"
                        placeholder="Lbs" />
                    </div>
                    <div className="col-2">
                        <input type="text" 
                        key="reps"
                        className="form-control"
                        placeholder="reps"
                        ref={reps}
                        />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleSweat}>
                            <i className="bi bi-plus-square-fill"></i>
                        </button>
                    </div>
                </div>
            <TaskList tasks={sweats} 
                    handleStatus={handleWorkoutStatus} 
                    handleDeleteTask={handleDeleteWorkoutTask} 
                    handleEditTask={handleEditWorkoutTask} />
            <div className="row">
                <div className="col-6">
                    <input type="text" 
                    ref={time}
                    key="time"
                    className="form-control"
                    placeholder="time"
                    />
                </div>
            </div>
        </div>
    );
}