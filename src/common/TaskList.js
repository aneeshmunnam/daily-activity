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
    let editTask = null;
    if (editing) {
        editTask = (
            <>
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
                <div className="col-auto">
                            <button className="btn btn-danger" key={index+1} name={task.id} onClick={() => onDelete(task.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                </div>
            </>
        )
    } else {
        editTask = (
            <>
                <div className="row">
                    <div className="col-6" key={index}>
                        <label key={index} className="heading-size">
                            <b>
                                {task.task}
                            </b>
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