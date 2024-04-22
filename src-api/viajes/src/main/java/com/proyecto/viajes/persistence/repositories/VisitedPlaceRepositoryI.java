package com.proyecto.viajes.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
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

	/**
	 * Comprueba si el lugar ya existe en la bbdd
	 * 
	 * @param user       Usuario que se va a comprobar.
	 * @param country    Pais a comprobar.
	 * @param city       Ciudad a comprobar.
	 * @param attraction Attraccion a comprobar.
	 * @return True or false si existe o no.
	 */
	boolean existsByUserAndCountryAndCityAndAttraction(UserEntity user, CountryEntity country, CityEntity city,
			AttractionEntity attraction);

	/**
	 * Elimina los lugares visitados por un usuario en una atracción específica.
	 * 
	 * @param user       Usuario del que se eliminarán los lugares visitados.
	 * @param attraction Atracción de la que se eliminarán los lugares visitados.
	 */
	void deleteByUserAndAttraction(UserEntity user, AttractionEntity attraction);

	/**
	 * Elimina los lugares visitados por un usuario en una ciudad específica.
	 * 
	 * @param user Usuario del que se eliminarán los lugares visitados.
	 * @param city Ciudad de la que se eliminarán los lugares visitados.
	 */
	void deleteByUserAndCity(UserEntity user, CityEntity city);

	/**
	 * Elimina los lugares visitados por un usuario en un país específico.
	 * 
	 * @param user    Usuario del que se eliminarán los lugares visitados.
	 * @param country País del que se eliminarán los lugares visitados.
	 */
	void deleteByUserAndCountry(UserEntity user, CountryEntity country);

	/**
	 * Busca las relaciones que tiene un lugar por una atraccion.
	 * 
	 * @param attraction Attraction que se busca.
	 * @return Lista con los lugares visitados.
	 */
	List<VisitedPlaceEntity> findByAttraction(AttractionEntity attraction);

	/**
	 * Busca las relaciones que tiene un lugar por una ciudad.
	 * 
	 * @param city Ciudad a buscar sus relaciones.
	 * @return Lista de los lugares visitados.
	 */
	List<VisitedPlaceEntity> findByCity(CityEntity city);

	/**
	 * Busca las relaciones que tiene un lugar por un pais.
	 * 
	 * @param country Pais a buscar sus relaciones.
	 * @return Lista de los lugares visitados.
	 */
	List<VisitedPlaceEntity> findByCountry(CountryEntity country);

}
