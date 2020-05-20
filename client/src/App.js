import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//======================== 회원관련 페이지 및 기타 페이지 ========================
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterPage3 from './components/views/RegisterPage/RegisterPage3';
import Navigation from './components/views/Navigation/Navigation';
import Auth from '../src/hoc/auth';

//======================== 검색페이지 ========================
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';
import APISearch from './components/views/SearchPage/APISearch';
import APISearched from './components/views/SearchPage/APISearched';

//======================== 추천페이지 ========================
import RecommendPage from './components/views/RecommendPage/RecommendPage';

//======================== 공유관련 페이지 ========================
import CommunityPage from './components/views/CommunityPage/CommunityPage';
import TimeLinePage from './components/views/TimeLinePage/TimeLinePage';

//======================== Mypage 페이지 ========================
import Mypage from './components/views/Mypage/Mypage';


function App() {
  return (
    <Router>
      <div className="bigScreen">
        <div className="errorMassage">
          화면사이즈 줄여주세요
        </div>
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/register/3" component={Auth(RegisterPage3, false)} />

          {/* 검색관련페이지 */}
          <Route exact path="/search" component={Auth(SearchPage, null)} />
          <Route exact path="/search/results" component={Auth(SearchedPage, null)} />
          <Route exact path="/search/APISearch" component={Auth(APISearch,null)} />
          <Route exact path="/search/APISearch/APIresults" component={Auth(APISearched,null)} />

          {/* 추천관련 페이지 */}
          <Route exact path="/recommend" component={Auth(RecommendPage, null)} />

          {/* 커뮤니티 페이지 */}
          <Route exact path="/community" component={Auth(CommunityPage, true)} />

          {/* 타임라인 페이지 */}
          <Route exact path="/timeline" component={Auth(TimeLinePage, true)} />

          {/* 마이페이지 */}
          <Route exact path="/mypage" component={Auth(Mypage, true)} />

          {/* 잘못된 주소가 있을 시에 전부 홈화면으로 보내기 */}
          <Redirect from="*" to="/" />
        </Switch>
        <Navigation />
      </div>
    </Router>
  );
}


export default App;