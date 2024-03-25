package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.NotificationEntity;
import com.proyecto.viajes.services.implement.NotificationManagementImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/notification")
@AllArgsConstructor
public class NotificationRestController {

	private NotificationManagementImpl notificationRepository;

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping
	public List<NotificationEntity> getMethodName() {
		return notificationRepository.findAll();
	}

}
