package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.CountryEntity;

public interface CountryManagementI {

	public List<CountryEntity> findAll();
	public CountryEntity findByCountry(String country);
}
