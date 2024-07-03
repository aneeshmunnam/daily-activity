import { useState } from "react";

export default function TaskList({tasks, handleStatus, handleDeleteTask, handleEditTask}) {
    return (
        <div>
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
    let editTask;
    if (editing) {
        editTask = (
            <>
                {task.warmup ? 
                    <div className="col-auto" key={`warmup-${index+1}`}>
                        <b>W</b>
                    </div> : 
                    <div className="col-auto" key={`warmup-${index+1}`}>
                        <b>G</b>
                    </div>
                }
                <div className="col-auto" key={index}>
                    <input key={index+1} 
                    className="form-control"
                    value={task.task} 
                    onChange={(e) => {
                        onEdit({
                            ...task,
                            task: e.target.value
                        })
                    }} />
                </div>
                {task.sweatType ? <div className="col-auto" key={index}>
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
                        onClick={() => setEditing(false)}>
                        <i className="bi bi-save"></i>
                    </button>
                </div>
            </>
        )
    } else {
        editTask = (
            <>
                {task.warmup ? 
                    <div className="col-auto" key={`warmup-${index+1}`}>
                        <b>W</b>
                    </div> : 
                    <div className="col-auto" key={`warmup-${index+1}`}>
                        <b>G</b>
                    </div>
                }
                <div className="col-3" key={index}>
                    <label key={index}>{task.task}</label>
                </div>
                {task.weight ? <div className="col-3" key={`weight-${index+1}`}>
                        <label key={index}>{task.weight}</label>
                </div> : ''}
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
            </>
        );
    }
        return (
            <>
                {editTask}
                <div className="col-auto">
                            <button className="btn btn-danger" key={index+1} name={task.id} onClick={() => onDelete(task.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                </div>
            </>
        );
    }