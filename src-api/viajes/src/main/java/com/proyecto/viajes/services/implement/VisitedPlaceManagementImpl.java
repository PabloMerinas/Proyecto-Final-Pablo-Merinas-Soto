package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

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

	@Override
	public boolean existsByUserAndCountryAndCityAndAttraction(UserEntity user, CountryEntity country, CityEntity city,
			AttractionEntity attraction) {
		return visitedPlaceRepository.existsByUserAndCountryAndCityAndAttraction(user, country, city, attraction);
	}

	@Override
	public void deleteByUserAndCountry(UserEntity user, CountryEntity country) {
		visitedPlaceRepository.deleteByUserAndCountry(user, country);
	}

	@Override
	public void deleteByUserAndCity(UserEntity user, CityEntity city) {
		visitedPlaceRepository.deleteByUserAndCity(user, city);
	}

	@Override
	public void deleteByUserAndAttraction(UserEntity user, AttractionEntity attraction) {
		visitedPlaceRepository.deleteByUserAndAttraction(user, attraction);
	}

	@Override
	public Optional<VisitedPlaceEntity> findById(Long placeId) {
		return visitedPlaceRepository.findById(placeId);
	}

	@Override
	public void delete(VisitedPlaceEntity visitedPlace) {
		visitedPlaceRepository.delete(visitedPlace);
	}

	@Override
	public List<VisitedPlaceEntity> findByAttraction(AttractionEntity attraction) {
		return visitedPlaceRepository.findByAttraction(attraction);
	}

	@Override
	public List<VisitedPlaceEntity> findByCity(CityEntity city) {
		return visitedPlaceRepository.findByCity(city);
	}

	@Override
	public List<VisitedPlaceEntity> findByCountry(CountryEntity country) {
		return visitedPlaceRepository.findByCountry(country);
	}

	@Override
	public void save(VisitedPlaceEntity visitedPlace) {
		visitedPlaceRepository.save(visitedPlace);
	}

	@Override
	public List<VisitedPlaceEntity> findByUser(UserEntity userOptional) {
		return visitedPlaceRepository.findByUser(userOptional);
	}

}
