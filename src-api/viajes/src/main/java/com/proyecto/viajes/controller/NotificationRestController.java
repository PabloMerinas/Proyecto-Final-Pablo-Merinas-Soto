package com.proyecto.viajes.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.NotificationEntity;
import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.services.implement.NotificationManagementImpl;
import com.proyecto.viajes.services.implement.UserManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las operaciones relacionadas con
 * las notificaciones.
 */
@RestController
@RequestMapping("/v1/notification")
@AllArgsConstructor
public class NotificationRestController {

	/**
	 * Inicializo el LOGGER con Slf4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(NotificationRestController.class);

	/**
	 * Inyección de dependencia de NotificationManagementImpl.
	 */
	private NotificationManagementImpl notificationRepository;

	/**
	 * Inyección de dependencia de UserManagementImpl.
	 */
	private UserManagementImpl userRepository;

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping
	public List<NotificationEntity> get() {
		return notificationRepository.findAll();
	}

	/**
	 * Endpoint para obtener todas las notificaciones. Se requiere que el usuario
	 * tenga el rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Lista de todas las notificaciones.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getNotificationsByUsername")
	public List<NotificationEntity> getNotificationByUsernam(String username) {
		// Buscar el usuario por nombre de usuario
		Optional<UserEntity> userOptional = userRepository.findByUsername(username);
		return userOptional.map(UserEntity::getNotification).orElse(Collections.emptyList());

	}

	/**
	 * Endpoint para eliminar una notificación por su id. Se requiere que el usuario
	 * tenga el rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Mensaje indicando el resultado de la operación.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@DeleteMapping("/deleteNotificationById")
	public ResponseEntity<String> deleteNotificationById(@RequestParam Long id) {
		try {
			Optional<NotificationEntity> notification = notificationRepository.findById(id);
			if (notification.isPresent()) {
				notificationRepository.delete(notification.get());
				LOGGER.info("Notificación eliminada correctamente: {}", notification);
				return ResponseEntity.ok("Notificación eliminada correctamente");
			} else {
				LOGGER.error("Notificación no encontrada para el ID proporcionado");
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			LOGGER.error("Error al eliminar la notificación: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al eliminar la notificación: " + e.getMessage());
		}
	}

	/**
	 * Añade una notificación a todos los usuarios existentes.
	 * 
	 * @param notificationEntity Notificación que se va a añadir.
	 * @return Respuesta de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/addNotificationToAllUsers")
	public ResponseEntity<String> addNotificationToAllUsers(@RequestBody NotificationEntity notificationEntity) {
		try {
			// Guarda la notificación
			NotificationEntity savedNotification = notificationRepository.save(notificationEntity);

			// Recupera las usuarios
			List<UserEntity> users = userRepository.getAllUsers();

			// Agregar la notificacion a cada usuario
			for (UserEntity user : users) {
				user.getNotification().add(savedNotification);

				// Agrega la relacion de usuario - notificacion
				Long notificationId = savedNotification.getId();
				notificationRepository.addUserToNotification(user.getUsername(), notificationId);

				// Guardar el usuario actualizado
				userRepository.save(user);
			}
			LOGGER.info("Notificación añadida a todos los usuarios correctamente");
			return ResponseEntity.ok("Notificación añadida a todos los usuarios correctamente");
		} catch (Exception e) {
			LOGGER.error("Error al añadir la notificación a todos los usuarios: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al añadir la notificación a todos los usuarios: " + e.getMessage());
		}
	}

}
