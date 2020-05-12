import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//======================== 페이지 가져오기 ========================
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterPage3 from './components/views/RegisterPage/RegisterPage3';
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';
import Navigation from './components/views/Navigation/Navigation';
import Auth from '../src/hoc/auth';
import RecommendPage from './components/views/RecommendPage/RecommendPage';
import CommunityPage from './components/views/CommunityPage/CommunityPage';
import TimeLinePage from './components/views/TimeLinePage/TimeLinePage';

function App() {
  return (
    <Router>
      <div className="bigScreen">
        <div className="errorMassage">
          화면사이즈 줄여주세요
        </div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />

          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/register/3" component={RegisterPage3} />

          {/* 검색관련페이지 */}
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/search/results" component={SearchedPage} />

          {/* 추천관련 페이지 */}
          <Route exact path="/recommend" component={RecommendPage} />

          {/* 커뮤니티 페이지 */}
          <Route exact path="/community" component={CommunityPage} />

          {/* 타임라인 페이지 */}
          <Route exact path="/timeline" component={TimeLinePage} />

          {/* 잘못된 주소가 있을 시에 전부 홈화면으로 보내기 */}
          <Redirect from="*" to="/" />
        </Switch>

        <Navigation />
      </div>
    </Router>
  );
}


export default App;
