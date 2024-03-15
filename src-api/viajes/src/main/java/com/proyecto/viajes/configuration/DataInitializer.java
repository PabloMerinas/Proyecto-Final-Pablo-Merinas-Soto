package com.proyecto.viajes.configuration;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

	private final JdbcTemplate jdbcTemplate;

	public DataInitializer(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@PostConstruct
	public void initializeData() {
	    String passwordAdmin = new BCryptPasswordEncoder().encode("admin");
	    String passwordUser = new BCryptPasswordEncoder().encode("user");

	    executeSqlStatement(
	            "INSERT INTO T_USER (C_USERNAME, C_NAME, C_PASSWORD, C_EMAIL, C_ROLES) VALUES ('admin','Pablo Administrador', '"
	                    + passwordAdmin + "', 'admin@admin.com', 'ROLE_ADMIN');");
	    executeSqlStatement(
	    		"INSERT INTO T_USER (C_USERNAME, C_NAME, C_PASSWORD, C_EMAIL, C_ROLES) VALUES ('user','Pablo Usuario', '"
	    				+ passwordUser + "', 'user@user.com', 'ROLE_USER');");
	}


	private void executeSqlStatement(String sqlStatement) {
		jdbcTemplate.execute(sqlStatement);
	}
}
