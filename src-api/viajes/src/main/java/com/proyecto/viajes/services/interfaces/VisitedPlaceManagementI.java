package com.proyecto.viajes.services.interfaces;

import java.util.List;

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

}
