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
}
