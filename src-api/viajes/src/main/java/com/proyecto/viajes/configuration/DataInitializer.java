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
/**
 * Clase para inicializar datos en la base de datos.
 */
public class DataInitializer {

	private final JdbcTemplate jdbcTemplate;

	private UserRepositoryI usuarioRepository;
	private PasswordEncoder passwordEncoder;

	/**
	 * Metodo para inicializar los datos.
	 */
	@PostConstruct
	public void initializeData() {
		insertarUsuario("admin", "admin", "admin@admin.com", false, false, "adminImg.png");
		insertarUsuario("user", "user", "user@user.com", false, false, "");
		insertarRol("admin", "ADMIN");
		insertarRol("admin", "CUSTOMER");
		insertarRol("user", "CUSTOMER");

		// Insertar países de prueba
		executeSqlStatement(
				"INSERT INTO t_country (img_Url, capital, population, country, country_Code, currency_Code, currency_Symbol, language_Code, info) \n"
						+ "VALUES \n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Madrid', 4700000, 'España', 'ES', 'EUR', '€', 'es', 'España es un país ubicado en Europa occidental'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png', 'Washington D.C.', 7000000, 'Estados Unidos', 'US', 'USD', '$', 'en', 'Estados Unidos es una república federal constitucional en América del Norte'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/800px-Flag_of_Colombia.svg.png', 'Bogotá', 8600000, 'Colombia', 'CO', 'COP', '$', 'es', 'Colombia es una república en América del Sur');\n"
						+ "");

		// Insertar ciudades de prueba
		executeSqlStatement("INSERT INTO T_CITY (population, state ,city, airport_code, country_id, info) \n"
				+ "VALUES \n"
				+ "(3000000, 'Comunidad de Madrid', 'Madrid', 'MAD', 1, 'Madrid es la capital de España y una de las ciudades más grandes de Europa'),\n"
				+ "(8800000, 'Distrito de Columbia', 'Washington D.C.', 'DCA', 2, 'Washington D.C. es la capital de los Estados Unidos y el centro político del país'),\n"
				+ "(7400000, 'Departamento de Cundinamarca', 'Bogotá', 'BOG', 3, 'Bogotá es la capital de Colombia y la ciudad más grande del país');\n"
				+ "");

		// Insertar atracciones de prueba
		executeSqlStatement("INSERT INTO t_attraction (attraction, info, city_id, category) VALUES \n"
				+ "('Museo del Prado', 'Museos de arte más importantes del mundo', 1, 'MUSEUM'),\n"
				+ "('Monumento a Lincoln', 'Monumento conmemorativo.', 2, 'LANDMARK'),\n"
				+ "('Museo del Oro', 'Museo ubicado en Bogotá', 3, 'MUSEUM');\n" + "");

		executeSqlStatement("INSERT INTO t_attraction (attraction, info, city_id, category) VALUES \n"
				+ "('Catedral de Sevilla', 'Catedral gótica más grande del mundo', 1, 'CHURCH'),\n"
				+ "('Parque de María Luisa', 'Famoso parque público en Sevilla', 1, 'NATIONAL_PARK');\n" + "");

		// Insertar notificaciones
		executeSqlStatement("INSERT INTO T_NOTIFICATION (id, title, time_ago)\n" + "VALUES \n"
				+ "(1, 'New Destination: Kyoto, Japan', '6h ago'),\n"
				+ "(2, 'New Attraction: Golden Pavilion', '2h ago'),\n"
				+ "(3, 'Local Event: Oia Sunset', '2 days ago'),\n"
				+ "(4, 'New Attraction: Amoudi Bay', '1 day ago');\n"
				+ "");

		// Insertar notificaciones
		executeSqlStatement(
				"INSERT INTO T_NOTIFICATION_user_notified (user_notified_username, notification_id) VALUES ('admin', 2), ('user', 1), ('user', 3), ('admin', 4), ('user', 2);\n"
						+ "");
		// Insertar lugares visitados
		// Insertar visitas de ejemplo para el usuario 'admin'
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, country_id) VALUES ('admin', 1);");
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, country_id) VALUES ('admin', 3);");
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, city_id) VALUES ('admin', 1);");
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, attraction_id) VALUES ('admin', 1);");

		// Insertar visitas de ejemplo para el usuario 'user'
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, country_id) VALUES ('user', 2);");
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, city_id) VALUES ('user', 2);");
		executeSqlStatement("INSERT INTO T_VISITED_PLACES (user_username, attraction_id) VALUES ('user', 2);");


	}

	/**
	 * Metodo para ejecutar una sentencia SQL.
	 * 
	 * @param sqlStatement Sentancia SQL.
	 */
	private void executeSqlStatement(String sqlStatement) {
		jdbcTemplate.execute(sqlStatement);
	}

	/**
	 * Metodo para crear o buscar un usuario en la base de datos.
	 * 
	 * @param username Usuario a buscar.
	 * @param email    Email a buscar.
	 * @param password Contraseña a buscar.
	 * @return Usuario encontrado.
	 */
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

	/**
	 * Metodo para insertar un usuario en la base de datos.
	 * 
	 * @param username Usuario.
	 * @param password Contraseña.
	 * @param email    Correo electrónico.
	 * @param locked   Estado de bloqueo.
	 * @param disabled Estado del usuario.
	 * @param imgUrl   Url a la imagen del perfil.
	 * @return Usuario insertado.
	 */
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

	/**
	 * Método para insertar un rol en la base de datos.
	 * 
	 * @param username Usuario al que se le agrega el ROL.
	 * @param rol      ROL que se agrega.
	 */
	private void insertarRol(String username, String rol) {
		executeSqlStatement("INSERT INTO t_user_role (username, role) VALUES ('" + username + "', '" + rol + "')");
	}
}
