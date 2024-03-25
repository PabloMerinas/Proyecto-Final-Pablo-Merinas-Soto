package com.proyecto.viajes.persistence.model;

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

@Data
@Table(name = "T_ATTRACTION")
@Entity
public class AttractionEntity {

	public enum CATEGORY {
		LANDMARK, MUSEUM, CHURH, NATIONAL_PARK;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String attraction;

	@Enumerated(EnumType.STRING)
	private CATEGORY category;

	@ManyToOne
	@JoinColumn(name = "city_id")
	@JsonIgnore
	private CityEntity city;

	private String info;

}
