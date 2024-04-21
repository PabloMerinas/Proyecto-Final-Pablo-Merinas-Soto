package com.proyecto.viajes.persistence.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entidad Attraction, represetan las atracciones de la base de datos.
 */
@Data
@Table(name = "T_ATTRACTION")
@Entity
public class AttractionEntity {

	/**
	 * Enumerado de las categorias de atracciones que hay.
	 */
	public enum CATEGORY {
		LANDMARK, MUSEUM, CHURCH, NATIONAL_PARK;
	}

	/**
	 * ID de la atraccion.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * Direccion de la imagen de la atracción.
	 */
	private String imgUrl;

	/**
	 * Nombre de la atracción.
	 */
	private String attraction;

	/**
	 * Categoria de la atracción.
	 */
	@Enumerated(EnumType.STRING)
	private CATEGORY category;

	/**
	 * Ciudad a la que pertenece la atracción.
	 */
	@ManyToOne
	@JoinColumn(name = "city_id")
	@JsonIgnore
	private CityEntity city;

	/**
	 * Información de la atracción.
	 */
	private String info;

	/**
	 * Precio de la atraccion.
	 */
	private Double price;

	/**
	 * Metodo para devolver el valor de su ciudad asociada
	 * 
	 * @return Nombre de la ciudad asociada
	 */
	@JsonGetter("city")
	public String getCityName() {
		return city != null ? city.getCity() : null;
	}

	/**
	 * Metodo para devolver el valor de su pais asociado
	 * 
	 * @return Nombre del pais asociado
	 */
	@JsonGetter("country")
	public String getCountryName() {
		return city != null ? city.getCountryName() : null;
	}

}
