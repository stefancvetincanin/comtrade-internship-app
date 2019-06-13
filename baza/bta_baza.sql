-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2019 at 01:12 PM
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
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grad`
--

INSERT INTO `grad` (`id`, `ime`, `opis`, `slika`, `latitude`, `longitude`) VALUES
(14, 'Madrid', 'Madrid is all bustling plazas, lively tapa bars, and a rich variety of museums showcasing Spain’s most celebrated artists. The world-famous Prado Museum features the work of Goya and Velázquez. The Prado forms the \'golden triangle\' with the Reina Sofía Museum—home to Picasso’s \'Guernica\'—and the Thyssen-Bornemisza Museum, an enormous private collection highlighting a wide array of artistic styles. Madrid’s medieval architecture holds centuries of history, like the intricate portico arches of Plaza Mayor, as well as the baroque Royal Palace, where state ceremonies are held to this day. And visiting top attractions like these is easy thanks to the city’s efficient and high-speed Metro system. Spain\'s sprawling capital is a city that lives and breathes soccer. If you’re a fan, catch a game at the Santiago Bernabéu Stadium—home to Real Madrid—and roar with the rest of the crowd as the \'Galácticos\' take the field. Madrid’s weather is pleasant year-round, with perfectly comfortable temperatures on either side of summer. Even a winter vacation practically guarantees clear blue skies – making for a beautiful sight when flying into the airport during the day.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345503.webp?k=a9c9ce07f7c7ad673a9b862407cbda', 40.4168, 3.7038),
(15, 'Rome', 'Ancient history comes alive down every street of Italy\'s capital. Many of the ruins depict stories of the powerful empire that once spanned three continents, making Rome an open-air museum thanks to iconic monuments like the Roman Forum, Palatine Hill, and the Colosseum. The former gladiator arena is the city\'s centerpiece, and brings to mind all the brutal games once held on its stage for thousands of roaring spectators. Visit the impressively preserved Pantheon to experience even more of the Eternal City\'s golden age. With over 900 churches and many beautiful basilicas among them, Rome is also home to the city-state of the Vatican, the seat of the Catholic Church. St. Peter\'s Basilica is a tourist hotspot, but treasures like Michelangelo\'s Sistine Chapel and countless other masterpieces are held inside the Vatican\'s great museums. Like any other Italian city, the local food varies from region to region. In Rome, the trademark dishes are \'cacio e pepe\'—a deliciously simple pecorino cheese and pepper pasta—and \'spaghetti carbonara\'. Don\'t miss other landmarks like the iconic Trevi Fountain, the Borghese Gallery, or Piazza Navona and Piazza di Spagna. The weather is best between April and June, perfect for a walk or bike ride through Villa Borghese park.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345771.webp?k=eef1ebc043e9c90e1338efe31127f3', 41.9028, 12.4964),
(16, 'Amsterdam', 'Amsterdam, the capital of the Netherlands, has been a rich cultural hub for centuries thanks to travelers and traders. Located in North Holland, the city is famous for its iconic canal system, distinctive row houses, and eclectic range of museums, including the Anne Frank House, the Van Gogh Museum, and the Rijksmuseum. Great public transit options include buses and streetcars, but bicycles are the quintessential mode of transportation in Amsterdam. The 250 miles of bike paths and 8,000 bike parking spaces make exploring the city on two wheels easy and fun. The city\'s medieval center, or \'Centrum\', showcases many points of interest synonymous with Amsterdam tourism, including canals, traditional architecture, and the famous nightlife of the Red Light District. If you\'re visiting during tulip season, stop by Keukenhof\'s botanical garden in mid-April for its vibrant collection of blooming flowers. A variety of accommodations can be found across the city, from high-end hotels to cozy homestays and hostels. Schiphol—Amsterdam’s main airport—is just 9 miles southwest of the city and is connected by regular train services from the city center to the main terminal.', 'https://r-ak.bstatic.com/xdata/images/xphoto/1680x560/49345566.webp?k=a3bfe768d307618e99f9bd81bee62d', 52.3792, 4.89943),
(17, 'Barcelona', 'Located on the coast of Catalonia, Barcelona is a melting pot of cultures, filled with unforgettable architecture, medieval streets, and impressive museums. Its most famous figure, Antoni Gaudí, is the genius behind some of the city’s most incredible monuments. From the twisting, stone façade of Casa Milà to the world-famous Sagrada Familia, the works of this legendary architect can be found all over the city. In the Gothic Quarter, you’ll find all sorts of historic cafes and tapas bars leading the way to a cathedral protected by gargoyles. Be sure to try Catalonian classics like beef croquettes and salt-cod fritters under this dramatic backdrop, then wash it all down with a refreshing glass of Rioja. The perfect way to end the day is with a walk all the way down the lively, tree-lined boardwalk of La Rambla until you get to the calm port at dusk. If you’re looking to soak up the year-round sunshine, find a spot on the sand in Barceloneta or a comfy patch of grass in Parc de la Ciutadella. If you have time, take a stadium tour of Camp Nou, climb Carmel Hill for amazing panoramic views, or explore the iconic mosaics of Park Güell – yet another of Gaudí’s amazing creations.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345466.webp?k=6ae21c5b2bdf1f7707e22228c7615f', 41.3902, 2.15401),
(18, 'Vienna', 'With all of Vienna\'s imperial palaces, countless architectural achievements, and a world-renowned cafe culture, there\'s almost too much to do in Austria\'s amazing capital. The historic city center is like an open-air museum, so it\'s no surprise it was designated as a UNESCO World Heritage Site. Ringstrasse Boulevard is lined with beautiful buildings like the Rathaus (town halll), the Spanish Riding School, and the Hofburg Palace. However, the best place to check out the city\'s main sights is in the MuseumsQuartier – a collection of great museums, as well as cozy cafes and bars all housed in former stables. Highlights include the MUMOK, Leopold Museum, Kunsthalle, Architekturzentrum, and the interactive children\'s museum Zoom. Enjoy the unique atmosphere of Vienna\'s coffee shops at Café Schwarzenberg—the oldest café on the Ringstrasse—which serves traditional liver dumpling soup and apple strudel. There\'s also Café Central, where icons like Leo Trotsky and Sigmund Freud used to gather. Then head over to the Riesenrad for some beautiful views over the city. This classic Ferris wheel is 215 feet tall and takes about 20 minutes to make a full rotation. Vienna International Airport is right outside the city limits and can be reached easily by train, bus or taxi.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345467.webp?k=79b6fd6d6654e418f5fac99284af97', 48.21, 16.3634),
(19, 'Berlin', 'Home to the iconic Brandenburg Gate and the famous Fernsehturm at Alexanderplatz, Berlin is a renowned global city of culture, commerce and politics. Its eclectic architecture is visual and exciting proof of its fascinating history. In \'Mitte\', the city’s historical centre, you can find the famous Museum Island with the exquisite Pergamon Museum, as well as popular cafés, restaurants and clubs. The nearby Potsdamer Platz, once divided in two by the Berlin Wall, features great examples of ultramodern architecture and stunning night illumination. Berlin is the best place to try the famous Currywurst or jelly doughnuts, the Pfannkuchen. Explore the city’s bustling nightlife, famous festivals and parades, or simply walk through charming neighbourhoods like Prenzlauer Berg. Berlin is always full of things to do and see! Combining a vibrant culture and art scene, sites of historic interest like the Reichstag, and great shopping opportunities, the German capital truly is a symbol of a modern and unified Europe. Travelling to the city centre from Tegel International and Schönefeld Airports is a piece of cake using Berlin’s reliable public transit system. Whether you are looking for a cheap hostel, alternative apartment or a chic hotel, Booking.com has a perfect room for your Berlin holiday.', 'https://r-ak.bstatic.com/xdata/images/explorer_city/1680x560/3129.webp?k=651f912fdd5b3376c83a01d76f5', 52.52, 13.405),
(20, 'London', 'London\'s inherent uniqueness and mix of cultures have made it one of the most visited cities in the world. Its diverse bundle of boroughs are often like mini cities in their own right, with each one offering something different to the last. London\'s iconic skyline is an eclectic combination of instantly recognisable landmarks, from the historic Tower of London to the ultra-modern skyscrapers of The Shard and 20 Fenchurch (better known as \'The Walkie-Talkie\'). A walk through the ‘Square Mile’ immerses you in the original Roman settlement, with parts of the ancient defensive wall still visible. You\'ll also find some of the London\'s cosiest (and oldest) pubs around there, such as Ye Olde Cheshire Cheese, a former haunt of Charles Dickens and Mark Twain. For lovers of the arts, look no further than the world-class theatres of London\'s West End and the live music venues of Camden, Soho and Shoreditch. You\'ll also find endless galleries and museums dotted around, such as the free-to-visit British Museum, Natural History Museum and the National Gallery. Amongst all the impressive architecture and endless points of interest, it\'s easy to forget how green London is. 47% of the city is made up of public green space, including 3,000 parks. The most popular spots include Hyde Park, Kensington Gardens and Green Park, but it\'s worth venturing out to places like Richmond where you can walk amongst roaming wild deer. London is served by several major airports, including Heathrow, Gatwick, City, Stansted, Luton and Southend. Travel is made easy by the extensive public transport links, as well as private coach services.', 'https://r-ak.bstatic.com/xdata/images/xphoto/1680x560/49345560.webp?k=b9f40f2afb962f44ea6d434de74f6e', 51.5099, -0.118092),
(21, 'Paris', 'As the birthplace of the Age of Enlightenment and a constant trendsetter in the world of fashion, Paris has cemented itself as one of the world\'s must-see cities. In a country known for exceptional food, style and culture, the capital delivers on all three counts. The city is split into 20 districts (known as \'arrondissements\'), which all display their own character. Le Marais (in the fourth arrondissement) is famed for its medieval, meandering lanes, full of traditional patisseries and chic boutiques. The area is also home to the iconic cathedral of Notre-Dame, considered one of the best examples of French Gothic architecture. The seventh arrondissement is home to some of Paris\' most famous landmarks, including the Eiffel Tower, Les Invalides and Musée d\'Orsay. Neighbouring districts also have plenty to offer, such as the famous Champs-Elysées, Arc de Triomphe and Opéra Garnier. In the centre of Paris you\'ll find the world-famous Musée du Louvre, home to tens of thousands of works of art, including da Vinci\'s \'Mona Lisa\'. Further outside the city, but still worth a visit, are the mysterious Catacombs and the Château de Versailles. Each French city takes pride in its cuisine and Paris is no exception, offering some of the world\'s best food. You\'ll find everything from three-Michelin-starred establishments like Restaurant Guy Savoy, to laid-back bistros like La Mascotte. Offering fun for visitors of all ages, Disneyland Paris is located to the east of the city, in the suburb of Marne-la-Vallée and can be reached easily by train.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345752.webp?k=50900e5723e39b2ff17c86794601fc', 48.8647, 2.34901),
(22, 'Istanbul', 'Straddling the border between Europe and Western Asia, Istanbul acts as an ancient crossroads of cultures, religions and civilisations. Greek, Persian, Byzantine and Ottoman influences can be seen across the city. The mesmerising Hagia Sophia, for instance, stood for over 1,000 years as an ornate church before being converted into an Imperial Mosque, which it remained as for over half a millennia. And there’s Topkapi Palace, a lavish complex of halls, courtyards and terraces with commanding views over the Bosphorus Strait. Today, both structures are religious museums attracting millions of visitors every year. The Blue Mosque is another glinting example of Byzantine-Ottoman fused architecture, with its domes, towering minarets and blue İznik tiles that adorn the interior. For a full view of the mosque’s design, enter through the crumbling remains of a Roman-era hippodrome in Sultanahmet Square. Yet Istanbul’s oldest monuments could easily escape you. Deep beneath the ground are several hundred ancient cisterns, where water was once delivered via 20 kilometres of aqueducts from a local reservoir. The largest of these is the Basilica Cistern, which you can explore along raised wooden platforms. Back on ground level, the Grand Bazaar will entice you with its maze-like network of craft stores and cosy teahouses. Go explore a little, before treating yourself to a Dürüm wrap on a street corner, or a mouthwatering meze in a bistro-style restaurant in Sultanahmet.', 'https://q-ak.bstatic.com/xdata/images/xphoto/1680x560/49345484.webp?k=69a8e45fc40ba3576548c4e23c4002', 41.0151, 28.9795),
(23, 'Moscow', 'Russia\'s prestigious capital holds its own on the global stage, with stunning architecture, museums and a variety of cultural offerings making it an enticing place to visit any time of year. Set foot on the black cobblestones of Moscow\'s iconic Red Square and you\'ll be treated to a breathtaking panorama dominated by the Kremlin\'s extensive brick walls and St. Basil\'s Cathedral. This is the historic heart of the city, and where many festivals and celebrations take place. You\'ll also find the Lenin Mausoleum there, as well as The Monument to Minin and Pozharsky. Moscow is also home to a wide array of museums and architectural highlights, including the Pushkin Museum of Fine Arts, the Flacon Design Factory and an armoury dating back to 1511. The city is no stranger to the arts either, with the Natalya Sats Musical Theatre offering experimental productions for all ages. You can also catch some world-class ballet and opera at the Bolshoi, a six-tier auditorium which has hosted performances since 1825. The impressive Zaryadye Park is a great place to switch off for an hour or two, and features four different climate zones, an Arctic cave and an unmeltable glacier.', 'https://r-ak.bstatic.com/xdata/images/xphoto/1680x560/49345773.webp?k=3143e60b42e6c8a27d3ec9cb96254e', 55.7512, 37.6184);

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
(1, 'superadmin', 'password', 'Bojan', 'Bojanic', 1, 'https://randomuser.me/api/portraits/men/11.jpg'),
(2, 'pepe', 'password', 'Petar', 'Petrovic', 0, 'https://randomuser.me/api/portraits/men/12.jpg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
