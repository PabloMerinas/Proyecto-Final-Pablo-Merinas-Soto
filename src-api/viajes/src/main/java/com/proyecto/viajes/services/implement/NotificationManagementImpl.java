package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.NotificationEntity;
import com.proyecto.viajes.persistence.repositories.NotificationRepositoryI;
import com.proyecto.viajes.services.interfaces.NotificationManagementI;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

/**
 * Servicio que implementa la interfaz de NotificationEntity.
 */
@Service
@AllArgsConstructor
public class NotificationManagementImpl implements NotificationManagementI {

	/**
	 * Repositorio de NotificationEntity.
	 */
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

	@Override
	public NotificationEntity save(NotificationEntity userNotification) {
		return notificationRepository.save(userNotification);
	}

	@Override
	@Transactional
	public void addUserToNotification(String username, Long notificationId) {
		notificationRepository.addUserToNotification(username, notificationId);
	}

	@Override
	public NotificationEntity findByTitleAndTimeAgo(String title, String timeAgo) {
		return notificationRepository.findByTitleAndTimeAgo(title, timeAgo);
	}

}
