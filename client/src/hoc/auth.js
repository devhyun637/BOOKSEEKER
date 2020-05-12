import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null){

    //null -> 아무나 출입이 가능
    //true -> 로그인한 유저만 출입이 가능
    //false -> 로그인한 유저는 출입 불가능


    function AuthenticationCheck(props){

        const dispatch = useDispatch();


        //back에 req날리기
        useEffect(() => {
           dispatch(auth()).then(res => {
               console.log("hoc에서 묻는다", res);
           })
           
        }, [])
        return (
            <SpecificComponent/>
        )
    }


    return AuthenticationCheck
}