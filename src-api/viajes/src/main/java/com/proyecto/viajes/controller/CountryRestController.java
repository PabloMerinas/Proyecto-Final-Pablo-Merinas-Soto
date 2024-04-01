package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.services.implement.CountryManagementImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/country")
@AllArgsConstructor
public class CountryRestController {

	private CountryManagementImpl countryRepository;
	
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCountries")
	public List<CountryEntity> getCountries(){
        return countryRepository.findAll();
	}
	
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCountryByCountry")
	public CountryEntity getCountryByCountry(@RequestParam String country) {
		return countryRepository.findByCountry(country);
	}
	
}
