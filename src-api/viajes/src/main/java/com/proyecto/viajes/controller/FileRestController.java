package com.proyecto.viajes.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.IOUtils;
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

@RestController
@RequestMapping("/v1/file")
@AllArgsConstructor
public class FileRestController {

	private UserManagementImpl userRepository;

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping(value = "/getProfileImageByUsername", produces = MediaType.IMAGE_PNG_VALUE)
	public ResponseEntity<Resource> getProfileImageByUsername(@RequestParam String username) {
	    try {
	        String imgUrl = userRepository.findByUsername(username)
	                .map(UserEntity::getImgUrl)
	                .orElse("default.png");
	        if(imgUrl.equals("")) imgUrl = "default.png";
	        
	        InputStream imageStream = getClass().getResourceAsStream("/profile-images/" + imgUrl);

	        if (imageStream != null) {
	            byte[] imageBytes = IOUtils.toByteArray(imageStream);
	            ByteArrayResource resource = new ByteArrayResource(imageBytes);

	            HttpHeaders headers = new HttpHeaders();
	            headers.setContentType(MediaType.IMAGE_PNG);
	            return ResponseEntity.ok()
	                    .headers(headers)
	                    .contentLength(imageBytes.length)
	                    .body(resource);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@PostMapping(value = "/uploadProfileImageToUseraname")
	public ResponseEntity<String> uploadProfileImageToUseraname(@RequestParam("file") MultipartFile file, @RequestParam String username) {
	    try {
	        // Verifica si el archivo es nulo o vacío
	        if (file.isEmpty()) {
	            return ResponseEntity.badRequest().body("Archivo vacío");
	        }

	        // Guarda el archivo en el servidor
	        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	        String uploadDir = "./src/main/resources/profile-images";
	        Path uploadPath = Paths.get(uploadDir);

	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        try (InputStream inputStream = file.getInputStream()) {
	            Path filePath = uploadPath.resolve(fileName);
	            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
	        } catch (IOException ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
	        }

	        // Actualiza la URL de la imagen en la base de datos
	        UserEntity user = userRepository.findByUsername(username)
	                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	        user.setImgUrl(fileName);
	        userRepository.save(user);

	        return ResponseEntity.ok().body("Imagen subida exitosamente");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la solicitud");
	    }
	}

}
