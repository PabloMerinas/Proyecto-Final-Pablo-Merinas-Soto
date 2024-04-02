package com.proyecto.viajes.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

/**
 * Configuración de seguridad de la aplicación.
 */
@Configuration
@EnableMethodSecurity(securedEnabled = true)
@AllArgsConstructor
public class SecurityConfig {

	/**
	 * Filtro de autenticación posterior personalizado.
	 */
	private final JWTAuthorizationFilter jwtFilter;

	/**
	 * Configura la cadena de filtros de seguridad HTTP.
	 * 
	 * @param http Objeto HttpSecurity para configurar la seguridad HTTP.
	 * @return La cadena de filtros de seguridad.
	 * @throws Exception Si hay un error al configurar la seguridad HTTP.
	 */
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable()).cors(withDefaults())
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(requests -> requests.requestMatchers("/api/auth/**").permitAll()
						.requestMatchers("/v1/user/**").permitAll().requestMatchers("/v1/country/**").permitAll()
						.requestMatchers("/v1/city/**").permitAll().anyRequest().permitAll()) // Cambiar permitAll() a
																								// authenticated()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	/**
	 * Configura el codificador de contraseñas.
	 * 
	 * @return Un bean del codificador de contraseñas.
	 */
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Configura el administrador de autenticación.
	 * 
	 * @param configuration Configuración de autenticación.
	 * @return El administrador de autenticación.
	 * @throws Exception Si hay un error al obtener el administrador de
	 *                   autenticación.
	 */
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

}
