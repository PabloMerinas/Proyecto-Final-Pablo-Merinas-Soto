package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.repositories.CountryRepositoryI;
import com.proyecto.viajes.services.interfaces.CountryManagementI;

import lombok.AllArgsConstructor;

/**
 * Servicio que implementa la interfaz de CountryEntity.
 */
@Service
@AllArgsConstructor
public class CountryManagementImpl implements CountryManagementI {

	/**
	 * Repositorio de CountryEntity.
	 */
	private CountryRepositoryI countryRepository;

	@Override
	public List<CountryEntity> findAll() {
		return countryRepository.findAll();
	}

	@Override
	public CountryEntity findByCountry(String country) {
		return countryRepository.findByCountry(country);
	}

	@Override
	public void delete(CountryEntity country) {
		countryRepository.delete(country);
	}

	@Override
	public CountryEntity findById(Long id) {
		return countryRepository.findById(id).orElse(null);
	}

	@Override
	public void save(CountryEntity countryEntity) {
		countryRepository.save(countryEntity);
	}

}
