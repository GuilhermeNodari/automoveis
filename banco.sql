CREATE DATABASE `lista_automoveis`;

CREATE TABLE `automoveis` (
  `id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `descricao` varchar(60) NOT NULL,
  `placa` char(7) NOT NULL,
  `renavan` varchar(11) NOT NULL,
  `ano_modelo` int(4) NOT NULL,
  `ano_fabricacao` int(4) NOT NULL,
  `cor` varchar(20) NOT NULL,
  `km` int(6) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `preco` decimal(14,2) NOT NULL,
  `preco_fipe` decimal(14,2) NOT NULL
);

CREATE TABLE `componentes` (
  `id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `componentes` varchar(200) NULL
);

CREATE TABLE `automoveis_componentes` (
  `id_automovel` INT(11) NOT NULL,
  FOREIGN KEY (`id_automovel`) REFERENCES `automoveis`(`id`),
  `id_componente` INT(11) NOT NULL,
  FOREIGN KEY (`id_componente`) REFERENCES `componentes`(`id`)
);