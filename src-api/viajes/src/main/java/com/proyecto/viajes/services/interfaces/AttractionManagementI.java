package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.AttractionEntity;

/**
 * Interfaz que define las operaciones de gestión de atracciones turísticas.
 */
public interface AttractionManagementI {

	/**
	 * Obtiene todas las atracciones turísticas.
	 * 
	 * @return Una lista de todas las atracciones turísticas.
	 */
	List<AttractionEntity> findAll();

	/**
	 * Obtiene una atracción pasandole su nombre.
	 * 
	 * @param attraction Nombre de la attraccion.
	 * @return Optional con la atracción.
	 */
	AttractionEntity findByAttraction(String attraction);

	/**
	 * Elimina una atracción.
	 * 
	 * @param attraction Attracción a eliminar.
	 */
	void delete(AttractionEntity attraction);
}
