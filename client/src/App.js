import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//======================== 페이지 가져오기 ========================
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterPage3 from './components/views/RegisterPage/RegisterPage3';
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';
import Navigation from './components/views/Navigation/Navigation';
import RecommendPage from './components/views/RecommendPage/RecommendPage';

function App() {
  return (
    <Router>
      <div className="bigScreen">
        <div className="errorMassage">
          화면사이즈 줄여주세요
        </div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/register3" component={RegisterPage3} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/searched" component={SearchedPage} />
          <Route exact path="/recommend" component={RecommendPage} />
        </Switch>

        <Navigation />
      </div>
    </Router>
  );
}


export default App;
