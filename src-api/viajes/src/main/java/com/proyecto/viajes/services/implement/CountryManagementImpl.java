package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.repositories.CountryRepositoryI;
import com.proyecto.viajes.services.interfaces.CountryManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CountryManagementImpl implements CountryManagementI{

	private CountryRepositoryI countryRepository;

	@Override
	public List<CountryEntity> findAll() {
		return countryRepository.findAll();
	}
	
	
}
