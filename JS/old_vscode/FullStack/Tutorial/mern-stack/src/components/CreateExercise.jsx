import { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import axios from 'axios'


const CreateExercise = ({ url, ...props }) => {

    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: '',
        date: new Date(),
        users: []
    })


    useEffect(() => {
        axios.get(url + 'users/')
            .then(({ data, res }) => {
                if (data.length > 0) {
                    setExercise({ ...exercise, users: data.map(user => user.username), username: data[0].username })
                } else {
                    setExercise({ ...exercise, users: ['No users available...'] })
                }
            })


    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log({ ...exercise })
        axios.post(url + 'exercises/add/', { ...exercise })
            .then(res => console.log(res.data))


        window.location = '/';
    }

    const handleDateChange = (date) => {
        setExercise({ ...exercise, date })
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={e => setExercise({ ...exercise, username: e.target.value })}
                    >
                        {
                            exercise.users.map((user) => {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={exercise.description}
                        onChange={e => setExercise({ ...exercise, description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onChange={e => setExercise({ ...exercise, duration: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            value={exercise.date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>


    );
}

export default CreateExercise;