import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

function App() {
  const url = 'https://rich-node-api.herokuapp.com/'

  return (
    <Router >
      <NavBar />
      <div className="container">
        <Route path="/" exact >
          <ExercisesList url={url} />
        </Route>
        <Route path="/edit/:id" >
          <EditExercise url={url} />
        </Route>
        <Route path="/create" >
          <CreateExercise url={url} />
        </Route>
        <Route path="/user">
          <CreateUser
            url={url}
          />
        </Route>
      </div>
    </Router>
  );
}

export default App;
