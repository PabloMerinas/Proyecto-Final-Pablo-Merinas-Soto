import React from 'react';
import HeaderBasic from '../../components/HeaderBasic/HeaderBasic';
import { Login } from '../../components/Login/Login';

function LoginPage(){
    return (
        <div>
            <HeaderBasic></HeaderBasic>
            <Login></Login>
        </div>
    )
}

export default LoginPage;