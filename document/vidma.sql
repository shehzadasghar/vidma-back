-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 12:43 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vidma`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `conatct` int(2) NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `employer_id`, `employee_id`, `conatct`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(1, 9, 7, 2, 'fgfgg', 'fdfs', '2023-04-21 21:11:04.219000', '2023-04-21 21:11:04.219000'),
(2, 9, NULL, 1, 'fgfgg', 'fdfs', '2023-04-21 21:12:41.115000', '2023-04-21 21:12:41.115000'),
(3, 9, NULL, 1, 'fgfgg', 'fdfs', '2023-04-21 13:01:30.670000', '2023-04-21 13:01:30.670000'),
(5, 7, NULL, 1, 'gffggv', 'vffggvvgg', '2023-04-21 15:12:46.692000', '2023-04-21 15:12:46.692000'),
(6, 7, NULL, 1, 'effdct', 'gfdgggg', '2023-04-21 15:13:41.913000', '2023-04-21 15:13:41.913000'),
(7, 7, NULL, 1, 'vvvggvv', 'gggvvvg', '2023-04-21 15:14:45.161000', '2023-04-21 15:14:45.161000'),
(8, 0, 11, 2, 'vcdcfv', 'tgvhbvvg', '2023-04-21 15:15:58.498000', '2023-04-21 15:15:58.498000'),
(9, 0, 11, 2, 'heehrjhshsh', 'ehgehshehrr', '2023-04-21 15:23:00.722000', '2023-04-21 15:23:00.722000'),
(10, 7, NULL, 1, 'hddnxnx zvz ', 'xbzvvd zzbzbzv', '2023-04-21 15:23:39.434000', '2023-04-21 15:23:39.434000');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `billed_to` text NOT NULL,
  `address` text NOT NULL,
  `cost_per_hr` text NOT NULL,
  `no_of_hrs` text NOT NULL,
  `invoice_no` text NOT NULL,
  `due_date` text NOT NULL,
  `email` text NOT NULL,
  `service_id` int(11) NOT NULL,
  `terms` text NOT NULL,
  `status` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `pdf` text NOT NULL,
  `send` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `billed_to`, `address`, `cost_per_hr`, `no_of_hrs`, `invoice_no`, `due_date`, `email`, `service_id`, `terms`, `status`, `user_id`, `task_id`, `created_at`, `updated_at`, `pdf`, `send`) VALUES
(1, 'billed_to', 'address', '3', '1', '22', '2222/22/22', 'ree@wwe.com', 1, 'terms', 'status', 8, 4, '2023-05-03 03:27:47.268000', '2023-05-03 03:27:47.268000', '/resources/static/assets/uploads/invoices/07918519084404907.Wed May 03 2023 03.pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `employee_name` text NOT NULL,
  `employee_designation` text NOT NULL,
  `start_date` text NOT NULL,
  `end_date` text NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`id`, `employee_id`, `employer_id`, `employee_name`, `employee_designation`, `start_date`, `end_date`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 18, 7, 'dsdds', 'ssdws', '2021/05/21', '2021/05/21', 'description', 1, '2023-05-02 04:10:49.893000', '2023-05-02 04:10:49.893000');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `date_start` text NOT NULL,
  `date_end` text NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employee_name` text NOT NULL,
  `employee_designation` text NOT NULL,
  `time_start` text NOT NULL,
  `time_end` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `employer_id`, `date_start`, `date_end`, `employee_id`, `employee_name`, `employee_designation`, `time_start`, `time_end`) VALUES
(1, 4, '12-6-19', '12-3-22', 7, 'deaerf', 'cvbbrr', '10 am', '7 pm '),
(6, 7, '07-04-2023', '29-04-2023', 8, 'test', 'qwerty ', '9am', '6pm'),
(7, 7, '05-04-2023', '27-04-2023', 10, 'm ali', 'wrfgf', '9am', '6pm'),
(8, 7, '04-04-2023', '27-04-2023', 25, 'hello', 'fdgdgegeg', '9am', '6pm');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `description`, `created_at`, `updated_at`) VALUES
(1, 'jhkjhjk', '2023-05-03 02:21:45.077000', '2023-05-03 02:22:22.021000');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `array` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_id`, `employee_id`, `array`) VALUES
(6, 1, 7, '[{\"timein\":\"2023-05-01T22:39:21.133Z\",\"timeout\":\"2023-05-03T21:48:31.352Z\",\"break\":\"2129-12-29T20:00:19.016Z\",\"date\":\"2023-05-01T22:39:21.133Z\"},{\"timein\":\"2023-05-03T21:48:38.594Z\",\"timeout\":\"2023-05-03T21:48:52.429Z\",\"break\":\"null\",\"date\":\"2023-05-03T21:48:38.594Z\"},{\"timein\":\"2023-05-03T21:48:58.271Z\",\"timeout\":\"2023-05-03T21:57:24.876Z\",\"break\":\"null\",\"date\":\"2023-05-03T21:48:58.271Z\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Emp_Name` text NOT NULL,
  `Designation` text NOT NULL,
  `Phone_Number` int(11) NOT NULL,
  `Email` text NOT NULL,
  `Create_Password` text NOT NULL,
  `employer_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  `City` text NOT NULL,
  `State` text NOT NULL,
  `otp` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Emp_Name`, `Designation`, `Phone_Number`, `Email`, `Create_Password`, `employer_id`, `type`, `City`, `State`, `otp`) VALUES
