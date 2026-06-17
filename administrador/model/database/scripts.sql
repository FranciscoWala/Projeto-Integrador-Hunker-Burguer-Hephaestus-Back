create database db_honker_burger;

use db_honker_burger;

#criação das tabelas que apenas fornecen suas chaves extangeira

# criando tabela de ingredientes
create table tbl_ingrediente(
    id int not null auto_increment primary key,
    nome varchar(45) not null,
    foto varchar(250) not null,
    preco decimal(5,2) not null
);

# criando tabela de categoria
create table tbl_categoria(
	id int not null auto_increment primary key,
    categoria varchar(15)
);

# criando tabela de hamburguer
create table tbl_hamburguer(
	id int not null auto_increment primary key,
	nome varchar(45) not null,
    preco decimal(5,2) not null,
    foto varchar(250) not null,
    descricao text not null
);


# criando tabela de o usuarios 
create table tbl_usuario(
	id int not null auto_increment primary key,
	login varchar(150) not null,
    senha varchar(100) not null
);


# criando tabela intermediaria de ingrediente e hamburger
create table tbl_ingrediente_hamburger(
	id int not null auto_increment primary key,
	id_ingrediente int not null,
    id_hamburguer int not null,
	
    constraint FK_INGREDIENTEHAMBURGUER_INGREDIENTE
    foreign key (id_ingrediente) references tbl_ingrediente(id),
    
	constraint FK_INGREDIENTEHAMBURGUER_HAMBURGUER
    foreign key (id_hamburguer) references tbl_hamburguer(id)
    
);

# criando tabela intermediaria de categoria e hamburger
create table tbl_categoria_hamburguer(
	id int not null auto_increment primary key,
	id_hamburguer int not null,
    id_categoria int not null,
    
    constraint FK_CATEGORIAHAMBURGUER_CATEGORIA
    foreign key (id_categoria) references tbl_categoria(id),
    
    constraint FK_CATEGORIAHAMBURGUER_HAMBURGUER
    foreign key (id_hamburguer) references tbl_hamburguer(id)
);
show tables;