package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.NotificationEntity;

import jakarta.transaction.Transactional;

/**
 * Interfaz que define un repositorio para la entidad NotificationEntity.
 */
@Repository
public interface NotificationRepositoryI extends JpaRepository<NotificationEntity, Long> {

    /**
     * Agrega la relación entre una notificación y un usuario mediante una consulta personalizada.
     * 
     * @param username El nombre de usuario.
     * @param notificationId El ID de la notificación.
     */
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO T_NOTIFICATION_user_notified (user_notified_username, notification_id) VALUES (:username, :notificationId)", nativeQuery = true)
    void addUserToNotification(String username, Long notificationId);

	NotificationEntity findByTitleAndTimeAgo(String title, String timeAgo);
}
