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
           dispatch(auth()).then(res => {
               //console.log("hoc에서 묻는다", res);
               setVerify(res.payload.verify);
           });
           
        });

        if(option == null){
            return (
                <SpecificComponent/>
            )
        }else if(option){
            if(verify){
                return (
                    <SpecificComponent/>
                )
            }else{
                return (<LoginPage/>)
            }
        }else{
            if(verify){
                return (
                    <LandingPage/>
                )
            }else{
                return (<SpecificComponent/>)
            }
        }
    }


    return AuthenticationCheck
}