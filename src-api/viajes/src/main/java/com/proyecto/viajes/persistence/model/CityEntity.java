package com.proyecto.viajes.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "T_CITY")
@Entity
public class CityEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String state;

	private String airportCode;

    @JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "country_id")
	private CountryEntity country;

//	@OneToMany(mappedBy = "city", fetch = FetchType.LAZY)
//	private List<AttractionsEntity> attractions;

	private String info;
}
