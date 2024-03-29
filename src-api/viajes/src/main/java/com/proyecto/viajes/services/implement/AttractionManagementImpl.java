package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.repositories.AttractionRepositoryI;
import com.proyecto.viajes.services.interfaces.AttractionManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttractionManagementImpl implements AttractionManagementI{
	
	private AttractionRepositoryI attractionRepository;
	
	@Override
	public List<AttractionEntity> findAll() {
		return attractionRepository.findAll();
	}

	
	
}
