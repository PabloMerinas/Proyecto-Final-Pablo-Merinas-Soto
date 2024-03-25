package com.proyecto.viajes.configuration;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class DataInitializer {

	private final JdbcTemplate jdbcTemplate;

	private UserRepositoryI usuarioRepository;
	private PasswordEncoder passwordEncoder;

	@PostConstruct
	public void initializeData() {
		insertarUsuario("admin", "admin", "admin@admin.com", false, false, "adminImg.png");
		insertarUsuario("user", "user", "user@user.com", false, false, "");
		insertarRol("admin", "ADMIN");
		insertarRol("admin", "CUSTOMER");
		insertarRol("user", "CUSTOMER");

		// Paises de prueba
		executeSqlStatement(
				"INSERT INTO t_country (img_Url, capital, population, country, country_Code, currency_Code, currency_Symbol, language_Code, info) \n"
						+ "VALUES \n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Sevilla', 1000000, 'España', 'P1', 'C1', '$', 'LC1', 'Información sobre el pais 1'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Washinton', 2000000, 'Estados Unidos', 'P2', 'C2', '€', 'LC2', 'Información sobre el pais 2'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Bogotá', 1500000, 'Colombia', 'P3', 'C3', '¥', 'LC3', 'Información sobre el pais 3');\n"
						+ "");

		// Ciudades de prueba
		executeSqlStatement("INSERT INTO T_CITY (population, state ,city, airport_code, country_id, info) \n"
				+ "VALUES \n" + "(20000, 'Estate','Sevilla', 'COD1', 1, 'Información sobre la Ciudad 1'),\n"
				+ "(20000,'Estate','Cordoba', 'COD4', 1, 'Información sobre la Ciudad 4'),\n"
				+ "(20000,'Estate','Los angeles', 'COD2', 2, 'Información sobre la Ciudad 2'),\n"
				+ "(20000,'Estate','Medellin', 'COD3', 3, 'Información sobre la Ciudad 3');\n" + "");

		executeSqlStatement("INSERT INTO t_attraction (attraction, info, city_id, category) VALUES \n"
				+ "('Giralda', 'infoo', 1, 'LANDMARK'),\n" + "('Casa roma', 'infoo', 2, 'LANDMARK'),\n"
				+ "('POepita', 'infoo', 3, 'MUSEUM'),\n" + "('heheh', 'infoo', 4, 'NATIONAL_PARK');\n" + "");
	}

	private void executeSqlStatement(String sqlStatement) {
		jdbcTemplate.execute(sqlStatement);
	}

	@Transactional
	private UserEntity crearOBuscarUsuario(String username, String email, String password) {
		return usuarioRepository.findByUsername(username).orElseGet(() -> {

			UserEntity nuevoUsuario = new UserEntity();
			nuevoUsuario.setUsername(username);
			nuevoUsuario.setPassword(passwordEncoder.encode(password));
			nuevoUsuario.setEmail(email);
			nuevoUsuario.setActive(true);
			return usuarioRepository.save(nuevoUsuario);
		});
	}

	@Transactional
	private UserEntity insertarUsuario(String username, String password, String email, Boolean locked, Boolean disabled,
			String imgUrl) {
		return usuarioRepository.findByUsername(username).orElseGet(() -> {

			UserEntity nuevoUsuario = new UserEntity();
			nuevoUsuario.setUsername(username);
			nuevoUsuario.setPassword(passwordEncoder.encode(password));
			nuevoUsuario.setEmail(email);
			nuevoUsuario.setActive(false);
			nuevoUsuario.setImgUrl(imgUrl);
			return usuarioRepository.save(nuevoUsuario);
		});
	}

	private void insertarRol(String username, String rol) {
		executeSqlStatement("INSERT INTO t_user_role (username, role) VALUES ('" + username + "', '" + rol + "')");
	}
}
