import React from 'react';
import { Login } from './views/Login';
import { Search } from './views/Search';
import { Artists } from './views/Artists';
import { ArtistDetails } from './views/ArtistDetails';
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Search} />
        <Route path="/log-in" exact component={Login} />
        <Route path="/artists" exact component={Artists} />
        <Route path="/artists/:artistId" exact component={ArtistDetails} />
      </div> 

    </Router>
    
  );
}

export default App;