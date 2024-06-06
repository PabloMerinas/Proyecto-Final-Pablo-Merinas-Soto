package com.proyecto.viajes.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.services.implement.UserManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las operaciones relacionadas con
 * los archivos.
 */
@RestController
@RequestMapping("/v1/file")
@AllArgsConstructor
public class FileRestController {

	/**
	 * Inicializo el LOGGER con Slf4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(FileRestController.class);

	/**
	 * Inyección de dependencia de UserManagementImpl.
	 */
	private UserManagementImpl userRepository;

	/**
	 * Endpoint para obtener la imagen de perfil de un usuario por su nombre de
	 * usuario. Se requiere que el usuario tenga el rol "ROLE_CUSTOMER" o
	 * "ROLE_ADMIN".
	 * 
	 * @param username Usuario.
	 * @return la imagen de perfil del usuario como un recurso ByteArrayResource.
	 */
	@GetMapping(value = "/getProfileImageByUsername", produces = MediaType.IMAGE_PNG_VALUE)
	public ResponseEntity<Resource> getProfileImageByUsername(@RequestParam String username) {
	    try {
	        String imgUrl = userRepository.findByUsername(username).map(UserEntity::getImgUrl).orElse("default.png");
	        if (imgUrl.equals(""))
	            imgUrl = "default.png";

	        String userHome = System.getProperty("user.home");
	        String imagePathString = userHome + File.separator + "profile-images" + File.separator + imgUrl;
	        Path imagePath = Paths.get(imagePathString);

	        LOGGER.info("Buscando imagen de perfil para el usuario {} en la siguiente ruta: {}", username, imagePathString);

	        if (Files.exists(imagePath)) {
	            byte[] imageBytes = Files.readAllBytes(imagePath);
	            ByteArrayResource resource = new ByteArrayResource(imageBytes);

	            HttpHeaders headers = new HttpHeaders();
	            headers.setContentType(MediaType.IMAGE_PNG);
	            return ResponseEntity.ok().headers(headers).contentLength(imageBytes.length).body(resource);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (IOException e) {
	        LOGGER.error("Error al intentar recuperar la imagen de perfil para el usuario: {}. Detalles: {}", username, e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}  


	/**
	 * Endpoint para cargar una imagen de perfil a un usuario por su nombre de
	 * usuario. Se requiere que el usuario tenga el rol "ROLE_CUSTOMER" o
	 * "ROLE_ADMIN".
	 * 
	 * @param file Archivo subido.
	 * @return Mensaje indicando el resultado.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@PostMapping(value = "/uploadProfileImageToUseraname")
	public ResponseEntity<String> uploadProfileImageToUseraname(@RequestParam("file") MultipartFile file,
			@RequestParam String username) {
		try {
			// Verifica si el archivo es nulo o vacío
			if (file.isEmpty()) {
				LOGGER.error("Archivo vacío enviado para el usuario: {}", username);
				return ResponseEntity.badRequest().body("Archivo vacío");
			}

			// Guarda el archivo en el servidor
			String fileName = file.getOriginalFilename();
			if (fileName != null) {
				fileName = StringUtils.cleanPath(fileName);
			}
	        String userHome = System.getProperty("user.home");
	        String uploadDir = userHome + File.separator + "profile-images";
	        Path uploadPath = Paths.get(uploadDir);

			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}

			saveImage(file, fileName, uploadPath);

			// Actualiza la URL de la imagen en la base de datos
			UserEntity user = userRepository.findByUsername(username)
					.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

			user.setImgUrl(fileName);
			userRepository.save(user);

			LOGGER.info("Imagen de perfil subida exitosamente para el usuario: {}", username);
			return ResponseEntity.ok().body("Imagen subida exitosamente");
		} catch (Exception e) {
			LOGGER.error("Error al procesar la solicitud de carga de imagen de perfil para el usuario: {}", username);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la solicitud");
		}
	}

	/**
	 * Guarda la imagen.
	 * 
	 * @param file       Archivo que guarda.
	 * @param fileName   Nombre del archivo.
	 * @param uploadPath Path donde se guarda.
	 * @return Repsuesta.
	 */
	private ResponseEntity<String> saveImage(MultipartFile file, String fileName, Path uploadPath) {
		try (InputStream inputStream = file.getInputStream()) {
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ex) {
			LOGGER.error("Error al subir el archivo de imagen de perfil: {}", ex.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
		}
		return null;
	}

}
