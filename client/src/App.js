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
import RegisterPage4 from './components/views/RegisterPage/RegisterPage4';
import RegisterPage5 from './components/views/RegisterPage/RegisterPage5';
import Navigation from './components/views/Navigation/Navigation';
import Auth from '../src/hoc/auth';

//======================== 검색페이지 ========================
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';

//======================== 추천페이지 ========================
import RecommendPage from './components/views/RecommendPage/RecommendPage';
import RecommendPage2 from './components/views/RecommendPage/RecommendPage2';

//======================== 상세페이지 ========================
import VideoDatailPage from './components/views/VideoDetailPage/VideoDatailPage'

//======================== 공유관련 페이지 ========================
import CommunityPage from './components/views/CommunityPage/CommunityPage';
import CommunityCommentsPage from './components/views/CommunityPage/Sections/CommentsPage';
import TimeLinePage from './components/views/TimeLinePage/TimeLinePage';
import TimeLineCommentsPage from './components/views/TimeLinePage/Sections/CommentsPage';
import SharePostPage from './components/views/SharePostPage/SharePostPage';
import UploadBooktrailersPage from './components/views/Mypage/UploadBooktrailersPage';

//======================== Mypage 페이지 ========================
import Mypage from './components/views/Mypage/Mypage';
import Likepage from './components/views/Mypage/Likepage';
import VideoUploadPage from './components/views/Mypage/VideoUploadPage/VideoUploadPage';
import VideoUploadPage2 from './components/views/Mypage/VideoUploadPage/VideoUploadPage2';
import VideoUploadPage3 from './components/views/Mypage/VideoUploadPage/VideoUploadPage3';
import QuizPage from './components/views/Mypage/QuizPage/QuizPage';

//======================== python test 페이지 ========================
// import pythonTest from './components/views/pythonTest/testPage';

function App(props) {
  return (
    <Router>
      <div className="bigScreen">
        <div className="errorMassage">
          화면사이즈 줄여주세요
        </div>
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}

          {/* 로그인/회원가입 관련 */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/register/3" component={Auth(RegisterPage3, false)} />
          <Route exact path="/register/4" component={Auth(RegisterPage4, false)} />
          <Route exact path="/register/5" component={Auth(RegisterPage5, false)} />

          {/* 검색관련페이지 */}
          <Route exact path="/search" component={Auth(SearchPage, null)} />
          <Route exact path="/search/results" component={Auth(SearchedPage, null)} />

          {/* 추천관련 페이지 */}
          <Route exact path="/booktrailer/recommend" component={Auth(RecommendPage, true)} />
          <Route exact path="/booktrailer/recommended" component={Auth(RecommendPage2, false)} />

          {/* 커뮤니티 페이지 */}
          <Route exact path="/community" component={Auth(CommunityPage, true)} />
          <Route exact path="/community/comments/:postId" component={Auth(CommunityCommentsPage, true)} />

          {/* 타임라인 페이지 */}
          <Route exact path="/timeline" component={Auth(TimeLinePage, true)} />
          <Route exact path="/timeline/comments/:postId" component={Auth(TimeLineCommentsPage, true)} />
          


          {/* 공유하기 페이지 */}
          <Route exact path="/share" component={Auth(SharePostPage, true)} />

          {/* 비디오 상세 페이지 */}
          <Route exact path="/booktrailer/details/:booktrailerId" component={Auth(VideoDatailPage, null)} />

          {/* 마이페이지 */}
          <Route exact path="/mypage" component={Auth(Mypage, true)} />
          <Route exact path="/mypage/booktrailer/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/mypage/booktrailer/upload2" component={Auth(VideoUploadPage2, true)} />
          <Route exact path="/mypage/booktrailer/upload3" component={Auth(VideoUploadPage3, true)} />
          <Route exact path="/mypage/booktrailer/uploaded" component={Auth(UploadBooktrailersPage, true)} />
          <Route exact path="/mypage/booktrailer/quiz" component={Auth(QuizPage, true)} />

          <Route exact path="/mypage/booktrailer/quiz" component={Auth(QuizPage, true)} />
          {/* 좋아요 페이지 */}
          <Route exact path="/likepage" component={Auth(Likepage, true)} />

          {/* 파이썬 페이지 */}
          {/* <Route exact path="/python" component={pythonTest} /> */}
          {/* 잘못된 주소가 있을 시에 전부 홈화면으로 보내기 */}
          <Redirect from="*" to="/login" />
        </Switch>

        <Navigation />
      </div>
    </Router>
  );
}

export default App;