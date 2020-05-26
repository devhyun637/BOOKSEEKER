import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
import LoginPage from '../components/views/LoginPage/LoginPage';
import LandingPage from '../components/views/LandingPage/LandingPage';
import { useState } from 'react';

export default function(SpecificComponent, option, adminRoute = null){

    function AuthenticationCheck(props){
        
        const [verify, setVerify] = useState(true);
        
        const dispatch = useDispatch();

        
        //back에 req날리기
        useEffect(() => {
            async function fetchData() {
                await dispatch(auth()).then(res => {
                    //console.log("hoc에서 묻는다", res);
                    setVerify(res.payload.verify);
                });
            }
           
            fetchData();
        }, []);

        return option==null? <SpecificComponent/> :option? verify? <SpecificComponent/> : <LoginPage/> : verify? LandingPage : <SpecificComponent/>

    }


    return AuthenticationCheck
}