package com.proyecto.viajes.security;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

/**
 * Filtro de autorización para validar y cargar la autenticación del usuario a
 * partir del token JWT.
 */
@Component
@AllArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter {

	/**
	 * Utilidad para la generación y validaciones de tokens JWT.
	 */
	private final JwtUtils jwtUtil;

	/**
	 * 
	 */
	private final UserDetailsService userDetailsService;

	/**
	 * Método para realizar el filtrado de la solicitud HTTP y cargar la
	 * autenticación del usuario desde el token JWT.
	 *
	 * @param request     HttpServletRequest de la solicitud.
	 * @param response    HttpServletResponse de la respuesta.
	 * @param filterChain FilterChain para continuar con el siguiente filtro en la
	 *                    cadena.
	 * @throws ServletException Si se produce un error durante el procesamiento de
	 *                          la solicitud.
	 * @throws IOException      Si se produce un error de lectura o escritura.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException, java.io.IOException {
		// 1. Validar que sea un Header Authorization valido
		String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (authHeader == null || authHeader.isEmpty() || !authHeader.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}

		// 2. Validar que el JWT sea valido
		String jwt = authHeader.split(" ")[1].trim();

		if (!this.jwtUtil.isValid(jwt)) {
			filterChain.doFilter(request, response);
			return;
		}

		// 3. Cargar el usuario del UserDetailsService
		String username = this.jwtUtil.getUsername(jwt);
		User user = (User) this.userDetailsService.loadUserByUsername(username);

		// 4. Cargar al usuario en el contexto de seguridad.
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				user.getUsername(), user.getPassword(), user.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		filterChain.doFilter(request, response);
	}
}