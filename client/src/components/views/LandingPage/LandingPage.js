import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {auth} from '../../../_actions/user_action';
import {useEffect} from 'react';

function LandingPage(props) {

    const [verify, setVerify] = useState(false);

    const dispatch = useDispatch();

    //back에 req날리기
    useEffect(() => {
        dispatch(auth()).then(res => {
            setVerify(res.payload.verify);
        })
        
     }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                console.log(res.data);
                if (res.data.isLogoutSuccess) {
                    document.location.href = "/";
                } else {
                    alert('로그아웃 실패');
                }
            });
    }

    if(verify){
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

                <button onClick={onClickHandler}>
                    로그아웃
                </button>
            </div>
        )
    }else{
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
            </div>
        )
    }
}

export default withRouter(LandingPage);