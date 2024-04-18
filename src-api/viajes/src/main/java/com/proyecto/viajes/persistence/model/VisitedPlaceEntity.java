package com.proyecto.viajes.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase VisitedPlaceEntity, representa la tabla visitedPlaces de la base de
 * datos. Guarda los lugares que ha visitado un usuario.
 */
@Data
@Table(name = "T_VISITED_PLACES")
@Entity
public class VisitedPlaceEntity {

	/**
	 * ID del lugar visitado.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * Usuario que ha visitado el lugar.
	 */
	@ManyToOne
	private UserEntity user;

	/**
	 * Pais visitado. ( Opcional )
	 */
	@ManyToOne
	private CountryEntity country;

	/**
	 * Ciudad visitada ( Opcional )
	 */
	@ManyToOne
	private CityEntity city;

	/**
	 * Attración visitada ( Opcional )
	 */
	@ManyToOne
	private AttractionEntity attraction;
}