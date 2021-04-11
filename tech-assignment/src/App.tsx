import React from 'react';
import { Login } from './views/Login';
import { Search } from './views/Search';
import { Artists } from './views/Artists';
import { Albums } from './views/Albums';
import { Callback } from './views/Callback';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Search} />
        <Route path="/log-in" exact component={Login} />
        <Route path="/artists/:name" exact component={Artists} />
        <Route path="/albums/:name/:artistId" exact component={Albums} />
        <Route path="/callback" exact component={Callback} />
      </div> 

    </Router>
    
  );
}

export default App;