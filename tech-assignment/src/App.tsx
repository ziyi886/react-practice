import React from 'react';
import { Login } from './views/Login';
import { Search } from './views/Search';
import { Artists } from './views/Artists';
import { Albums } from './views/Albums';
import { Callback } from './views/Callback';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components';

const MainHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #969696;
  background-color: #d7d7d7;
  height: 60px;
  font-size: 25px;
  box-sizing: border-box;
  padding: 10px;
`;

function App() {
  return (
    <>
      <MainHeader>Spotify Artist Search</MainHeader>
      <Router>
        <div>
          <Route path="/" exact component={Search} />
          <Route path="/log-in" exact component={Login} />
          <Route path="/artists/:name/:curPage" exact component={Artists} />
          <Route path="/albums/:name/:artistId" exact component={Albums} />
          <Route path="/callback" exact component={Callback} />
        </div> 

      </Router>
    </>
  );
}

export default App;