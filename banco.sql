CREATE DATABASE IF NOT EXISTS tablord;

USE tablord;

CREATE TABLE jogador(
	id int primary key auto_increment,
	nick varchar(25) not null unique,
	login varchar(25) not null unique,
	senha varchar(100) not null,
	token varchar(100),
	nivel int not null default 0,
	experiencia int not null default 0,
	status tinyint(1) not null default 0
);