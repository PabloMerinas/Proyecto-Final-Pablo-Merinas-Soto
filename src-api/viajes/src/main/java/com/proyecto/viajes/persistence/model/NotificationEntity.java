package com.proyecto.viajes.persistence.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase NotificationEntity, representa las notificaciones del usuario.
 */
@Entity
@Table(name = "T_NOTIFICATION")
@Data
public class NotificationEntity {

	/**
	 * Id de notificacion.
	 */
	@Id
	private Long id;

	/**
	 * Titulo del a notificación
	 */
	private String title;

	/**
	 * Información del a notificación.
	 */
	private String info;

	/**
	 * Usuarios a los que se les ha enviado la notificación.
	 */
	@JsonIgnore
	@ManyToMany
	private List<UserEntity> userNotified;
}
