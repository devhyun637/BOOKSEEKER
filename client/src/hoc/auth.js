import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
import LoginPage from '../components/views/LoginPage/LoginPage';
import LandingPage from '../components/views/LandingPage/LandingPage';
import { useState } from 'react';

export default function(SpecificComponent, option, adminRoute = null){

    //null -> 아무나 출입이 가능
    //true -> 로그인한 유저만 출입이 가능
    //false -> 로그인한 유저는 출입 불가능


    function AuthenticationCheck(props){
        
        const [verify, setVerify] = useState(false);
        
        const dispatch = useDispatch();


        //back에 req날리기
        useEffect(() => {
           dispatch(auth()).then(res => {
               //console.log("hoc에서 묻는다", res);
               setVerify(res.payload.verify);
           })
           
        }, []);

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