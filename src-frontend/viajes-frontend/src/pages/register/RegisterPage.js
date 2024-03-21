import React from 'react';
import HeaderBasic from '../../components/HeaderBasic/HeaderBasic';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

function RegisterPage() {
    return (
        <div>
            <HeaderBasic></HeaderBasic>
            <RegisterForm></RegisterForm>
        </div>
    );
}

export default RegisterPage;
