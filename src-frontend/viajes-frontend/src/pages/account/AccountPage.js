import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Account } from '../../components/Account/Account';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
    const navigate = useNavigate();
    const activeUser = localStorage.getItem("activeUser");

    useEffect(() => {
        if (!activeUser) {
            navigate('/');
        }
    }, [activeUser, navigate]);

    if (activeUser) {
        return (
            <div>
                <Header />
                <Account />
            </div>
        );
    }

    return null;
}

export default AccountPage;
