package com.proyecto.viajes.persistence.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase CityEntity, representa las ciudades de la base de datos.
 */
@Data
@Table(name = "T_CITY")
@Entity
public class CityEntity {

	/**
	 * ID de la ciudad.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * Nombre de la ciudad.
	 */
	private String city;

	/**
	 * Estado de la ciudad.
	 */
	private String state;

	/**
	 * Código del aeropuerto de la ciudad.
	 */
	private String airportCode;

	/**
	 * Número de la población de la ciudad.
	 */
	private Integer population;

	/**
	 * Pais al que pertenece la ciudad.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "country_id")
	private CountryEntity country;

	/**
	 * Lista de las atracciones que tiene la ciudad.
	 */
	@OneToMany(mappedBy = "city", fetch = FetchType.LAZY)
	private List<AttractionEntity> attractions;

	/**
	 * Información de la ciudad.
	 */
	private String info;

	/**
	 * Metodo para controlar que unicamente el JSON devuelva el nombre del pais y no
	 * toda la clase.
	 * 
	 * @return Nombre del país asociado
	 */
	@JsonGetter("country")
	public String getCountryName() {
		return country != null ? country.getCountry() : null;
	}

}
