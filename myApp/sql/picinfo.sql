-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2016 at 03:53 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `time_manage`
--

-- --------------------------------------------------------

--
-- Table structure for table `picinfo`
--

CREATE TABLE `picinfo` (
  `picid` int(11) NOT NULL,
  `url` varchar(88) COLLATE utf8_bin NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `type` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'background',
  `status` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `picinfo`
--

INSERT INTO `picinfo` (`picid`, `url`, `name`, `type`, `status`) VALUES
(1, 'images/bulb.png', 'bulb', 'background', 'active'),
(2, 'images/cloud.png', 'cloud', 'background', 'active'),
(3, 'images/earth.png', 'earth', 'background', 'active'),
(4, 'images/handler.png', 'handler', 'background', 'active'),
(5, 'images/ink1.png', 'ink', 'background', 'active'),
(6, 'images/ink2.png', 'ink', 'background', 'active'),
(7, 'images/ink3.png', 'ink', 'background', 'active'),
(8, 'images/ink4.png', 'ink', 'background', 'active'),
(9, 'images/logo_leaf.png', 'leaf', 'background', 'active'),
(10, 'images/moon.png', 'moon', 'background', 'active'),
(11, 'images/next.png', 'next', 'background', 'active'),
(12, 'images/note.png', 'note', 'background', 'active'),
(13, 'images/pin.png', 'pin', 'background', 'active'),
(14, 'images/planet.png', 'planet', 'background', 'active'),
(15, 'images/poem.png', 'poem', 'background', 'active'),
(16, 'images/poet.png', 'poet', 'background', 'active'),
(17, 'images/pole.png', 'pole', 'background', 'active'),
(18, 'images/prev.png', 'previous', 'background', 'active'),
(19, 'images/rabit.png', 'rabbit', 'background', 'active'),
(20, 'images/shadow.png', 'shadow', 'background', 'active'),
(21, 'images/under_bg.png', 'cover', 'background', 'active'),
(22, 'images/water.png', 'water', 'background', 'active'),
(23, 'images/pictures/bg1.jpg', 'cartoon', 'ball', 'active'),
(24, 'images/pictures/bg2.jpg', 'sakura', 'ball', 'active'),
(25, 'images/pictures/bg3.jpg', 'lamp', 'ball', 'active'),
(26, 'images/pictures/photo1.jpg', 'Neimeng', 'album', 'active'),
(27, 'images/pictures/photo2.jpg', 'Neimeng', 'album', 'active'),
(28, 'images/pictures/photo3.jpg', 'Neimeng', 'album', 'active'),
(29, 'images/pictures/photo4.jpg', 'Yuquan', 'album', 'active'),
(30, 'images/pictures/photo5.jpg', 'formal', 'album', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `picinfo`
--
ALTER TABLE `picinfo`
  ADD PRIMARY KEY (`picid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `picinfo`
--
ALTER TABLE `picinfo`
  MODIFY `picid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
