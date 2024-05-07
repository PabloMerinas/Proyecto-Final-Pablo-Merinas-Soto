package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.CityEntity;

/**
 * Interfaz que define un repositorio para la entidad CityEntity.
 */
@Repository
public interface CityRepositoryI extends JpaRepository<CityEntity, Long> {

	/**
	 * Busca una ciudad por su nombre.
	 * 
	 * @param city Nombre de la ciudad.
	 * @return Ciudad encontrada.
	 */
	CityEntity findByCity(String city);

}
