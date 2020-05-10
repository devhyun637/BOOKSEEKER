import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//======================== 페이지 가져오기 ========================
import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterPage3 from './components/views/RegisterPage/RegisterPage3';
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';
import Footer from './components/views/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/register3" component={RegisterPage3}/>
          <Route exact path="/search" component={SearchPage}/>
          <Route exact path="/searched" component={SearchedPage}/>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
