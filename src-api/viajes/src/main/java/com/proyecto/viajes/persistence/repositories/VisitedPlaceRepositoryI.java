package com.proyecto.viajes.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;

/**
 * Intefaz que define un repositorio para la entidad de los lugares visitados (
 * VisitedPlaces ).
 */
@Repository
public interface VisitedPlaceRepositoryI extends JpaRepository<VisitedPlaceEntity, Long> {

	/**
	 * Devuelve una lista de los lugares visitados pasandole el usuario.
	 * 
	 * @param user Usuario que se va a buscar sus lugares visitados.
	 * @return Lista de los lugares visitados.
	 */
	List<VisitedPlaceEntity> findByUser(UserEntity user);

}
