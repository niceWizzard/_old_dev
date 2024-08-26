import './css/App.css';
import Register from './Components/register';
import { Switch, BrowserRouter as Router, Route, } from 'react-router-dom'
import Login from './Components/login';
import { SETUSERContext, USERContext } from './contexts';
import { useState } from 'react';
import { User } from './types';
import CreateList from './Components/Main/CreateList';
import Homepage from './Components/Main/Home/Homepage';
import UpdateList from './Components/Main/UpdateList';
import Dashboard from './Components/Main/Dashboard';
import NotFound from './Components/NotFound';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [USER, setUSER] = useState<User | any>(null)
  return (
    <div className={`App theme-${window.localStorage.getItem('theme') || 'pink'}`}>
      <USERContext.Provider value={USER}>
        <SETUSERContext.Provider value={setUSER}>
          <HelmetProvider>
            <Router>
              <Switch>
                <Route path="/" component={Homepage} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/login" exact>
                  <Login setUSER={setUSER} />
                </Route>
                <Route path="/lists/create" component={CreateList} exact />
                <Route path="/lists/edit/:id" component={UpdateList} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </HelmetProvider>
        </SETUSERContext.Provider>
      </USERContext.Provider>
    </div>
  );
}

export default App;
