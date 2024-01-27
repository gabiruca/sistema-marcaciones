create database sistema_marcaciones;
use sistema_marcaciones;

create table Usuario(
	codigoBiometrico int NOT NULL,
    cedula varchar(10),
    rol varchar(15),
    fechaNacimiento date,
    email varchar(50) NOT NULL,
    password varchar(100),
    fechaContrato date,
    nombres varchar(150),
    apellidos varchar(150),
    genero varchar(1),
    nombreimg varchar(150),
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
	idTipo int AUTO_INCREMENT,
    descripcion varchar(500),
    codigoBiometrico int,
    fechaIngreso date,
    fechaUltimaModificacion date,
    PRIMARY KEY(idTipo),
    FOREIGN KEY (codigoBiometrico) REFERENCES Usuario(codigoBiometrico)
);

create table Inconsistencia(
	idInconsistencia int NOT NULL AUTO_INCREMENT,
    idMarcacion int NOT NULL,
    estado varchar(1) DEFAULT 'P',
    idTipo int NOT NULL,
    PRIMARY KEY(idInconsistencia),
    FOREIGN KEY (idMarcacion) REFERENCES Marcacion(idMarcacion),
    FOREIGN KEY (idTipo) REFERENCES TipoJustificacion(idTipo)
);



#DATOS DE PRUEBA
insert into Usuario (codigoBiometrico,cedula,rol,fechaNacimiento,email,fechaContrato,password,nombres,apellidos,genero) values (1,'0000000000','ADMIN','1991-05-23','admin@micabal.com','1991-05-23','pbkdf2_sha256$600000$wfMfJkhC8tBRYpm6mrf4Dq$DF2es21kXS7JA1q5nHD1g+sS2DaKRpgVtOUh4fYZSXA=','Administrador','','');
insert into Usuario (codigoBiometrico,cedula,rol,fechaNacimiento,email,fechaContrato,password,nombres,apellidos,genero) values (2,'1123456789','USER','1980-02-02','user@micabal.com','2020-10-06','pbkdf2_sha256$600000$jID5MjmFcaEGTYtdlkvJK5$LjENM9Zlw2O/+TJ73s2vtjFPGGY1ZY0NNrmb/SuIYiI=','Jane','Doe','F');
insert into Usuario (codigoBiometrico,cedula,rol,fechaNacimiento,email,fechaContrato,password,nombres,apellidos,genero) values (3,'0123456788','USER','1994-01-05','user1@micabal.com','2019-12-10','xypbkdf2_sha256$600000$NOX64lb6tuSxuggd69lSGJ$S1RRfgQKIXFHsF1iBWmNjAqxLX6kmNUPGPH27AeHu3E=z','Dylan','Perez','M');

insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (2,'2023-09-26','07:57:20','18:06:15');
insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (2,'2023-09-27','09:36:02','18:56:50');
insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (2,'2023-09-18','08:00:02','18:32:50');
insert into Marcacion (codigoBiometrico,fecha,horaEntrada,horaSalida) values (3,'2023-09-19','09:00:02','18:15:50');


select * from Usuario;