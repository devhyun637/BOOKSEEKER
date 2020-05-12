import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    // const onClickHandler = () => {
    //     axios.get('/api/users/logout')
    //         .then(res => {
    //             if (res.data.isLogoutSuccess) {
    //                 props.history.push('/login');
    //             } else {
    //                 alert('로그아웃 실패');
    //             }
    //         });
    // }

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40vh 0',
            width: '100%',
            height: '100vh'
        }}>
            <h2>LandingPage</h2>

            <div>로그인 안내와 함께 검색창이 제공될 예정</div>

            {/* <button onClick={onClickHandler}>
                로그아웃
            </button> */}
        </div>
    )
}

export default withRouter(LandingPage);