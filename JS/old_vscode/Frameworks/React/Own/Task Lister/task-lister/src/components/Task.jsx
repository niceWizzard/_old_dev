// import { useState } from "react";




function Task({ task, ...props }) {

    const { title, description, createdDate, dueDate, isFinished } = task;

    const getClassName = () => {
        let classes = 'task';
        classes += isFinished ? ' finished' : '';
        return classes;
    }

    const handleTaskClick = () => {
        props.finishTask(props.id);
    }

    const handleRemoveTask = (e) => {
        e.stopPropagation()
        props.removeTask(props.id)
    }


    return (

        <div className={getClassName()}
            onClick={handleTaskClick}
        >
            <div className="task-text">
                <h1 className="task-title">{title}</h1>
                <p className="task-description">{description}</p>
                <div className="date">
                    <div className="due-date">
                        <span className="font-weight-bold"> Due by: </span>
                        <span className="day">{dueDate.day}</span>
                        <span className="month">{dueDate.month}</span>
                        <span className="year">{dueDate.year}</span>
                    </div>
                    <div className="created-date">
                        <span className="font-weight-bold">Created at: </span>
                        <span className="day">{createdDate.day}</span>
                        <span className="month">{createdDate.month}</span>
                        <span className="year">{createdDate.year}</span>
                    </div>
                </div>
            </div>
            <button className="btn-remove"
                onClick={handleRemoveTask}
            >x</button>

        </div>
    );


}






export default Task;