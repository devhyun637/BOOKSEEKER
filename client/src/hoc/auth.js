import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
import LoginPage from '../components/views/LoginPage/LoginPage';
import { useState } from 'react';

export default function(SpecificComponent, option, adminRoute = null){

    function AuthenticationCheck(props){
        
        const [verify, setVerify] = useState(true);
        
        const dispatch = useDispatch();

        
        //back에 req날리기
        useEffect(() => {
           dispatch(auth()).then(res => {
               //console.log("hoc에서 묻는다", res);
               setVerify(res.payload.verify);
           });
           return () => {
               setVerify(false);
           }
        }, [verify]);

        return option==null? <SpecificComponent/> :option? verify? <SpecificComponent/> : <LoginPage/> : verify? <LoginPage/> : <SpecificComponent/>

    }


    return AuthenticationCheck
}