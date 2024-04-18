package com.proyecto.viajes.services.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.persistence.repositories.VisitedPlaceRepositoryI;
import com.proyecto.viajes.services.interfaces.VisitedPlaceManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VisitedPlaceManagementImpl implements VisitedPlaceManagementI {

	private VisitedPlaceRepositoryI visitedPlaceRepository;

	@Override
	public VisitedPlaceEntity markAsVisited(UserEntity user, CountryEntity country, CityEntity city,
			AttractionEntity attraction) {
		VisitedPlaceEntity visitedPlace = new VisitedPlaceEntity();
		visitedPlace.setUser(user);
		visitedPlace.setCountry(country);
		visitedPlace.setCity(city);
		visitedPlace.setAttraction(attraction);
		return visitedPlaceRepository.save(visitedPlace);
	}

	@Override
	public List<VisitedPlaceEntity> getVisitedPlaces(UserEntity user) {
		return visitedPlaceRepository.findByUser(user);
	}

	public List<Object[]> findVisitedCountriesByUsername(String username) {
	    return visitedPlaceRepository.findVisitedCountriesByUsername(username);
	}

}
