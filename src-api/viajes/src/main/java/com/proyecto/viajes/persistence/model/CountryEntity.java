package com.proyecto.viajes.persistence.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "T_COUNTRY")
@Entity
public class CountryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String imgUrl;
	
	private String capital;

	private Integer population;
	
	private String country;
	
	private String countryCode;

	private String currencyCode;

	private char currencySymbol;

	private String languageCode;

	private String info;

	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	private List<CityEntity> cities;

}
