package com.proyecto.viajes.persistence.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase CountryEntity, representa los usuarios en la base de datos.
 */
@Data
@Table(name = "T_COUNTRY")
@Entity
public class CountryEntity {

	/**
	 * Id del usuario.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * Direccion de la imagen del pais.
	 */
	private String imgUrl;

	/**
	 * Capital del pais.
	 */
	private String capital;

	/**
	 * Numero de población del pais.
	 */
	private Integer population;

	/**
	 * Nombre del pais.
	 */
	private String country;

	/**
	 * Código del pais.
	 */
	private String countryCode;

	/**
	 * Código del tipo de moneda.
	 */
	private String currencyCode;

	/**
	 * Símbolo de la moneda del pais.
	 */
	private char currencySymbol;

	/**
	 * Código del lenguaje del pais.
	 */
	private String languageCode;

	/**
	 * Información del pais.
	 */
	private String info;

	/**
	 * Lista de ciudades del pais.
	 */
	@JsonIgnore
	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	private List<CityEntity> cities;

}
