package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.CityEntity;

/**
 * Interfaz que define un repositorio para la entidad CityEntity.
 */
@Repository
public interface CityRepositoryI extends JpaRepository<CityEntity, Long> {

	CityEntity findByCity(String city);

}
