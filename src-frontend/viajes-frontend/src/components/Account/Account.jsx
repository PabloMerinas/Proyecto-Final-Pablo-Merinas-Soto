import React from 'react';
import './account.css';
import { useAuth } from '../../authContext/autContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Account = () => {
    const { activeUser } = useAuth();

    if (!activeUser) {
        return <Navigate to="/" />;

    }
    // Compruebo si es admin
    let isAdmin = false; // Por defecto, el usuario no es administrador
    let isCustomer = false;

    if (activeUser) {
        isAdmin = activeUser.roles.includes('ADMIN');
        isCustomer = activeUser.roles.includes('CUSTOMER');
    }

    function generateItem(awesomeIco, title, description, link) {
        return (
            <Link to={link} className='account-links'>
                <div className='account-links'>
                    <div className="account-principal-nivel5-frame01">
                        <div className="account-principal-nivel6-frame01">
                            <i className={awesomeIco}></i>
                        </div>
                        <div className="account-principal-nivel6-frame1">
                            <div className="account-principal-nivel7-frame002">
                                <div className="account-principal-nivel8-frame0">
                                    <span className="account-principal-text02">
                                        <span>{title}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="account-principal-nivel7-frame1">
                                <div className="account-principal-nivel8-frame001">
                                    <span className="account-principal-text04">
                                        <span>{description}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className="account-principal-container">
            <div className="account-principal-account">
                <div className="account-principal-nivel4-frame0">
                    <div className="account-principal-nivel5-frame0">
                        <div className="account-principal-nivel6-frame0">
                            <div className="account-principal-nivel7-frame0">
                                <span className="account-principal-text">
                                    <span>Account</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-principal-nivel4-frame2">
                    {generateItem("fa-solid fa-user", "Personal info", "View my profile", "/personal")}
                    {isAdmin ? generateItem("fa-solid fa-user-tie", "Admin Dashboard", "View and manage all the modules", "/adminUsers") : null}
                    {isCustomer ? generateItem("fa-solid fa-mountain-sun", "Countries", "View all the countries", "/countries") : null}
                    {isCustomer ? generateItem("fa-solid fa-city", "Cities", "View all the cities", "/cities") : null}
                    {isCustomer ? generateItem("fa-solid fa-compass", "Attractions", "View all the attractions", "/attractions") : null}
                    {isCustomer ? generateItem("fa-solid fa-clipboard-list", "Visited Places", "View my visited places", "/visitedPlaces") : null}
                    {isCustomer ? generateItem("fa-solid fa-envelope", "Notifications", "View my notifications", "/notifications") : null}
                    {generateItem("fa-solid fa-right-from-bracket", "Log out", "Log out my session", "/")}
                </div>
                <div className="account-principal-nivel4-frame1">
                    <div className="account-principal-nivel5-frame02">
                        <span className="account-principal-text34">
                            {activeUser.username}, {activeUser.email}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}
