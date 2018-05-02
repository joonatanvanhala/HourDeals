-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02.05.2018 klo 17:08
-- Palvelimen versio: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hourdeals`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `businessusers`
--

CREATE TABLE `businessusers` (
  `companyID` int(11) NOT NULL,
  `CompanyName` varchar(32) NOT NULL,
  `City` varchar(32) NOT NULL,
  `Address` varchar(32) NOT NULL,
  `PostCode` varchar(10) NOT NULL,
  `CompanyPassword` varchar(30) NOT NULL,
  `Ytunnus` varchar(9) NOT NULL,
  `Email` varchar(80) NOT NULL,
  `UserName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `businessusers`
--

INSERT INTO `businessusers` (`companyID`, `CompanyName`, `City`, `Address`, `PostCode`, `CompanyPassword`, `Ytunnus`, `Email`, `UserName`) VALUES
(14, 'Joonatan', 'Turku', 'Kellonsoittajankatu', '20500', 'joonatan', '', '', ''),
(35, '123', 'turku', 'Kellonsoittajankatu 3 B 30', '20500', '123', '', '', ''),
(40, '1996', 'turku', 'Kellonsoittajankatu 3 B 30', '20500', '1', '123456789', 'joonatan.vanhala@edu.turkuamk.fi', ''),
(41, 'testi', 'turku', 'Uudenmaankatu', '20500', '12345', '123456789', 'joonatan.vanhala@edu.turkuamk.fi', ''),
(42, '1996', 'turku', 'Kellonsoittajankatu 3 B 30', '20500', '12345', '1234567-8', 'joonatan.vanhala@edu.turkuamk.fi', ''),
(43, '123', '123', '123', '123', '12345', '123456789', 'joonatan.vanhala@edu.turkuamk.fi', ''),
(44, '1996', 'turku', 'Kellonsoittajankatu 3 B 30', '20500', '12345', '123456789', 'joonatan.vanhala@edu.turkuamk.fi', ''),
(45, 'testi1234', 'turku', 'Uudenmaankatu', '20500', '12345', 'testi1234', 'joonatan.vanhala@edu.turkuamk.fi', '1234'),
(46, 'testi', 'turku', 'Uudenmaankatu', '20500', '12345', '1234567-8', 'joonatan.vanhala@edu.turkuamk.fi', 'testi');

-- --------------------------------------------------------

--
-- Rakenne taululle `customers`
--

CREATE TABLE `customers` (
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Rakenne taululle `employees`
--

CREATE TABLE `employees` (
  `UserID` int(11) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `Title` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Rakenne taululle `offercategory`
--

CREATE TABLE `offercategory` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `offercategory`
--

INSERT INTO `offercategory` (`CategoryID`, `CategoryName`) VALUES
(1, 'Ruoka ja juoma'),
(2, 'Elintarvikkeet'),
(3, 'Elektroniikka'),
(4, 'Vaatteet'),
(5, 'Autoilu'),
(6, 'Käyttötavarat'),
(7, 'Kauneus ja terveys'),
(8, 'Lelut'),
(9, 'Vapaa-aika');

-- --------------------------------------------------------

--
-- Rakenne taululle `offers`
--

CREATE TABLE `offers` (
  `OfferName` varchar(32) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Discount` decimal(5,4) NOT NULL,
  `OriginalPrice` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `OfferID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `offers`
--

INSERT INTO `offers` (`OfferName`, `Quantity`, `Discount`, `OriginalPrice`, `CategoryID`, `Description`, `OfferID`) VALUES
('1', 123, '0.0100', 1, 2, '1', 20),
('2', 23, '0.0200', 2, 2, '2', 21),
('3', 3, '0.0300', 3, 2, '33', 22),
('4', 4, '0.0400', 4, 2, '4', 23),
('123', 123, '0.1200', 123, 2, '123', 24),
('12', 123, '0.1200', 2, 2, '12123', 25),
('23', 123, '0.0200', 232, 2, '23', 26),
('sdfads', 12, '0.0200', 21, 2, 'ssdf', 27),
('21312', 12, '0.0200', 123, 2, 'fdasdfs', 28),
('sdfa', 12, '0.0200', 2, 2, 'sdf', 29),
('2', 2, '0.0200', 2, 2, '2', 30),
('123', 22, '0.0200', 2, 2, '123', 31),
('123', 2, '0.3200', 2, 2, '23', 32),
('123', 123, '0.1200', 12, 9, '123', 33),
('12323§§§', 123, '0.1200', 12, 7, '12321323', 34),
('123', 123, '0.1200', 12, 9, '123', 35),
('12323§§21312313123123', 12, '0.1200', 12, 8, '123123', 36),
('maito', 10, '0.1000', 12, 9, 'kevytmaito', 37);

-- --------------------------------------------------------

--
-- Rakenne taululle `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `UserPassword` varchar(20) NOT NULL,
  `EmailAddress` varchar(32) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Privilege` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `UserPassword`, `EmailAddress`, `PhoneNumber`, `Privilege`) VALUES
(0, 'S-Kauppa', '1234', 'SKauppa@gmail.com', '0443143200', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businessusers`
--
ALTER TABLE `businessusers`
  ADD PRIMARY KEY (`companyID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `offercategory`
--
ALTER TABLE `offercategory`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`OfferID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businessusers`
--
ALTER TABLE `businessusers`
  MODIFY `companyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `OfferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Rajoitteet taululle `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `Employees_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Rajoitteet taululle `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `offercategory` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
