import Task from './Task'

function Tasks({ tasks, isLoading, ...props }) {
    const { handleTasksUpdate, handleRemoveTask } = props;



    return (
        <div className="tasks-container">
            {
                tasks.map((task) => {
                    return <Task task={task} key={task.id} id={task.id}
                        finishTask={handleTasksUpdate}
                        removeTask={handleRemoveTask}
                    />
                })
            }
            {
                tasks.length <= 0 && !isLoading && <h1>No tasks available....</h1>
            }
        </div>
    );

}



export default Tasks;
