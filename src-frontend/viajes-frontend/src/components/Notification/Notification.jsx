import React, { useState, useEffect } from "react";
import './notifications.css';
import { getNotificationsByUsername } from "../../service/notificationService";

function generateNormalNotification(awesomeIco, title, timeAgo) {
    return (
        <div className="notifications-depth4-frame1">
            <div className="notifications-depth5-frame01">
                <div className="notifications-depth6-frame001">
                    <div className="notifications-depth7-frame001">
                        <i className={awesomeIco}></i>
                    </div>
                </div>
                <div className="notifications-depth6-frame1">
                    <div className="notifications-depth7-frame002">
                        <div className="notifications-depth8-frame001">
                            <span className="notifications-text02">
                                <span>{title}</span>
                            </span>
                        </div>
                    </div>
                    <div className="notifications-depth7-frame1">
                        <div className="notifications-depth8-frame002">
                            <span className="notifications-text04">
                                <span>{timeAgo}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="notifications-depth5-frame1" onClick={onClickDeleteNotification}>
                <div className="notifications-depth6-frame002">
                    <div className="notifications-depth7-frame003">
                        <div className="notifications-depth8-frame003">
                            <span className="notifications-text06">
                                <span>Delete</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    // Recupero las notificaciones
    useEffect(() => {
        const fetchData = async () => {
            try {
                const activeUser = JSON.parse(localStorage.getItem('activeUser'));
                const authToken = localStorage.getItem('authToken');
                const notificationsData = await getNotificationsByUsername(authToken, activeUser.username);
                setNotifications(notificationsData);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="notifications-container">
            <div className="notifications-depth3-frame0">
                <div className="notifications-depth4-frame0">
                    <div className="notifications-depth5-frame0">
                        <div className="notifications-depth6-frame0">
                            <div className="notifications-depth7-frame0">
                                <span className="notifications-text">
                                    <span>Notifications</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {notifications.map(notification => (
                    generateNormalNotification("fa-solid fa-plane", notification.title, notification.timeAgo)
                ))}
            </div>
        </div>
    )
}

function onClickDeleteNotification() {
    alert("ELIMINA!")
    // TODO
}