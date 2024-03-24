package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.persistence.model.CityEntity;

public interface CityManagementI {

	public List<CityEntity> findAll();
}
