package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.CountryEntity;

/**
 * Interfaz que define las operaciones de gestión de países.
 */
public interface CountryManagementI {

	/**
	 * Obtiene todos los países.
	 * 
	 * @return Una lista de todos los países.
	 */
	List<CountryEntity> findAll();

	/**
	 * Busca un país por su nombre.
	 * 
	 * @param country El nombre del país a buscar.
	 * @return El país si se encuentra, o null si no.
	 */
	CountryEntity findByCountry(String country);

	/**
	 * Elimina un pais.
	 * 
	 * @param country Pais que se va a eliminar.
	 */
	void delete(CountryEntity country);

	/**
	 * Recupera un pais por su id.
	 * 
	 * @param id Id del pais a buscar.
	 * @return Pais encontrado.
	 */
	CountryEntity findById(Long id);
	
	/**
	 * Guarda un pais.
	 * @param countryEntity Pais a guardar.
	 */
	public void save(CountryEntity countryEntity);
}
