package com.proyecto.viajes.persistence.model;

import jakarta.persistence.Entity;
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
public class AttractionsEntity {

	public enum CATEGORY {
		LANDMARK, MUSEUM, CHURH, NATIONAL_PARK;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private CATEGORY category;

//	@ManyToOne
//	@JoinColumn(name = "city_id")
//	private CityEntity city;

	private String info;

}
