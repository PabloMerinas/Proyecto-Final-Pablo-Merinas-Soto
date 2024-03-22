package com.proyecto.viajes.persistence.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "T_CITY")
@Entity
public class CityEntity {

	public enum CONTINENT {
		AMERICA, EUROPE, AFRICA, OCEANIA, ASIA;
	}

	@Id
	private Long id;

	private String state;

	private String airportCode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "country_id")
	private CountryEntity country;

	private CONTINENT continent;

	@OneToMany(mappedBy = "city", fetch = FetchType.LAZY)
	List<AttractionsEntity> attractions;

	private String info;
}
