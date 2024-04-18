package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.CityEntity;

/**
 * Interfaz que define las operaciones de gestión de ciudades.
 */
public interface CityManagementI {

	/**
	 * Obtiene todas las ciudades.
	 * 
	 * @return Una lista de todas las ciudades.
	 */
	List<CityEntity> findAll();

	/**
	 * Busca una ciudad por su nombre.
	 * 
	 * @param city Nombre de la ciudad.
	 * @return Ciudad encontrada.
	 */
	CityEntity findByCity(String city);

	/**
	 * Elimina una ciudad.
	 * 
	 * @param cityToDelete Ciudad que elimina.
	 */
	void delete(CityEntity cityToDelete);

	/**
	 * Encuentra una ciudad por su id.
	 * 
	 * @param cityId ID de la ciudad a buscar.
	 * @return Ciudad encontrada.
	 */
	public CityEntity findById(Long cityId);
}
