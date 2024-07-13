import { useEffect, useRef, useState } from "react"
import TaskList from "../common/TaskList";

export default function Warmup({selectedDate}) {

    const noOfRounds = useRef(0);
    const workout = useRef('');
    const weight = useRef('');

    const [warmups, setWarmups] = useState([]);

    useEffect(() => {
        // const fetchSweats = async () => {
        //     try {
        //         const selectedWorkTasks = await db.sweatTasks.where("date").equals(selectedDate).toArray();
        //         setSweats(selectedWorkTasks);
        //     } catch (error) {
        //         console.log("Error fetching items for date" +selectedDate);
        //     }
        // };
        // fetchSweats();
        console.log("date changed"+selectedDate);
    }, [selectedDate]);

    const handleWarmup = (e) => {
        if (workout.current && workout.current.length === 0) return;
        const warmupTask = {
            "id": Math.floor(Math.random() * 100000) + 1,
            "task": workout.current.value,
            "weight": weight.current.value.length === 0  ? ' ' : weight.current.value,
            "status": false
        };
        setWarmups([
            ...warmups,
            warmupTask
        ]);
        workout.current.value = "";
        weight.current.value = "";
        console.log(warmups);
        e.preventDefault();
    };

    const handleWorkoutStatus = (id) => {
        setWarmups(warmups.map((task) => {
            if (task.id === id) {
                // db.sweatTasks.update(id, {
                //     status: !task.status
                // });
                task.status = !task.status;
                return task;
            } else {
                return task;
            }
        }));
    }

    const handleDeleteWorkoutTask = (id) => {
        // await db.sweatTasks.delete(id);
        setWarmups(warmups.filter(task => task.id !== id));
    }

    const handleEditWorkoutTask = (editTask) => {
        setWarmups(warmups.map((task) => {
            if (task.id === editTask.id) {
                if (task.task !== editTask.task) {
                    // db.sweatTasks.update(task.id, {
                    //     task: editTask.task
                    // });
                    task.task=editTask.task;
                }
                if (task.weight !== editTask.weight) {
                    // db.sweatTasks.update(task.id, {
                    //     weight: editTask.weight
                    // });
                    task.weight = editTask.weight;
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
            <div className="row">
                <div className="col-9">
                    <input type="text"
                    key="numberofRounds" 
                    className="form-control"
                    ref={noOfRounds}
                    placeholder="No of Rounds"
                    />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-5">
                    <input type="text"
                    key="workout"
                    className="form-control"
                    ref={workout}
                    placeholder="Workout" />
                </div>
                <div className="col-4">
                    <input type="text" 
                    key="weight"
                    ref={weight}
                    className="form-control"
                    placeholder="Lbs/Reps - Optional" />
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleWarmup}>
                        <i className="bi bi-plus-square-fill"></i>
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