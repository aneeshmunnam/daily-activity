import { useRef } from "react";
import { useState } from "react";

export default function TaskList({tasks, handleStatus, handleDeleteTask, handleEditTask}) {
    return (
        <div className="mt-3">
            {tasks.map((task, index) => (
                <div className="row mb-4" key={index}>
                    <Task task={task} onEdit={handleEditTask} onHandle={handleStatus} 
                                    index={index} onDelete={handleDeleteTask} />
                </div>
            ))}
        </div>
    );
};

function Task({task, onEdit, onHandle, index, onDelete}) {
    const [editing, setEditing] = useState(false);
    let editTask = null;
    const editTaskValue = useRef('');
    console.log(editTaskValue);
    const editTaskWarmup = () => {
        onEdit({
            ...task,
            task: editTaskValue.current.value
        });
        setEditing(false);
    };

    const cancel = () => {
        editTaskValue.current.value = task.task;
        setEditing(false);
    };

    if (editing) {
        editTask = (
            <>
                {task.warmup ? 
                <div className="col-8" key={`task-${index+1}`}>
                    <textarea key={index+1} 
                    className="form-control w-100 textarea-height"
                    ref={editTaskValue} defaultValue={task.task} />
                </div>
                :
                <div className="col-auto" key={`task-${index+1}`}>
                    <input key={index+1} 
                    className="form-control"
                    ref={editTaskValue} defaultValue={task.task} />
                </div>}
                {task.sweatType ? <div className="col-auto" key={`weight-${index+1}`}>
                    <input key={`weight-${index+1}`}
                    className="form-control"
                    value={task.weight} 
                    onChange={(e) => {
                        onEdit({
                            ...task,
                            weight: e.target.value
                        })
                    }} />
                </div> : ''}
                <div className="col-auto" key={`status-${index + 1}`}>
                    <div className="form-check form-switch">
                        <input key={`status-${index + 1}`} className="form-check-input"
                            type="checkbox" name={task.id}
                            value={task.status}
                            onChange={() => onHandle(task.id)} />
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn btn-secondary" key={index + 1} name={task.id}
                        onClick={editTaskWarmup}>
                        <i className="bi bi-save"></i>
                    </button>
                </div>
                <div className="col-auto">
                <button className="btn btn-secondary" key={index + 1} name={task.id}
                        onClick={cancel}>
                        <i class="bi bi-twitter-x"></i>
                    </button>
                </div>
            </>
        )
    } else {
        editTask = (
            <>
                <div className="row">
                    <div className="col-6" key={`task-${index + 1}`}>
                        <label key={index} className="heading-size">
                            <pre>
                                {task.task}
                            </pre>
                        </label>
                    </div>
                    <div className="col-auto" key={`status-${index + 1}`}>
                        <div className="form-check form-switch">
                            <input key={`status-${index + 1}`} className="form-check-input"
                                type="checkbox" id="flexSwitchCheckDefault" name={task.id}
                                value={task.status}
                                onChange={() => onHandle(task.id)} />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-secondary" key={index + 1} name={task.id}
                            onClick={() => setEditing(true)}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </div>
                    <div className="col-auto">
                            <button className="btn btn-danger" key={index+1} name={task.id} onClick={() => onDelete(task.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                    </div>
                </div>
                {task.weight ? <div className="col-6" key={`weight-${index+1}`}>
                            <div className="weight-reps-footer">
                                <label>Weight:{task.weight}</label>
                                <label>&nbsp; Reps: {task.reps}</label>
                            </div>
                    </div> : ''}
            </>
        );
    }
        return (
            <>
                {editTask}
            </>
        );
    }