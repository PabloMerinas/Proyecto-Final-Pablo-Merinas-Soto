package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.NotificationEntity;
import com.proyecto.viajes.persistence.repositories.NotificationRepositoryI;
import com.proyecto.viajes.services.interfaces.NotificationManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationManagementImpl implements NotificationManagementI {

	private NotificationRepositoryI notificationRepository;

	@Override
	public List<NotificationEntity> findAll() {
		return notificationRepository.findAll();
	}

}
