package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.NotificationEntity;

public interface NotificationManagementI {
	
	public List<NotificationEntity> findAll();
	
	public void delete(NotificationEntity n);
	
	public Optional<NotificationEntity> findById(Long id);

}
