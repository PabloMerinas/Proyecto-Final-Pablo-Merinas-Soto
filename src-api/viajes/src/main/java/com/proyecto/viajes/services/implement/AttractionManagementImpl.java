package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.repositories.AttractionRepositoryI;
import com.proyecto.viajes.services.interfaces.AttractionManagementI;

import lombok.AllArgsConstructor;

/**
 * Servicio que implementa la interfaz de AttractionEntity.
 */
@Service
@AllArgsConstructor
public class AttractionManagementImpl implements AttractionManagementI {

	/**
	 * Repositorio de AttractionEntity.
	 */
	private AttractionRepositoryI attractionRepository;

	@Override
	public List<AttractionEntity> findAll() {
		return attractionRepository.findAll();
	}

	@Override
	public void delete(AttractionEntity attraction) {
		attractionRepository.delete(attraction);
	}

	@Override
	public AttractionEntity findByAttraction(String attraction) {
		return attractionRepository.findByAttraction(attraction);
	}

	@Override
	public AttractionEntity findById(Long attractionId) {
		return attractionRepository.findById(attractionId).orElse(null);
	}

	@Override
	public void save(AttractionEntity attractionEntity) {
		attractionRepository.save(attractionEntity);
	}

}
