import { useState } from 'react'


function TaskForm({ isAdding, handleAddTask, handleIsAdding, ...props }) {

    const currentDate = new Date();
    const [task, setTask] = useState({
        title: '',
        description: '',
        createdDate: {
            day: currentDate.getUTCDate(),
            month: currentDate.toLocaleString('default', { month: 'long' }),
            year: currentDate.getUTCFullYear(),
        },
        dueDate: {
            day: currentDate.getUTCDate(),
            month: currentDate.toLocaleString('default', { month: 'long' }),
            year: currentDate.getUTCFullYear(),
        },
        isFinished: false,
    })




    const days = getDays();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ]
    const years = getYears();

    const getClass = () => {
        let classes = 'bg-primary task-form ';
        classes += isAdding ? 'show' : '';
        return classes;
    }


    const handleTitleChange = ({ target: { value } }, type) => {
        const newTask = { ...task };
        const types = type.toLowerCase();
        if (types === 'title') newTask.title = value;
        else if (types === 'description') newTask.description = value

        setTask(newTask)
    }

    function getDays() {
        const output = [];
        for (let i = 1; i <= 31; i++) {
            output.push(i);
        }
        return output;
    }

    function getYears() {
        const output = [];
        const date = new Date();
        for (let i = date.getUTCFullYear(); i <= 2100; i++) {
            output.push(i);
        }
        return output;
    }

    const handleDayChange = ({ value }) => {
        const newTask = { ...task };
        newTask.dueDate.day = parseInt(value);
        setTask(newTask)
    }

    const handleMonthChange = ({ value }) => {
        const newTask = { ...task };
        newTask.dueDate.month = value;
        setTask(newTask)
    }

    const handleYearChange = ({ value }) => {
        const newTask = { ...task };
        newTask.dueDate.year = parseInt(value);
        setTask(newTask)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTask(task)
        handleIsAdding(false);
    }

    return (
        <div className={getClass()}>
            <form className=""
                onSubmit={handleSubmit}
            >
                <div className="input">
                    <label className="text-white">Task Title</label>
                    <input type="text" placeholder="Add Title...." value={task.title} required
                        onChange={(e) => handleTitleChange(e, 'title')}
                    />
                </div>
                <div className="input">
                    <label className="text-white">Task Description: </label>
                    <input type="text" placeholder="Add Description...." value={task.description} required
                        onChange={e => handleTitleChange(e, 'description')}
                    />
                </div>
                <div className="input">
                    <label className="text-white">Due by: </label>
                    <select name="day"
                        value={task.dueDate.day}
                        onChange={e => handleDayChange(e.target)}
                    >
                        <option value="">Day</option>
                        {
                            days.map((day, index) => {
                                return <option key={index}>{day}</option>
                            })
                        }
                    </select>
                    <select name="month"
                        value={task.dueDate.month}
                        onChange={e => handleMonthChange(e.target)}
                    >
                        <option >Month</option>
                        {
                            months.map((month, index) => {
                                return <option key={index}>{month}</option>
                            })
                        }
                    </select>
                    <select name="year"
                        value={task.dueDate.year}
                        onChange={e => handleYearChange(e.target)}
                    >
                        <option value="">Year</option>
                        {
                            years.map((year, index) => {
                                return <option key={index}>{year}</option>
                            })
                        }
                    </select>
                </div>
                <input type="submit" value="Add Task" className="btn btn-warning btn-lg btn-submit"

                />
            </form>
        </div>
    )
}








export default TaskForm;