-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2019 at 01:21 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bta_baza`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback_grad`
--

CREATE TABLE `feedback_grad` (
  `id` int(11) NOT NULL,
  `grad_id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `rating` enum('1','2','3','4','5') COLLATE utf8_unicode_ci NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci NOT NULL,
  `datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_hotel`
--

CREATE TABLE `feedback_hotel` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `rating` enum('1','2','3','4','5') COLLATE utf8_unicode_ci NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci NOT NULL,
  `datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grad`
--

CREATE TABLE `grad` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` float(9,6) NOT NULL,
  `longitude` float(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grad`
--

INSERT INTO `grad` (`id`, `ime`, `opis`, `slika`, `latitude`, `longitude`) VALUES
(1, 'Berlin', 'Prestonica Njemacke', '', 0.000000, 0.000000);

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `grad_id` int(11) NOT NULL,
  `ime` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci NOT NULL,
  `latitude` float(9,6) NOT NULL,
  `longitude` float(9,6) NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `grad_id`, `ime`, `address`, `opis`, `latitude`, `longitude`, `url`) VALUES
(1, 1, 'Hotel Moskva', 'Berlinstrasse 22', 'Najbolji hotel sa 2 zvezdice u Berline', 0.000000, 0.000000, '');

-- --------------------------------------------------------

--
-- Table structure for table `komentari_grad`
--

CREATE TABLE `komentari_grad` (
  `id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `feedback_grad_id` int(11) NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `komentari_hotel`
--

CREATE TABLE `komentari_hotel` (
  `id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `feedback_hotel_id` int(11) NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ime` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `username`, `password`, `ime`, `prezime`, `admin`, `slika`) VALUES
(1, 'superadmin', 'password', 'Bojan', 'Bojanic', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `slike_hotela`
--

CREATE TABLE `slike_hotela` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `znamenitosti`
--

CREATE TABLE `znamenitosti` (
  `id` int(11) NOT NULL,
  `grad_id` int(11) NOT NULL,
  `naziv` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci NOT NULL,
  `latitude` float(9,6) NOT NULL,
  `longitude` float(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback_grad`
--
ALTER TABLE `feedback_grad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnici_id` (`korisnici_id`),
  ADD KEY `grad_id` (`grad_id`);

--
-- Indexes for table `feedback_hotel`
--
ALTER TABLE `feedback_hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`,`korisnici_id`),
  ADD KEY `korisnici_id` (`korisnici_id`);

--
-- Indexes for table `grad`
--
ALTER TABLE `grad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grad_id` (`grad_id`);

--
-- Indexes for table `komentari_grad`
--
ALTER TABLE `komentari_grad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_grad_id` (`feedback_grad_id`),
  ADD KEY `korisnici_id` (`korisnici_id`);

--
-- Indexes for table `komentari_hotel`
--
ALTER TABLE `komentari_hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnici_id` (`korisnici_id`,`feedback_hotel_id`),
  ADD KEY `feedback_hotel_id` (`feedback_hotel_id`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `slike_hotela`
--
ALTER TABLE `slike_hotela`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `znamenitosti`
--
ALTER TABLE `znamenitosti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grad_id` (`grad_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback_grad`
--
ALTER TABLE `feedback_grad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback_hotel`
--
ALTER TABLE `feedback_hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grad`
--
ALTER TABLE `grad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `komentari_grad`
--
ALTER TABLE `komentari_grad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `komentari_hotel`
--
ALTER TABLE `komentari_hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slike_hotela`
--
ALTER TABLE `slike_hotela`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `znamenitosti`
--
ALTER TABLE `znamenitosti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback_grad`
--
ALTER TABLE `feedback_grad`
  ADD CONSTRAINT `feedback_grad_ibfk_1` FOREIGN KEY (`korisnici_id`) REFERENCES `korisnici` (`id`),
  ADD CONSTRAINT `feedback_grad_ibfk_2` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`id`);

--
-- Constraints for table `feedback_hotel`
--
ALTER TABLE `feedback_hotel`
  ADD CONSTRAINT `feedback_hotel_ibfk_1` FOREIGN KEY (`korisnici_id`) REFERENCES `korisnici` (`id`),
  ADD CONSTRAINT `feedback_hotel_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`);

--
-- Constraints for table `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`id`);

--
-- Constraints for table `komentari_grad`
--
ALTER TABLE `komentari_grad`
  ADD CONSTRAINT `komentari_grad_ibfk_1` FOREIGN KEY (`feedback_grad_id`) REFERENCES `feedback_grad` (`id`),
  ADD CONSTRAINT `komentari_grad_ibfk_2` FOREIGN KEY (`korisnici_id`) REFERENCES `korisnici` (`id`);

--
-- Constraints for table `komentari_hotel`
--
ALTER TABLE `komentari_hotel`
  ADD CONSTRAINT `komentari_hotel_ibfk_1` FOREIGN KEY (`feedback_hotel_id`) REFERENCES `feedback_hotel` (`id`),
  ADD CONSTRAINT `komentari_hotel_ibfk_2` FOREIGN KEY (`korisnici_id`) REFERENCES `korisnici` (`id`);

--
-- Constraints for table `slike_hotela`
--
ALTER TABLE `slike_hotela`
  ADD CONSTRAINT `slike_hotela_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`);

--
-- Constraints for table `znamenitosti`
--
ALTER TABLE `znamenitosti`
  ADD CONSTRAINT `znamenitosti_ibfk_1` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
