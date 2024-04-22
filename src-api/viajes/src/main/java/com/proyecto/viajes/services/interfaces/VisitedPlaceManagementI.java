package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;

/**
 * Interfaz que define las operaciones de gestión de los lugares visitados.
 */
public interface VisitedPlaceManagementI {

	/**
	 * Marca como visitado un lugar, se le pasa un lugar, que puede ser un pais,
	 * ciudad o atraccion. Se le pasa el usuario al que se le va a agregar.
	 * 
	 * @param user       Usuario al que se le agregará el lugar visitado.
	 * @param country    Pais marcado como visto.
	 * @param city       Ciudad marcada como vista.
	 * @param attraction Attración marcada como vista.
	 * @return
	 */
	public VisitedPlaceEntity markAsVisited(UserEntity user, CountryEntity country, CityEntity city,
			AttractionEntity attraction);

	/**
	 * Devuelve la lista de los lugares visitados por el usuario.
	 * 
	 * @param user Usuario que se va a buscar.
	 * @return Lista de los lugares visitados.
	 */
	public List<VisitedPlaceEntity> getVisitedPlaces(UserEntity user);

	/**
	 * Comprueba si el lugar ya existe en la bbdd
	 * 
	 * @param user       Usuario que se va a comprobar.
	 * @param country    Pais a comprobar.
	 * @param city       Ciudad a comprobar.
	 * @param attraction Attraccion a comprobar.
	 * @return True or false si existe o no.
	 */
	public boolean existsByUserAndCountryAndCityAndAttraction(UserEntity user, CountryEntity country, CityEntity city,
			AttractionEntity attraction);

	/**
	 * Elimina los lugares visitados por un usuario en un país específico.
	 * 
	 * @param user    Usuario del que se eliminarán los lugares visitados.
	 * @param country País del que se eliminarán los lugares visitados.
	 */
	public void deleteByUserAndCountry(UserEntity user, CountryEntity country);

	/**
	 * Elimina los lugares visitados por un usuario en una ciudad específica.
	 * 
	 * @param user Usuario del que se eliminarán los lugares visitados.
	 * @param city Ciudad de la que se eliminarán los lugares visitados.
	 */
	public void deleteByUserAndCity(UserEntity user, CityEntity city);

	/**
	 * Elimina los lugares visitados por un usuario en una atracción específica.
	 * 
	 * @param user       Usuario del que se eliminarán los lugares visitados.
	 * @param attraction Atracción de la que se eliminarán los lugares visitados.
	 */
	public void deleteByUserAndAttraction(UserEntity user, AttractionEntity attraction);

	/**
	 * Busca un lugar visitado por su ID.
	 * 
	 * @param placeId ID del lugar visitado a buscar.
	 * @return Lugar visitado encontrado, o vacío si no se encuentra.
	 */
	public Optional<VisitedPlaceEntity> findById(Long placeId);

	/**
	 * Elimina un lugar visitado.
	 * 
	 * @param visitedPlace Lugar visitado a eliminar.
	 */
	public void delete(VisitedPlaceEntity visitedPlace);

	/**
	 * Guarda un lugar visitado.
	 * 
	 * @param visitedPlace Lugar visitado a guardar.
	 */
	public void save(VisitedPlaceEntity visitedPlace);

	/**
	 * Busca todas las relacion de un lugar visitado hacia una atraccion.
	 * 
	 * @param attraction Attraccion que se va a buscar.
	 * @return Lista de las relaciones que tiene esa atraccion.
	 */
	public List<VisitedPlaceEntity> findByAttraction(AttractionEntity attraction);

	/**
	 * Busca las relaciones que tiene un lugar por una ciudad.
	 * 
	 * @param city Ciudad a buscar sus relaciones.
	 * @return Lista de los lugares visitados.
	 */
	public List<VisitedPlaceEntity> findByCity(CityEntity city);

	/**
	 * Busca las relaciones que tiene un lugar por un pais.
	 * 
	 * @param country Pais a buscar sus relaciones.
	 * @return Lista de los lugares visitados.
	 */
	public List<VisitedPlaceEntity> findByCountry(CountryEntity country);

	/**
	 * Busca las relaciones que tiene un usuario.
	 * 
	 * @param userOptional Usuario a buscar.
	 * @return Lista de sus relaciones.
	 */
	public List<VisitedPlaceEntity> findByUser(UserEntity userOptional);

}
