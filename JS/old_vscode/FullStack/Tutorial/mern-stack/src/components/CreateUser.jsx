import { useState } from "react";
import axios from 'axios'



const CreateUser = ({ url, ...props }) => {

    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(url)
        console.log(username)
        axios.post(url + 'users/add', { username })
            .then(res => console.log(res.data))



        setUsername('')

    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>

    );
}

export default CreateUser;