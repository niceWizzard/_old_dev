import React, { useEffect, useState } from 'react';
import './App.css';
import './App.Queries.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { USERContext, WINDOWContext } from './components/Contexts'

import Home from './components/Main/Home';
import NotFound from './components/404_NotFound';
import SignIn from './components/SignIn';
import SavedBlogs from './components/Main/SavedBlogs';
import Navbar from './components/Navbar/Navbar';
import Subscriptions from './components/Main/Subscriptions';

interface Props {

}


const App: React.FC<Props> = () => {

  const [wSize, setwSize] = useState<number>(window.innerWidth)

  const user = {
    username: "RIchard",
    email: "richard@email",
    bookmark: ['1']
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setwSize(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => setwSize(window.innerWidth))
    }
  }, [])


  return (
    <div className="App">

      <WINDOWContext.Provider value={wSize} >
        <USERContext.Provider value={null} >
          <Router>
            <Navbar windowSize={wSize} />
            <Switch>

              <Route path="/" exact>
                <Home />
              </Route>


              <Route path="/blogs/subscriptions" component={Subscriptions} />

              <Route path="/blogs/saveds" exact >
                <SavedBlogs />
              </Route>

              <Route path="/sign-in" exact component={SignIn} />


              <Route path="*">
                <NotFound />
              </Route>
            </Switch >
          </Router>
        </USERContext.Provider>
      </WINDOWContext.Provider>
    </div>
  );
}

export default App;
