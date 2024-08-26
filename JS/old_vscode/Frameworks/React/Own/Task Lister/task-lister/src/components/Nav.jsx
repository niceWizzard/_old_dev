import React from 'react';



function NavBar({ updateIsAdding, isAdding, ...props }) {



    const handleAddTask = () => {
        updateIsAdding();
    }
    return (
        <nav className="nav-bar bg-primary">
            <h1 className="navbrand text-xl-left text-uppercase font-weight-bold">Task Lister</h1>
            <button className="btn btn-lg btn-secondary btn-add-task"
                onClick={handleAddTask}
            > {isAdding ? 'Close' : 'Add Task'}</button>
        </nav>
    );
}



export default NavBar;
