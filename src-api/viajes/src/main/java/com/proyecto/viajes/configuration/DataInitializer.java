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
		
		executeSqlStatement("INSERT INTO t_country (img_Url, capital, population, country, country_Code, currency_Code, currency_Symbol, language_Code, info) \n"
				+ "VALUES \n"
				+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Ciudad 1', 1000000, 'País 1', 'P1', 'C1', '$', 'LC1', 'Información sobre el pais 1'),\n"
				+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Ciudad 2', 2000000, 'País 2', 'P2', 'C2', '€', 'LC2', 'Información sobre el pais 2'),\n"
				+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Ciudad 3', 1500000, 'País 3', 'P3', 'C3', '¥', 'LC3', 'Información sobre el pais 3');\n"
				+ "");
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