(4, 'admin', 'admin', 2147483647, 'admin@gmail.com', '$2y$10$j1E9aHUlowE5GTBhSc1HLeqEsak9ocvkGB35UnwXo4XH1Eb1ADjlu', 0, 0, '', '', 0),
(7, 'aqib', 'dev', 24435442, 'rafayabdul0340@gmail.com', '$2a$12$5IpIUVQbsBhyxiz.h3PwHOSyRceTPIkj203YtDu.kU.cYA6LVPaAa', 0, 1, 'test', 'test', 4770),
(8, 'test', 'devel', 24435442, 'aqibakram.2000@gmail.com', '$2a$12$5.JDhLmPK8rDjsIRjSDflOxBHFsGUHkgC06Rjm8COEd1JwfN8bIsq', 7, 2, 'test', 'test', 6259),
(9, 'test', 'test', 655655655, 'test@test.com', '$2a$12$DKLddI3y02M3tyNZlqOa0OyUuoblcUpH3foLK3WukfRFyeKAqAz9O', 0, 1, 'test', 'test', 0),
(10, 'm ali', 'masdoor', 5464345, 'abc@gmail.com', '$2a$12$q/dWRSrBxkS1h.3bIzQPve7viUkRQheSzMeLN4wf89EsvhLibXpYi', 7, 2, 'karachi', 'sindh', 0),
(11, 'abc', 'mistarii', 123456789, 'ms@gmail.com', '$2a$12$SiWJ3JExHLO/viPgy7wHJO.EJhFrepmANDdgv36H23OFNxo9sucri', 0, 2, 'khi', 'pk', 0),
(12, 'abc', 'mistarii', 123456789, 'ms@gmail.com', '$2a$12$W6dMcg4ZC/3DDhps8Mqu3O4.zQgCMsSmXhD2CdoLRDqT9p7ksa0be', 0, 2, 'khi', 'pk', 0),
(13, 'mark', 'HR', 2147483647, 'cshehzadasghar@gmail.com', '$2a$12$KbzBOT04ssnBAYEEeOkdXeNt3IZ3sRF9OWgBxqqcdsKWwujERMqym', 0, 2, 'khi', 'pk', 7064),
(14, 'Shehzad', 'HR', 2147483647, 'cshehzadasghar2@gmail.com', '$2a$12$PJlaPcHPJ3Zx9XNudfViAueASC7VIew/svKzINSHARNdg/lCAPsRa', 0, 1, 'KHI', 'PK', 0),
(15, 'wewwe', 'asdasf', 546534, 'av@g.com', '$2a$12$oSzwk9Qznk8mBqZkV6Iipuhsn77Q9fwZ32IK8u0w4Kpo2/XIgBYZq', 0, 2, 'dlsadk', 'dkdsak;k', 0),
(16, 'aasds', 'asasd', 45452, 'a@a.co', '$2a$12$zinj74DXQW0jGnKq0ijuQuiQGQEVy9dK8DJQ2HDz/.zuxCncswR6K', 0, 2, 'ksjhjh', 'jhlhlh', 0),
(17, 'asdas', 'asdas', 456465534, 'qw@gmail.com', '$2a$12$fLofA/be4C9yNAaHystvPelFbaK5hPddCxXIjJtVHLrjlZcr2Z8dG', 0, 2, 'sdjklsd', 'sdakjdsk', 0),
(18, 'asdas', 'dssazcz', 534534, 'asd@gmail.com', '$2a$12$L4APYai4aDj2UjThVx5zOuPT71iX3.MPlotlXsYewpGNwknb9kGcm', 7, 2, 'dsasd', 'aslcnln', 0),
(19, 'gfgfgj', 'hjgjhgh', 4535431, 'cv@gmail.com', '$2a$12$oqadn8iaBF6E9COE4Ajb9.DY4zCX3dQjfh8UzrBR.DU0hoopbIz/W', 0, 2, 'khkkg', 'hghjgj', 0),
(20, 'wqdw', 'sada', 4652345, 'asdf@gmail.com', '$2a$12$ZqPDmGHDml/Q8Vbm8pM7z.96sNmBGh3sh7clqaQWhWsmz3qCkT6ZS', 0, 2, 'assdad', 'asdasf', 0),
(21, 'testttt', 'tttett', 57657656, 'testaqib@gmail.com', '$2a$12$lyFugNsIMLFid3.TTWessOCmXOsDGXdlE9e/YDy6cBXGRLOGRZKWG', 7, 2, 'hjh', 'jkhjkhj', 0),
(22, 'Mark', 'Manager', 2, 'mark@yopmail.com', '$2a$12$.1D3wa6ZyK06d0vacHR46e7qKtKbVsnc2nbgP3SbJfYnilwkD1Awi', 0, 1, 'New York', 'New York', 0),
(23, 'Anthony ', 'Designer', 72, 'anthony@yopmail.com', '$2a$12$qkM2Tgoh3KEI/m.yqRopmOjCpzB.HcQEupIgTsqB0j4AjNlcKKwcm', 0, 2, 'New York', 'New York ', 0),
(24, 'Jean Grey', 'Art Director ', 111222334, 'jean@yopmail.com', '$2a$12$1Nt7o7yGsD55opQi0tJoX.aaBEthVlMMf6ixQFQ5oAoCkIcE3lT2O', 0, 2, 'NY', 'NY', 0),
(25, 'hello', 'hello', 5665677, 'hello@gmail.com', '$2a$12$cfa0TsBzi3rrlGX53RaBb.JW0xuE9OvlnuVn9xSV7nxCoO5DvX186', 7, 2, 'test', 'test', 0),
(26, 'hjhh', 'bjbbb', 575677, 'ghj@ghj.com', '$2a$12$9H9MLBNMHrNZp1HSnOPDbeSOCMyZrxgKrFg1rLSOVDjmZsrdRdYAS', 7, 2, 'bbv', 'vbvv', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(14) NOT NULL,
  `image` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `state` text NOT NULL,
  `city` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `name`, `email`, `number`, `image`, `created_at`, `updated_at`, `state`, `city`) VALUES
