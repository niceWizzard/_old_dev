import axios from "axios"
import { useEffect, useState } from "react"
import DatePicker from "react-date-picker"
import { Link, useParams } from "react-router-dom"



const EditExercise = ({ url, match, ...props }) => {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isEdited, setIsEdited] = useState({
        description: false,
        duration: false
    })

    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    const fetchDatas = async (url) => {
        const res = await fetch(url);
        const data = res.json();
        return data;

    }

    useEffect(async () => {

        const data = await fetchDatas(url + 'exercises/' + id);

        const gotUsers = await fetchDatas(url + 'users/');


        const newExercise = {
            username: data.username,
            description: data.description,
            duration: data.duration,
            date: new Date(data.date),
            _id: data._id,
            users: gotUsers
        }

        setExercise(newExercise)
        setIsLoading(false)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(url + 'exercises/update/' + id, exercise)
            .then(res => console.log(res.data))

        window.location = '/';
    }

    const handleInputClicked = (e) => {
        if (!isEdited.duration || !isEdited.description) {


            const description = /description/i;
            const duration = /duration/i
            if (description.test(e.target.previousElementSibling.innerText) && !isEdited.description) {
                e.target.select();
            }
            else if (isEdited.duration && duration.test(e.target.previousElementSibling.innerText)) {
                console.log('DURAtITON')
                e.target.select()
            }
        }
    }



    return (
        <div>
            <h3>Edit Exercise Log</h3>
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={e => setExercise({ ...exercise, username: e.target.value })}>
                        {
                            exercise.users.map((user, index) => {
                                return <option
                                    key={index}
                                    value={user.username}>{user.username}
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
                        onClick={handleInputClicked}
                        onChange={e => {
                            setExercise({ ...exercise, description: e.target.value })
                            setIsEdited({ ...isEdited, description: true })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onClick={handleInputClicked}
                        onChange={e => {
                            setExercise({ ...exercise, duration: e.target.value })
                            setIsEdited({ ...isEdited, duration: true })

                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            value={exercise.date}
                            onChange={date => setExercise({ ...exercise, date })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Save Changes" className="btn btn-primary" />
                    <Link to="/" className="btn btn-danger ml-4">Cancel</Link>
                </div>
            </form>}
        </div>




    );
}

export default EditExercise;