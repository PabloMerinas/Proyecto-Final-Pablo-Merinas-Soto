package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.CountryEntity;

@Repository
public interface CountryRepositoryI extends JpaRepository<CountryEntity, Long> {

	CountryEntity findByCountry(String country);

	
}
