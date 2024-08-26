import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';



const ExercisesList = ({ url, ...props }) => {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const Exercise = ({ exercise, ...props }) => {
        const { username, description, duration, date, _id } = exercise;

        return (
            <tr>
                <td>{username}</td>
                <td>{description}</td>
                <td>{duration}</td>
                <td>{date.substring(0, 10)}</td>
                <td>
                    <Link className="btn btn-secondary" to={"/edit/" + _id}>Edit</Link> | <a className="btn btn-danger" href="#" onClick={() => { props.deleteExercise(_id) }}>Delete</a>
                </td>
            </tr >


        )
    }

    const SmallExercise = ({ exercise, ...props }) => {
        const { username, description, duration, date, _id } = exercise;

        return (
            <tr className="small-table">
                <tr>
                    <th>Username</th>
                    <td>{username}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{description}</td>
                </tr>
                <tr>
                    <th>Duration</th>
                    <td>{duration}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{date.substring(0, 10)}</td>
                </tr>
                <tr>
                    <td>
                        <Link className="btn btn-secondary" to={"/edit/" + _id}>Edit</Link> | <a className="btn btn-danger" href="#" onClick={() => { props.deleteExercise(_id) }}>Delete</a>
                    </td>
                </tr>
            </tr>
        )
    }


    useEffect(() => {
        axios.get(url + 'exercises/')
            .then(async ({ data, ...res }) => {
                setExercises(data);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        console.log(screenWidth > 600)
    }, [])

    const deleteExercise = (id) => {
        axios.delete(url + 'exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log('ERRROR' + err));
        setExercises(exercises.filter(ex => ex._id !== id))

    }

    const getExerciseList = () => {
        return exercises.map((exc, index) => {
            if (screenWidth > 600) {
                return <Exercise exercise={exc} deleteExercise={deleteExercise} key={index} />
            }
            return <SmallExercise exercise={exc} deleteExercise={deleteExercise} key={index} />
        })
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getExerciseList()}
                </tbody>
            </table>
            {isLoading && <h1>Loading...</h1>}

        </div>
    );
}

export default ExercisesList;