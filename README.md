# Proyecto I de Bases de Datos II, S2-2020
# APP Alert Me

Este repo contiene el proyecto del curso Bases de Datos II del Tecnológico de Costa Rica.

El proyecto consiste en una aplicación móvil que pueda rastrear al usuario al registrar la posición GPS del mismo cada segundo en un cluster de Mongo, con la intención de poder servir de rastreador en caso de que el usuario transite por lugares peligrosos.

Se divide en 3 proyectos internos:
+ Un cluster de bases de [Mongo](https://www.mongodb.com) para alta disponibilidad y redundancia de datos, según pedido por la especificación del proyecto.
+ Una aplicación móvil hecha en [Ionic Angular](https://ionicframework.com) para registrar la ubicación GPS.
+ Una API hecha en [ExpressJS](https://expressjs.com) para conectar la aplicación móvil con el cluster de Mongo, así como servir una visualización de las rutas agregadas.

Dentro de las carpetas respectivas puede encontrar más información.
