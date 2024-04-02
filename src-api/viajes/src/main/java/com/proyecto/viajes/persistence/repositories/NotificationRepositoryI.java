package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.NotificationEntity;

/**
 * Interfaz que define un repositorio para la entidad NotificationEntity.
 */
@Repository
public interface NotificationRepositoryI extends JpaRepository<NotificationEntity, Long> {

}
