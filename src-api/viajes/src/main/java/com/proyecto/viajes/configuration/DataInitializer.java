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
		insertarUsuario("sudo", "sudo", "sudo@sudo.com", false, false, "root-user.png");
		insertarRol("admin", "ADMIN");
		insertarRol("user", "CUSTOMER");
		insertarRol("sudo", "CUSTOMER");
		insertarRol("sudo", "ADMIN");

		// Insertar países de prueba
		executeSqlStatement(
				"INSERT INTO t_country (img_Url, capital, population, country, country_Code, currency_Code, currency_Symbol, language_Code, info) \n"
						+ "VALUES \n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png', 'Madrid', 4700000, 'España', 'ES', 'EUR', '€', 'es', 'España es un país ubicado en Europa occidental'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png', 'Washington D.C.', 7000000, 'Estados Unidos', 'US', 'USD', '$', 'en', 'Estados Unidos es una república federal constitucional en América del Norte'),\n"
						+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/800px-Flag_of_Colombia.svg.png', 'Bogotá', 8600000, 'Colombia', 'CO', 'COP', '$', 'es', 'Colombia es una república en América del Sur');\n"
						+ "");

		// Insertar ciudades de prueba con URLs de prueba
		executeSqlStatement("INSERT INTO T_CITY (img_Url, population, state ,city, airport_code, country_id, info) \n"
				+ "VALUES \n"
				+ "('https://a.cdn-hotels.com/gdcs/production133/d1207/7ad2d7f0-68ce-11e8-8a0f-0242ac11000c.jpg?impolicy=fcrop&w=800&h=533&q=medium', 3000000, 'Comunidad de Madrid', 'Madrid', 'MAD', 1, 'Madrid es la capital de España y una de las ciudades más grandes de Europa'),\n"
				+ "('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Seal_of_the_District_of_Columbia.svg/1200px-Seal_of_the_District_of_Columbia.svg.png', 8800000, 'Distrito de Columbia', 'Washington D.C.', 'DCA', 2, 'Washington D.C. es la capital de los Estados Unidos y el centro político del país'),\n"
				+ "('https://regiones.prisamedia.co/wp-content/uploads/elementor/thumbs/GettyImages-1410364139-scaled-q7751ozpu2jxayci9zbf1wk1yv1tx6kyqt08jjba6w.jpg', 7400000, 'Departamento de Cundinamarca', 'Bogotá', 'BOG', 3, 'Bogotá es la capital de Colombia y la ciudad más grande del país');\n"
				+ "");

		// Insertar atracciones de prueba con URLs de prueba
		executeSqlStatement("INSERT INTO t_attraction (img_Url, attraction, info, city_id, category, price) VALUES \n"
				+ "('https://imagenes.elpais.com/resizer/aF_mNTYUzJPggYcxQfl1N0vFcDw=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/UZ5J2W3XBVG4ZOT52PU3UJKT4A.png', 'Museo del Prado', 'Museos de arte más importantes del mundo', 1, 'MUSEUM', '20'),\n"
				+ "('https://upload.wikimedia.org/wikipedia/commons/8/80/Lincoln_statue%2C_Lincoln_Memorial.jpg', 'Monumento a Lincoln', 'Monumento conmemorativo.', 2, 'LANDMARK', '5'),\n"
				+ "('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/8e/65/b9/caption.jpg?w=1200&h=-1&s=1', 'Museo del Oro', 'Museo ubicado en Bogotá', 3, 'MUSEUM', '30');\n"
				+ "");

		executeSqlStatement("INSERT INTO t_attraction (img_Url, attraction, info, city_id, category) VALUES \n"
				+ "('https://assets.buendiatours.com/s3fs-public/styles/highlight_large/public/2021-03/vista-area-catedral-sevilla-guia-viaje-buendiatours.jpg.webp?VersionId=KKEluqtl1ZYJZghaN8aMLdNCmhxshFKS&itok=lFzk9Dsc', 'Catedral de Sevilla', 'Catedral gótica más grande del mundo', 1, 'CHURCH'),\n"
				+ "('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/6a/30/c5/fabulosa-arquitectura.jpg?w=1200&h=-1&s=1', 'Parque de María Luisa', 'Famoso parque público en Sevilla', 1, 'NATIONAL_PARK');\n"
				+ "");

		// Insertar notificaciones
		executeSqlStatement("INSERT INTO T_NOTIFICATION (title, time_ago)\n" + "VALUES \n"
				+ "('New Destination: Kyoto, Japan', '6h ago'),\n"
				+ "('New Attraction: Golden Pavilion', '2h ago'),\n"
				+ "('Local Event: Oia Sunset', '2 days ago'),\n"
				+ "('New Attraction: Amoudi Bay', '1 day ago');\n" + "");

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
