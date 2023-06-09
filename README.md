# ReservasPostgreSQL
Se requería implementar una aplicación web con soporte de bases de datos relacional para administrar las reservas de un Hotel.

## Enunciado
Se requiere una aplicación para administrar las reservas de un hotel. El sistema tiene la informacion de las habitaciones, los huéspedes y las reservaciones. De una habitación el sistema conoce el tipo (simple, doble, triple), el numero de la habitación y el precio por noche. Si una habitación esta ocupada, se conoce la informacion del huésped que tomó la habitación. Una persona puede cancelar la habitación en cualquier momento dando su nombre o número y fecha de inicio.

## DER (diagrama de entidad relación)
Para entender la forma en que interactúan las entidades por medio de sus relaciones y los atributos que posee cada una 

## MR (Modelo relacional)
Este es un diagrama un poco mas complejo implementando las reglas de transformación

## Base de datos (PostgreSQL)
Se crea el Script de creación y llenado de datos [db](/App/database), para crear la base de datos inicialmente desde PgAdmin.

## Aplicación final 
Se usaron tecnologías como, Nodejs, Ejs (HTML), Js, css y boostrap para llegar a un resultado estético y poder conectar con el back-end y la base de datos fácilmente, siguiendo con las buenas prácticas de programación se implementa un modelo vista controlador.  
(Los datos de las tablas se traen directamente de la base de datos, realizando JOINS entre las tablas que se requiera)
* Mostrar reservas (Y cancelarlas)
  ![image](https://github.com/juandmurillo/ReservasPostgreSQL/assets/43784917/441af307-52b3-43e3-aa16-bb25aaec67ce)

* Crear un nuevo cliente 
  ![image](https://github.com/juandmurillo/ReservasPostgreSQL/assets/43784917/50b2ecba-0b52-493f-aad0-af0ef44a3ac3)

* Clientes registrados, acciones como crear reserva con un cliente registrado, eliminar un cliente, editar un cliente, y crear un nuevo cliente
  ![image](https://github.com/juandmurillo/ReservasPostgreSQL/assets/43784917/6bcd1812-6bf7-4637-80d4-b425ca8f8d22)
  
* Crear nueva reserva, segun la asignacion de la fecha, deja escoger solo entre las habitaciones que estan disponibles en ese intervalo
  ![image](https://github.com/juandmurillo/ReservasPostgreSQL/assets/43784917/2b0393db-ad25-4571-88d4-bf53bf660a8d)


