package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.repositories.CityRepositoryI;
import com.proyecto.viajes.services.interfaces.CityManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CityManagementImpl implements CityManagementI {

	private CityRepositoryI cityRepository;

	@Override
	public List<CityEntity> findAll() {
		return cityRepository.findAll();
	}

	@Override
	public CityEntity findByCity(String city) {
		return cityRepository.findByCity(city);
	}

	@Override
	public void delete(CityEntity cityToDelete) {
		cityRepository.delete(cityToDelete);
	}

	@Override
	public CityEntity findById(Long cityId) {
		return cityRepository.findById(cityId).orElse(null);
	}

	@Override
	public void save(CityEntity cityEntity) {
		cityRepository.save(cityEntity);
	}

}
