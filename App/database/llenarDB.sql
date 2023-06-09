--Creando el hotel.
INSERT INTO hotel (k_idhotel,t_aforo,q_diasdescuento,t_descuento) VALUES (1,0.8,3,0.13);

--Adicionando tipos de habitacion.
INSERT INTO tipo (k_tipo,q_valornoche,o_descripcion) VALUES ('P','45000','Habitacion simple con un baño y una cama');
INSERT INTO tipo (k_tipo,q_valornoche,o_descripcion) VALUES ('M','75000','Habitacion doble con un baño y dos camas, cuenta con una sala de estar');
INSERT INTO tipo (k_tipo,q_valornoche,o_descripcion) VALUES ('G','100000','Habitacion grande que cuenta con dos baños, 4 camas y una sala de estar');

--Adicionando habitaciones.
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (-100,1,'P');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (101,1,'M');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (102,1,'G');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (103,1,'G');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (200,1,'P');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (201,1,'P');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (202,1,'M');
INSERT INTO habitacion (k_numhabitacion, k_idhotel, k_tipohab) VALUES (203,1,'G');

--Creando Cliente
INSERT INTO cliente (k_idcliente,k_tipo,n_nombre1,n_apellido1,n_nombre2,n_apellido2,o_telefono) VALUES (20211020084,'CC','Hemerson','Ballen','','','3118853582');
INSERT INTO cliente (k_idcliente,k_tipo,n_nombre1,n_apellido1,n_nombre2,n_apellido2,o_telefono) VALUES (20211020071,'CC','Steven','Zabala','Andruew','','3182707854');



--Añadiendo Reserva
INSERT INTO reserva (k_idcliente,k_tipoid,k_numhabitacion,i_estado,f_inicio,q_numnoches,q_numpersonas,f_reserva) VALUES (20211020084,'CC',100,'P','2023-05-20T03:10:00.000Z',2,3,'2023-05-16T22:17:42.437Z');
INSERT INTO reserva (k_idcliente,k_tipoid,k_numhabitacion,i_estado,f_inicio,q_numnoches,q_numpersonas,f_reserva) VALUES (20211020071,'CC',100,'P','2023-05-31T03:10:00.000Z',5,2,'2023-05-13T22:17:42.437Z');