(2, 5, 'mishaa', 'nisharashidofficial@gmail.com', '4565365353', '/resources/static/assets/uploads/profiles/26356c1c4e837a026363c66e5676e255.gif', '2023-03-27 01:05:44.031000', '2023-03-27 01:44:47.504000', '', ''),
(3, 11, 'ahfh', 'ms@gmail.com', '121313432', '/resources/static/assets/uploads/profiles/20171102_MH_BOBSLED_1737 (1)@2x.png', '2023-04-12 21:30:55.127000', '2023-04-12 21:30:55.127000', 'wefdsaew', 'zdfsfsadDsdsa'),
(4, 11, 'abc', 'ms@gmail.com', '123456789', '/resources/static/assets/uploads/profiles/FB_IMG_1681344992846.jpg', '2023-04-13 11:54:16.451000', '2023-04-13 11:54:16.451000', 'pk', 'khi'),
(5, 11, 'afffcc', 'ms@gmail.com', '94947989', '/resources/static/assets/uploads/profiles/Screenshot_20230413_210809.jpg', '2023-04-13 14:40:39.757000', '2023-04-13 14:40:39.757000', 'pk', 'gk'),
(6, 18, 'ahfh', 'ms@gmail.com', '121313432', '/resources/static/assets/uploads/profiles/1.png', '2023-04-13 17:16:29.533000', '2023-04-13 17:16:29.533000', 'wefdsaew', 'zdfsfsadDsdsa'),
(7, 7, 'àaaassfcfcz', 'hhh@hh.com', '090078601', '/resources/static/assets/uploads/profiles/scaled_IMG-20230427-WA0003.jpg', '2023-04-15 22:52:17.061000', '2023-04-27 04:41:25.801000', 'qwertyuiiigv', 'vdsgbznbs'),
(8, 25, 'hey', 'hello@gmail.com', '5665677', '/resources/static/assets/uploads/profiles/1.png', '2023-04-15 23:12:58.443000', '2023-04-15 23:12:58.443000', 'test', 'test'),
(9, 21, 'testttt', 'testaqib@gmail.com', '57657656', '/resources/static/assets/uploads/profiles/scaled_IMG-20230427-WA0006.jpg', '2023-04-27 07:30:10.825000', '2023-04-27 07:30:10.825000', 'jkhjkhj', 'hjh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
