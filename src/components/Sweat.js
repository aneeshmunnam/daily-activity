import { useEffect, useRef, useState } from "react";
import TaskList from "../common/TaskList";

export default function Sweat({selectedDate}) {

    const workout = useRef('');
    const weight = useRef('');

    const [sweats, setSweats] = useState([]);

    useEffect(() => {
        setSweats([]);
    }, [selectedDate]);

    const handleSweat = (e) => {
        if ((workout.current && workout.current.length === 0) || 
                        (weight.current && weight.current.length === 0)) return;
        const sweatTask = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workout.current.value,
            "weight": weight.current.value,
            "status": false
        };
        setSweats([
            ...sweats,
            sweatTask
        ]);
        workout.current.value = '';
        weight.current.value = '';
        console.log(sweats);
        e.preventDefault();
    };

    const handleWorkoutStatus = (id) => {
        setSweats(sweats.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeleteWorkoutTask = (id) => {
        setSweats(sweats.filter(task => task.id !== id));
    }

    const handleEditWorkoutTask = (editTask) => {
        setSweats(sweats.map((task) => {
            if (task.id === editTask.id) {
                task.task=editTask.task;
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
            <TaskList tasks={sweats} 
                    handleStatus={handleWorkoutStatus} 
                    handleDeleteTask={handleDeleteWorkoutTask} 
                    handleEditTask={handleEditWorkoutTask} />
        </div>
    );
}