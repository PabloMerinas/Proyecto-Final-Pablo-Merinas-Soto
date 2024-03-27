package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

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

	@Override
	public void delete(NotificationEntity n) {
		notificationRepository.delete(n);
	}

	@Override
	public Optional<NotificationEntity> findById(Long id) {
		return notificationRepository.findById(id);
	}

}
