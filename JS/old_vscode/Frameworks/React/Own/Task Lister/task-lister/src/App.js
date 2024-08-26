import React, { useState, useEffect } from 'react';
import NavBar from './components/Nav';
import Tasks from './components/Tasks'
import TaskForm from './components/TaskForm'
import SortButton from './components/SortButton'


function App() {


  const [tasks, setTasks] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(undefined);


  const [isAdding, setIsAdding] = useState(false);

  const [isOnline, setIsOnline] = useState(true);

  const [permanentTasks, setPermanentTasks] = useState([]);




  const resourceUrl = 'http://localhost:8000/tasksList';
  const getTasksList = async () => {
    const res = await fetch(resourceUrl)
    if (res.status !== 200 || !res.ok) {
      throw new Error('Something unexpected has happened. Please refresh the page...')
    }

    const data = await res.json();

    return data;
  }

  useEffect(() => {
    getTasksList()
      .then((res) => {
        const lTasks = Storage.getObject('tasks')
        Storage.getObject('isChanged') ? setTasks(lTasks) : setTasks(res)
        setIsLoading(false);
        setError(null)
        Storage.getItemFromLS('isChanged') ? setPermanentTasks(Storage.getItemFromLS('tasks')) : setPermanentTasks(res)
        // debugger;
        isOnline && addNewTasksOnline(Storage.getObject('toAddOnline'));
        isOnline && Storage.setItemToLS('isChanged', false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsOnline(false);
        setError(err.message)
        setTasks(Storage.getItemFromLS('tasks'))
      })
  }, []);


  const fetchTask = async (id) => {
    const res = await fetch(`${resourceUrl}/${id}`)
    const data = await res.json();
    return data;
  }

  const handleTasksUpdate = (id) => {
    handleTasksFetchUpdate(id)
    const newTasks = tasks.map(task => {
      return task.id === id ? { ...task, isFinished: !task.isFinished } : task
    })

    const newPermanentTasks = permanentTasks.map(task => {
      return task.id === id ? { ...task, isFinished: !task.isFinished } : task
    });



    isOnline === false && Storage.setItemToLS('isChanged', true);
    setTasks(newTasks);
    setPermanentTasks(newPermanentTasks)
    Storage.setTasksToLS(newTasks)

  }

  const handleTasksFetchUpdate = async (id) => {
    const taskToFinish = await fetchTask(id);
    const finishedTask = { ...taskToFinish, isFinished: !taskToFinish.isFinished }

    fetch(`${resourceUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(finishedTask)
    })
  }

  const handleRemoveTask = (id) => {
    fetch(`${resourceUrl}/${id}`, {
      method: 'DELETE',
    })

    const newTasks = tasks.filter((task, index) => {
      return task.id !== id
    })

    const newPermnanentTasks = permanentTasks.filter((task, index) => {
      return task.id !== id
    })

    setTasks(newTasks)
    setPermanentTasks(newPermnanentTasks)
    Storage.setTasksToLS(newTasks)
    isOnline === false && Storage.setItemToLS('isChanged', true);

  }

  const handleUpdateTaskForm = () => {
    setIsAdding(!isAdding)
  }


  const handleAddTask = (task) => {
    isOnline ? handleAddOnlineTask(task) : handleAddOfflineTask(task)
  }

  const handleAddOnlineTask = async (task) => {
    console.log('Online Add!')
    task.id = null;
    const res = await fetch(resourceUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json()
    const newTasks = [...tasks, data]
    setPermanentTasks([...permanentTasks, data])
    setTasks(newTasks);
    Storage.setTasksToLS(newTasks);
  }

  const handleAddOfflineTask = (task) => {
    task.id = Math.floor(Math.random() * 1000000)

    const newTasks = [...tasks, task];
    setPermanentTasks([...permanentTasks, task])
    setTasks(newTasks);
    Storage.setTasksToLS(newTasks);
    Storage.setItemToLS('isChanged', true);
    Storage.addNewItemOffine(task)

  }

  const handleIsAdding = (state) => {
    setIsAdding(state);
  }

  const addNewTasksOnline = (_tasks) => {
    if (_tasks !== null) {
      _tasks.forEach(_task => {
        handleAddOnlineTask(_task)
      })
      Storage.setItemToLS('toAddOnline', null)
    }

  }

  const handleSortChange = ({ value }) => {
    value.toLowerCase() === 'sort by' && handleDefaultSort();
    value.toLowerCase() === 'finished' && handleFinishedSort();
    value.toLowerCase() === 'due date' && handleSortDueDate();
    value.toLowerCase() === 'created date' && handleSortCreatedDate();
  }

  const handleDefaultSort = () => {
    setTasks(permanentTasks)
  }

  const handleFinishedSort = () => {
    const finishedTasks = tasks.filter(task => task.isFinished === true)
    const newTasks = [...finishedTasks];

    if (finishedTasks.length > 0) {

      setTasks(newTasks);
    }
    else {
      Storage.setTasksToLS(permanentTasks)
      setTasks([])
    }
  }



  const handleSortCreatedDate = () => {
    const newTasks = [...permanentTasks]
    const sortedArray = newTasks.sort((a, b) => {
      const { day: aDay, month: aMonth, year: aYear } = a.createdDate;
      const { day: bDay, month: bMonth, year: bYear } = b.createdDate;
      const bDate = new Date(`${bMonth}/${bDay}/${bYear}`);
      const aDate = new Date(`${aMonth}/${aDay}/${aYear}`);
      return aDate - bDate;
    })

    setTasks(sortedArray);
  }

  const handleSortDueDate = () => {
    const newTasks = [...permanentTasks]
    const sortedArray = newTasks.sort((a, b) => {
      const { day: aDay, month: aMonth, year: aYear } = a.dueDate
      const { day: bDay, month: bMonth, year: bYear } = b.dueDate
      const bDate = new Date(`${bMonth}/${bDay}/${bYear}`);
      const aDate = new Date(`${aMonth}/${aDay}/${aYear}`);
      return aDate - bDate;
    })
    setTasks(sortedArray);
  }

  class Storage {
    static getItemFromLS(item) {
      setTimeout(() => {
        setError(undefined)
      }, 5000)
      const output = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : [];
      return output;
    }

    static getObject(objectName) {
      const output = localStorage.getItem(objectName) !== null ? JSON.parse(localStorage.getItem(objectName)) : [];
      return output
    }


    static addTasksToLSFromCurrent(_tasks) {
      const newTasks = [...(_tasks)];

      localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    static setTasksToLS(_tasks) {
      localStorage.setItem('tasks', ...[JSON.stringify(_tasks)])
    }

    static setIsOfflineChanged(state) {
      localStorage.setItem('isChanged', state)
    }

    static setItemToLS(itemName, item) {
      localStorage.setItem(itemName, item);
    }

    static addNewItemOffine(task) {
      console.log('Offline Add!')
      const items = Storage.getObject('toAddOnline') !== null ? Storage.getObject('toAddOnline') : [];

      const newTasks = JSON.stringify([...items, task])
      localStorage.setItem('toAddOnline', newTasks)
    }

  }









  return (
    <>
      <NavBar updateIsAdding={handleUpdateTaskForm} isAdding={isAdding} />
      <div className="body">
        {isAdding && <TaskForm
          isAdding={isAdding}
          handleAddTask={handleAddTask}
          handleIsAdding={handleIsAdding}
        />}
        {error && <div className="m-4 p-5 bg-danger"> <h1>{error}.</h1> </div>}
        {isLoading && <h1 className="loading m-4 text-secondary" >Getting Tasks.....</h1>}
        <div className="main-body">
          {tasks.length > 0 && <SortButton
            handleSortChange={handleSortChange}
          />}
          {tasks && <Tasks tasks={tasks} handleRemoveTask={handleRemoveTask} handleTasksUpdate={handleTasksUpdate}
            isLoading={isLoading}
          />}
        </div>

      </div>
    </>

  );
}

export default App;
