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
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/register3" component={RegisterPage3} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/searched" component={SearchedPage} />
        </Switch>

        <Navigation />
      </div>
    </Router>
  );
}


export default App;
