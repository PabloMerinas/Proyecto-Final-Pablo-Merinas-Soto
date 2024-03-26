import React, { useState, useEffect } from "react";
import './notifications.css';
import { getNotificationsByUsername } from "../../service/notificationService";

function generateNormalNotification(id, awesomeIco, title, timeAgo) {
  return (
    <div key={id} className="notifications-nivel4-frame1">
      <div className="notifications-nivel5-frame01">
        <div className="notifications-nivel6-frame001">
          <div className="notifications-nivel7-frame001">
            <i className={awesomeIco}></i>
          </div>
        </div>
        <div className="notifications-nivel6-frame1">
          <div className="notifications-nivel7-frame002">
            <div className="notifications-nivel8-frame001">
              <span className="notifications-text02">
                <span>{title}</span>
              </span>
            </div>
          </div>
          <div className="notifications-nivel7-frame1">
            <div className="notifications-nivel8-frame002">
              <span className="notifications-text04">
                <span>{timeAgo}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="notifications-nivel5-frame1" onClick={onClickDeleteNotification}>
        <div className="notifications-nivel6-frame002">
          <div className="notifications-nivel7-frame003">
            <div className="notifications-nivel8-frame003">
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

// Método que genera la lista de las notificaciones simples, se le pasa un array de notificaciones
export function generateSimpleNotification(notifications) {
  return (
    <div className="simple-notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className="simple-notification-simple-notification">
          <div className="simple-notification-nivel4-frame5">
            <div className="simple-notification-nivel5-frame0">
              <div className="simple-notification-nivel6-frame0">
                <div className="simple-notification-nivel7-frame0">
                  <i className={notification.awesomeIco ? notification.awesomeIco : "fa-solid fa-plane"}></i>
                </div>
              </div>
              <div className="simple-notification-nivel6-frame1">
                <div className="simple-notification-nivel7-frame01">
                  <div className="simple-notification-nivel8-frame01">
                    <span className="simple-notification-text">
                      <span>{notification.title ? notification.title : "Default"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
      <div className="notifications-nivel3-frame0">
        <div className="notifications-nivel4-frame0">
          <div className="notifications-nivel5-frame0">
            <div className="notifications-nivel6-frame0">
              <div className="notifications-nivel7-frame0">
                <span className="notifications-text">
                  <span>Notifications</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {notifications.map(notification => (
          generateNormalNotification(notification.id, "fa-solid fa-plane", notification.title, notification.timeAgo)
        ))}
      </div>
    </div>
  )
}

function onClickDeleteNotification() {
  alert("ELIMINA!")
  // TODO
}