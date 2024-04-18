package com.proyecto.viajes.persistence.dto;

/**
 * Record con la informacion necesaria para crear un DTO con la informacion de
 * un lugar visitado, asi evito el problema de que me devuelva un JSON con los
 * hijos de cada item.
 */
public record VisitedPlaceInfoDTO(String username, String countryImgUrl, String countryCapital,
		Integer countryPopulation, String countryName, String countryCountryCode, String countryCurrencyCode,
		Character countryCurrencySymbol, String countryLanguageCode, String countryInfo, String cityName,
		String cityState, String cityAirportCode, Integer cityPopulation, String cityInfo, String attractionName,
		String attractionCategory, String attractionInfo) {
}
