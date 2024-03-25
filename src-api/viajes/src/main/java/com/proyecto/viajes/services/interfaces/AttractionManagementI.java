package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.AttractionEntity;

public interface AttractionManagementI {

	public List<AttractionEntity> findAll();
}
