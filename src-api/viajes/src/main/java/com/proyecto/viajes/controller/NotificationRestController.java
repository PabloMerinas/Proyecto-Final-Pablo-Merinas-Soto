package com.proyecto.viajes.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.NotificationEntity;
import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.services.implement.NotificationManagementImpl;
import com.proyecto.viajes.services.implement.UserManagementImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/notification")
@AllArgsConstructor
public class NotificationRestController {

	private NotificationManagementImpl notificationRepository;
	private UserManagementImpl userRepository;
	
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping
	public List<NotificationEntity> get() {
		return notificationRepository.findAll();
	}
	
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getNotificationsByUsername")
	public List<NotificationEntity> getNotificationByUsernam(String username){
		// Buscar el usuario por nombre de usuario
		Optional<UserEntity> user = userRepository.findByUsername(username);
		
		if (user != null) {
			// Obtener las notificaciones del usuario
			return user.get().getNotification();
		} else {
			return Collections.emptyList();
		}
	}

}
