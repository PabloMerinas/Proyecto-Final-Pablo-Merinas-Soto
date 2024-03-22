import React, { useEffect, useState } from 'react';
import './style.css';
import { getUserInfo } from "../../service/getUserInfo";

export const Account = () => {

    const token = localStorage.getItem('authToken');
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserInfo(token); // Obtener la información del usuario utilizando el token
                setUserInfo(userData);
                localStorage.setItem('activeUser', JSON.stringify(userData));
            } catch (error) {
                console.error('Error al cargar la información del usuario:', error);
            }
        };

        fetchUserInfo();
    }, []);

    //console.log(userInfo);

    function generateItem(awesomeIco, title, description, link) {
        return (
            <a href={link} className='account-links'>
            <div className="account-p-rincipal-depth5-frame01">
                <div className="account-p-rincipal-depth6-frame01">
                    <i className={awesomeIco}></i>
                </div>
                <div className="account-p-rincipal-depth6-frame1">
                    <div className="account-p-rincipal-depth7-frame002">
                        <div className="account-p-rincipal-depth8-frame0">
                            <span className="account-p-rincipal-text02">
                                <span>{title}</span>
                            </span>
                        </div>
                    </div>
                    <div className="account-p-rincipal-depth7-frame1">
                        <div className="account-p-rincipal-depth8-frame001">
                            <span className="account-p-rincipal-text04">
                                <span>{description}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </a>
        )
    }

    return (
        <div className="account-p-rincipal-container">
            <div className="account-p-rincipal-account">
                <div className="account-p-rincipal-depth4-frame0">
                    <div className="account-p-rincipal-depth5-frame0">
                        <div className="account-p-rincipal-depth6-frame0">
                            <div className="account-p-rincipal-depth7-frame0">
                                <span className="account-p-rincipal-text">
                                    <span>Account</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-p-rincipal-depth4-frame2">
                    {generateItem("fa-solid fa-heart", "Personal info", "View my profile", "/personal")}
                    {generateItem("fa-solid fa-heart", "Admin Dashboard", "View and manage all modules")}
                    {generateItem("fa-solid fa-heart", "Countries", "View all the countries")}
                    {generateItem("fa-solid fa-heart", "Cities", "View all the cities")}
                    {generateItem("fa-solid fa-heart", "Attractions", "View all the attractions")}
                    {generateItem("fa-solid fa-heart", "Itineraries", "View all the itineraries")}
                    {generateItem("fa-solid fa-heart", "Notifications", "View my notifications")}
                    {generateItem("fa-solid fa-heart", "Log out", "Log out my session", "/")}
                </div>
                <div className="account-p-rincipal-depth4-frame1">
                    <div className="account-p-rincipal-depth5-frame02">
                        <span className="account-p-rincipal-text34">
                            {userInfo.username}, {userInfo.email}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}
