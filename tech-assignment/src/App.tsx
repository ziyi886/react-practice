import React from 'react';
import { Login } from './views/Login';
import { Search } from './views/Search';
import { Artists } from './views/Artists';
import { Albums } from './views/Albums';
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Search} />
        <Route path="/log-in" exact component={Login} />
        <Route path="/artists/:name" exact component={Artists} />
        <Route path="/albumns/:name/:artistId" exact component={Albums} />
      </div> 

    </Router>
    
  );
}

export default App;