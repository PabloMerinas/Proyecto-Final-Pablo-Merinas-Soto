package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.NotificationEntity;

public interface NotificationManagementI {
	
	public List<NotificationEntity> findAll();

}
