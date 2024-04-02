package com.proyecto.viajes.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuración para permitir solicitudes CORS (Cross-Origin Resource Sharing).
 */
@Configuration
public class CorsConfig {

	/**
	 * Configura las políticas CORS permitiendo solicitudes desde cualquier origen y
	 * cualquier método HTTP.
	 *
	 * @return CorsConfigurationSource con la configuración CORS.
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);

		return source;
	}
}