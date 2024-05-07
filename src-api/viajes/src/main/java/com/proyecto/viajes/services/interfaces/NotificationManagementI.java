package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.NotificationEntity;

/**
 * Interfaz que define las operaciones de gestión de notificaciones.
 */
public interface NotificationManagementI {

	/**
	 * Obtiene todas las notificaciones.
	 * 
	 * @return Una lista de todas las notificaciones.
	 */
	List<NotificationEntity> findAll();

	/**
	 * Elimina una notificación.
	 * 
	 * @param n La notificación a eliminar.
	 */
	void delete(NotificationEntity n);

	/**
	 * Busca una notificación por su ID.
	 * 
	 * @param id El ID de la notificación a buscar.
	 * @return Un Optional que contiene la notificación si se encuentra, o vacío si
	 *         no.
	 */
	Optional<NotificationEntity> findById(Long id);

	/**
	 * Guarda una notificación.
	 * 
	 * @param userNotification Notificacion.
	 * @return Notificacion guardada.
	 */
	NotificationEntity save(NotificationEntity notificationEntity);

	/**
	 * Añade una notificacion a un usuario.
	 * 
	 * @param username       Usuario.
	 * @param notificationId Id de la notificacion.
	 */
	void addUserToNotification(String username, Long notificationId);

	/**
	 * Busca una notificacion por su titulo y su tiempo.
	 * 
	 * @param title   Titulo de la notificación.
	 * @param timeAgo Fecha de la notificacion.
	 * @return Notificación encontrada.
	 */
	NotificationEntity findByTitleAndTimeAgo(String title, String timeAgo);

}
