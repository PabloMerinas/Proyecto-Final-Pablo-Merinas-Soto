# Viajes EasyTravels 
#### Curso Escolar 2023-2024
#### Autor: Pablo Merinas Soto
#### Tutor: [Antonio Gabriel González Casado(Enlace a su cuenta de GitHub)](https://github.com/antonio-gabriel-gonzalez-casado)
#### Fecha de Inicio: 01-10-2023
#### Fecha de Finalización: 30-06-2024

## Breve descripción del proyecto
Este proyecto tiene como objetivo desarrollar una aplicación web que permita a los usuarios llevar un registro de los países, ciudades y atracciones que han visitado. La aplicación ofrecerá funcionalidades para añadir nuevos lugares visitados, visualizar una lista de todos los lugares registrados y acceder a información detallada de cada uno de ellos. De esta manera, la aplicación servirá como un diario de viajes personal, permitiendo a los usuarios llevar un seguimiento de sus experiencias de viaje y compartir información útil sobre los destinos visitados.

## Objetivo de la aplicación
- **¿Qué va a hacer la aplicación?** La aplicación permitirá a los usuarios crear y gestionar una lista personalizada de países, ciudades y atracciones que han visitado, proporcionando información relevante y experiencias personales sobre cada lugar.
- **¿Cuál es su atractivo principal?** El atractivo principal de la aplicación es la posibilidad de llevar un registro organizado de los viajes realizados, facilitando la recopilación de recuerdos y experiencias de viaje en un solo lugar.
- **¿Qué problema concreto va a resolver?** Resolverá el problema de mantener un seguimiento ordenado y accesible de los lugares visitados, evitando la dispersión de información y recuerdos en diferentes plataformas o medios físicos.
- **¿Qué necesidad va a cubrir?** Cubrirá la necesidad de los viajeros de documentar sus viajes de manera detallada y estructurada, permitiendo un fácil acceso a sus recuerdos y recomendaciones de viaje.

## Estructura del Proyecto
El repositorio del proyecto está organizado de la siguiente manera para facilitar su comprensión y manejo:

- **src-api:** Contiene el código fuente de la API REST desarrollada con Spring Boot, encargada de gestionar las operaciones relacionadas con los usuarios, países, ciudades y atracciones. La API interactúa con una base de datos para almacenar y recuperar la información necesaria.
  - `pom.xml`: Archivo de configuración de Maven para la gestión de dependencias y construcción del proyecto.
  - `MainApp`: Clase principal que inicia la aplicación Spring Boot.
  - `DataInitializer`: Clase encargada de inicializar datos de prueba en la base de datos.
  - `UserRestController`: Controlador REST para la gestión de usuarios.
  - `application.properties`: Archivo de configuración de la aplicación.
  
- **src-frontend:** Contiene el código fuente del frontend desarrollado con React, proporcionando una interfaz de usuario amigable para interactuar con la aplicación.
  - `index.html`: Archivo HTML principal que sirve como punto de entrada para la aplicación frontend.
  - `App.js`: Componente principal de React que define la estructura de navegación de la aplicación.
  - `README.md`: Documentación con instrucciones para ejecutar y desplegar el frontend.
  
- **docs:** Directorio destinado a contener la documentación del proyecto, incluyendo especificaciones técnicas, diseño de la base de datos y manuales de usuario.
  - `README.md`: Archivo de texto que proporciona una visión general del proyecto, incluyendo su descripción, objetivos, y estructura del repositorio.

## Usuarios
La aplicación contará con dos tipos de usuarios:

1. **Usuarios CUSTOMER:** Estos usuarios podrán utilizar la aplicación para llevar un registro de sus viajes, añadir nuevos lugares visitados, visualizar su historial de viajes y acceder a información detallada de los lugares.
   
2. **Usuarios ADMIN:** Además de tener todas las funcionalidades de los usuarios CUSTOMER, los usuarios ADMIN tendrán privilegios adicionales para gestionar todo el sistema. Podrán administrar usuarios, países, ciudades y atracciones, realizar operaciones de mantenimiento en la base de datos y gestionar el contenido global de la aplicación.