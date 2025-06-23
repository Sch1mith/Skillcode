-- node na porta 80

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/04/2025 às 22:37
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

CREATE DATABASE IF NOT EXISTS skillcode;
USE skillcode;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `pontuacao_junior` int(11) DEFAULT 0,
  `pontuacao_pleno` int(11) DEFAULT 0,
  `pontuacao_senior` int(11) DEFAULT 0,
  `pontuacao` int(11) GENERATED ALWAYS AS (`pontuacao_junior` + `pontuacao_pleno` + `pontuacao_senior`) STORED,
  `senha` char(64) DEFAULT NULL, -- SHA-256 tem 64 caracteres em hexadecimal
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estrutura para tabela `amizades`
--
CREATE TABLE IF NOT EXISTS `amizades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `amigo_id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT 'pendente',
  `data_solicitacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`amigo_id`) REFERENCES `usuarios`(`id`),
  CONSTRAINT unique_amizade UNIQUE (`usuario_id`, `amigo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dados de exemplo para tabela `usuarios`
INSERT INTO `usuarios` (`email`, `login`, `nome`, `pontuacao_junior`, `pontuacao_pleno`, `pontuacao_senior`, `senha`) VALUES
('alice@email.com', 'alice', 'Alice Silva', 400, 500, 300, SHA2('senha123', 256)),
('bob@email.com', 'bob', 'Bob Souza', 300, 400, 250, SHA2('senha456', 256)),
('carol@email.com', 'carol', 'Carol Lima', 200, 300, 300, SHA2('senha789', 256)),
('daniel@email.com', 'daniel', 'Daniel Costa', 500, 600, 400, SHA2('senha321', 256)),
('eva@email.com', 'eva', 'Eva Rocha', 350, 400, 350, SHA2('senha654', 256)),
('felipe@email.com', 'felipe', 'Felipe Alves', 200, 300, 200, SHA2('senha987', 256)),
('giovanna@email.com', 'giovanna', 'Giovanna Dias', 400, 500, 400, SHA2('senha147', 256)),
('henrique@email.com', 'henrique', 'Henrique Melo', 300, 300, 300, SHA2('senha258', 256)),
('isabela@email.com', 'isabela', 'Isabela Pires', 350, 350, 350, SHA2('senha369', 256)),
('joao@email.com', 'joao', 'João Martins', 500, 500, 400, SHA2('senha159', 256));

-- Dados de exemplo para tabela `amizades`
INSERT INTO `amizades` (`usuario_id`, `amigo_id`, `status`) VALUES
(1, 2, 'aceito'),
(1, 3, 'aceito'),
(2, 4, 'pendente'),
(5, 1, 'aceito'),
(6, 7, 'pendente');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;