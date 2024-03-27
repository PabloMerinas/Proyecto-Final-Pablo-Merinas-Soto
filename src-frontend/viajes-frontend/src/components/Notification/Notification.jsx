import React, { useState, useEffect } from "react";
import './notifications.css';
import { getNotificationsByUsername } from "../../service/notificationService";
import { deleteNotificationById } from "../../service/notificationService";

// Método que genera la lista de las notificaciones simples, se le pasa un array de notificaciones
export function generateSimpleNotification(notifications) {
  return (
    <a href="/notifications" className="a-no-style">
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
    </a>
  );
}

// Funcion solo para mostrar si no hay notificaciones, le paso el ancho por el popup
export function NoNotifications(width) {
  const containerStyle = {
    width: width || '100%',
  };
  const notificationStyle = {
    left: '0px',
  };
  return (
    <div className="notifications-nivel4-frame1" style={containerStyle}>
      <div className="notifications-nivel5-frame01 no-notifications" style={notificationStyle}>
        <span>You have no notifications at the moment.</span>
      </div>
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
        console.error('Error recuperando las notifications:', error);
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
        {notifications.length === 0 ? (
          <NoNotifications />
        ) : (
          notifications.map(notification => (
            generateNormalNotification(notification.id, "fa-solid fa-plane", notification.title, notification.timeAgo)
          ))
        )}
      </div>
    </div>
  )



  // Método para generar una notificación
  function generateNormalNotification(id, awesomeIco, title, timeAgo) {
    const token = localStorage.getItem('authToken');

    // Metodo para gestionar la eliminacion de la notificación, le paso el id para seleccionarla
    async function onClickDeleteNotification(id) {
      // Recupero el div con el contador
      const notificationCounter = document.getElementsByClassName('notification-counter')[0];
      try {
        await deleteNotificationById(token, id);
        // Eliminar la notificación de la variable local después de eliminarla del servidor
        const updatedNotifications = notifications.filter(notification => notification.id !== id);
        setNotifications(updatedNotifications);

        // Actualizo el contador
        if (updatedNotifications.length !== 0) {
          notificationCounter.innerHTML = updatedNotifications.length
        } else {
          notificationCounter.innerHTML = '';
          notificationCounter.style.border = 'none';
        }
      } catch (error) {
        console.error('Error deleting the notification:', error);
      }

    }

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
        <div className="notifications-nivel5-frame1" onClick={() => onClickDeleteNotification(id)}>
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
}


