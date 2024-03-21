import React from 'react';
import HeaderBasic from '../../components/HeaderBasic/HeaderBasic';
import { Register } from '../../components/RegisterForm/RegisterForm';

function RegisterPage() {
    return (
        <div>
            <HeaderBasic></HeaderBasic>
            <Register></Register>
        </div>
    );
}

export default RegisterPage;
