create database sistema_marcaciones;
use sistema_marcaciones;

create table Usuario(
	codigoBiometrico int NOT NULL,
    cedula varchar(10),
    rol varchar(15),
    fechaNacimiento date,
    email varchar(50) NOT NULL,
    password varchar(20),
    fechaContrato date,
    nombres varchar(150),
    apellidos varchar(150),
    genero varchar(1),
    PRIMARY KEY(codigoBiometrico)
);

create table Marcacion(
	idMarcacion int NOT NULL AUTO_INCREMENT,
    codigoBiometrico int NOT NULL,
    fecha date NOT NULL,
    horaEntrada time,
    horaSalida time,
    publicado boolean DEFAULT false,
    PRIMARY KEY(idMarcacion),
    FOREIGN KEY (codigoBiometrico) REFERENCES Usuario(codigoBiometrico)
);

create table TipoJustificacion(
	idTipo int NOT NULL AUTO_INCREMENT,
    descripcion varchar(500),
    usuarioModificador int,
    fechaIngreso date,
    fechaUltimaModificacion date,
    PRIMARY KEY(idTipo),
    FOREIGN KEY (usuarioModificador) REFERENCES Usuario(codigoBiometrico)
);

create table Inconsistencia(
	idInconsistencia int NOT NULL AUTO_INCREMENT,
    idMarcacion int NOT NULL,
    estado varchar(15) DEFAULT 'NJ',
    idTipo int NOT NULL,
    PRIMARY KEY(idInconsistencia),
    FOREIGN KEY (idMarcacion) REFERENCES Marcacion(idMarcacion),
    FOREIGN KEY (idTipo) REFERENCES TipoJustificacion(idTipo)
);



#DATOS DE PRUEBA
insert into Usuario (codigoBiometrico,cedula,rol,fechaNacimiento,email,fechaContrato,password,nombres,apellidos,genero) values (1,'0123456789','ADMIN','1982-09-15','admin@micabal.com','2016-05-20','xyz','John','Doe','M');
insert into Usuario (codigoBiometrico,cedula,rol,fechaNacimiento,email,fechaContrato,password,nombres,apellidos,genero) values (2,'1123456789','USER','1980-02-02','user@micabal.com','2020-10-06','xyz1','Jane','Doe','F');

insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (1,'2023-09-26','07:57:20','18:06:15');
insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (1,'2023-09-27','09:36:02','18:56:50');

insert into TipoJustificacion (descripcion,usuarioModificador) values ('Asunto familiar',1);
insert into TipoJustificacion (descripcion,usuarioModificador) values ('Cita médica',1);

insert into Inconsistencia (idMarcacion,idTipo) values (1,1);
insert into Inconsistencia (idMarcacion,estado,idTipo) values (2,'P',2);

select * from Inconsistencia;