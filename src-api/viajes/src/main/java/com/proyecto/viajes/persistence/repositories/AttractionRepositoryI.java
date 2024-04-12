package com.proyecto.viajes.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.AttractionEntity;

/**
 * Interfaz que define un repositorio para la entidad AttractionEntity. Extiende
 */
@Repository
public interface AttractionRepositoryI extends JpaRepository<AttractionEntity, Long> {

	AttractionEntity findByAttraction(String attraction);

}
