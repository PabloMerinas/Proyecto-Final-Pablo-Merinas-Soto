package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.CountryEntity;

/**
 * Interfaz que define un repositorio para la entidad CountryEntity.
 */
@Repository
public interface CountryRepositoryI extends JpaRepository<CountryEntity, Long> {

	/**
	 * Busca un país por su nombre.
	 *
	 * @param country El nombre del país a buscar.
	 * @return La entidad CountryEntity asociada al nombre especificado.
	 */
	CountryEntity findByCountry(String country);

}
