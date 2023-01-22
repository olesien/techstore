-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: techstore
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('110621fc-f83f-4a9a-81da-3d6ee10e0bce','a7d947a6c86a33784f6c4f200eb6c449cc4709c5fa12b59cf95add773c558414','2022-12-20 11:05:12.940','20221220110512_init',NULL,NULL,'2022-12-20 11:05:12.909',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `icon` blob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'cases',NULL),(2,'graphicscards',NULL),(3,'mechanical',NULL),(4,'ssd',NULL),(5,'ram',NULL),(6,'cpus',NULL),(7,'motherboards',NULL),(8,'soundcards',NULL),(9,'psu',NULL),(10,'cooling',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_filters`
--

DROP TABLE IF EXISTS `categories_filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `value` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryid` (`categoryid`),
  CONSTRAINT `categories_filters_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_filters`
--

LOCK TABLES `categories_filters` WRITE;
/*!40000 ALTER TABLE `categories_filters` DISABLE KEYS */;
INSERT INTO `categories_filters` VALUES (1,'Tillverkare','multiselect',1,'manufacturer'),(2,'Färg','select',1,'color'),(3,'Formfaktor','select',1,'formfactor'),(4,'Tillverkare','multiselect',6,'manufacturer'),(5,'Kärnor','slider',6,'cores'),(6,'Trådar','slider',6,'threads'),(7,'Tillverkare','multiselect',3,'manufacturer'),(8,'Tillverkare','multiselect',5,'manufacturer'),(9,'Tillverkare','multiselect',7,'manufacturer'),(10,'Tillverkare','multiselect',5,'manufacturer'),(11,'Minnestyp','select',5,'memory_type'),(12,'Tillverkare','multiselect',4,'manufacturer'),(13,'Tillverkare','multiselect',9,'manufacturer'),(14,'Formfaktor','select',9,'formfactor');
/*!40000 ALTER TABLE `categories_filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `mail` varchar(45) NOT NULL,
  `postnumber` int(11) NOT NULL,
  `postcity` varchar(45) NOT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `orders_ibfk_2` (`userid`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (25,'2023-01-10',7,'Skickad','Linus','Lindberg','test1@gmail.com',111111,'Malmö',NULL,'testgatan 6A'),(26,'2023-01-10',7,'Mottagen','Linus','Lindberg','test1@gmail.com',111111,'Malmö',NULL,'testgatan 6A'),(27,'2023-01-10',7,'Mottagen','Linus','Lindberg','test1@gmail.com',112313,'Malmö',NULL,'testgatan 6A');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `orderid` (`orderid`),
  KEY `productid` (`productid`),
  CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (63,25,8,1,4999),(64,26,1,1,5190),(65,26,4,1,4390),(66,26,7,2,5000),(67,27,1,1,5190);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_compat`
--

DROP TABLE IF EXISTS `product_compat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_compat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productid1` int(11) NOT NULL,
  `productid2` int(11) NOT NULL,
  `error` tinyint(1) NOT NULL,
  `message` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productid1` (`productid1`),
  KEY `productid2` (`productid2`),
  CONSTRAINT `product_compat_ibfk_1` FOREIGN KEY (`productid1`) REFERENCES `products` (`id`),
  CONSTRAINT `product_compat_ibfk_2` FOREIGN KEY (`productid2`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_compat`
--

LOCK TABLES `product_compat` WRITE;
/*!40000 ALTER TABLE `product_compat` DISABLE KEYS */;
INSERT INTO `product_compat` VALUES (12,24,5,1,'Strömförsörningen är otillräcklig'),(13,7,30,1,'Moderkortets generation passar inte processorns'),(24,37,1,0,'Moderkortet har inte nog 20-pin USB anslutningar'),(25,37,6,1,'Moderkortets formfaktor passar ej chassits'),(26,37,11,0,'Ramet är för snabbt för moderkortet'),(27,30,8,1,'Moderkortets generation matchar ej processorns'),(28,30,7,1,'Moderkortets generation passar ej proccesorns'),(29,30,11,0,'ramet är för snabbt för moderkortet'),(30,30,1,0,'Moderkorter har ej nog 20-pin anslutningar för alla portar på chassit'),(31,30,6,1,'Moderkortets formfaktor passar ej chassits'),(32,23,5,1,'Strömförsörningen är otillräcklig');
/*!40000 ALTER TABLE `product_compat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `productid` int(11) NOT NULL,
  `image` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `productid` (`productid`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (2,'Cooler Master HAF 700 1',1,'corsair_1.png'),(3,'Fractal Design North 1',2,'fractaldesign_1.png'),(4,'Lian Li A4-H2O 1',3,'lianli_1.png'),(5,'ASUS RTX 3060',4,'asus_1.png'),(6,'ASUS RTX 4090',5,'asus_2.png'),(7,'Fractal Design Ridge Svart',6,'fractaldesign_2.png'),(8,'Cooler Master HAF 700 2',1,'corsair_2.png'),(9,'Intel Core i7 13700K',7,'intel_1.png'),(10,'AMD Ryzen 7 7700X',8,'amd_1.png'),(11,'Seagate Ironwolf 4B',9,'seagate_1.png'),(12,'WD Gold 20TB',10,'WD_1.png'),(13,'Corsair 16GB (2x8GB) Fram',11,'6110169_5.png'),(14,'Corsair 16GB (2x8GB) Bak',11,'6110169_7.png'),(15,'Kingston Fury 16GB (2x8GB)',12,'5303981_8.png'),(16,'Kingston Fury 16GB (2x8GB)',12,'5303981_4.png'),(17,'Kingston 16GB (2x8GB)',13,'5304683_6.png'),(18,'Kingston 16GB (2x8GB)',13,'5304683_10.png'),(29,'servers.jpg',2,'1673878751889-servers.jpg'),(30,'screen-shot-2020-07-24-at-9372.png',2,'1673878751889-screen-shot-2020-07-24-at-9372.png'),(31,'6905542_0.webp',23,'1673880765598-6905542_0.webp'),(39,'1903230_6.webp',30,'1674239603759-1903230_6.webp'),(40,'1903230_5.webp',30,'1674239603759-1903230_5.webp'),(41,'5303474_4.webp',31,'1674403924463-5303474_4.webp'),(43,'4305460_3.webp',32,'1674406957357-4305460_3.webp'),(44,'4302319_10.webp',33,'1674407788337-4302319_10.webp'),(45,'4302319_7.webp',33,'1674407788337-4302319_7.webp'),(46,'4302319_12.webp',33,'1674407788337-4302319_12.webp'),(47,'5323104_6.webp',34,'1674408755785-5323104_6.webp'),(48,'5323104_5.webp',34,'1674408755785-5323104_5.webp'),(49,'6308848_6.webp',35,'1674409448082-6308848_6.webp'),(50,'6302281_6.webp',36,'1674409868319-6302281_6.webp'),(51,'6302281_9.webp',36,'1674409868319-6302281_9.webp'),(52,'6903861_6 (1).webp',24,'1674409925682-6903861_6 (1).webp'),(53,'1903606_5.webp',37,'1674411014252-1903606_5.webp');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specs`
--

DROP TABLE IF EXISTS `product_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `productid` int(11) NOT NULL,
  `speccategory` varchar(45) DEFAULT NULL,
  `extrainfo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `productid` (`productid`),
  CONSTRAINT `product_specs_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specs`
--

LOCK TABLES `product_specs` WRITE;
/*!40000 ALTER TABLE `product_specs` DISABLE KEYS */;
INSERT INTO `product_specs` VALUES (1,'color','Grå',1,NULL,NULL),(2,'manufacturer','Cooler Master',1,NULL,NULL),(3,'manufacturer','Fractal Design',2,NULL,NULL),(4,'manufacturer','Lian Li',3,NULL,NULL),(5,'manufacturer','ASUS',4,NULL,NULL),(7,'manufacturer','Fractal Design',6,NULL,NULL),(8,'formfactor','ATX',1,NULL,NULL),(9,'formfactor','ATX',2,NULL,NULL),(10,'formfactor','ATX',3,NULL,NULL),(11,'formfactor','ITX',6,NULL,NULL),(12,'color','Svart',2,NULL,NULL),(13,'color','Svart',3,NULL,NULL),(14,'color','Svart',6,NULL,NULL),(15,'sounddampening','true',1,NULL,NULL),(16,'dustfilter','true',1,NULL,NULL),(17,'fancontroller','true',1,NULL,NULL),(18,'led','true',1,NULL,'(5st A-RGB fläktar)'),(19,'soundexit','true',1,'Frontpanel',NULL),(20,'micinput','true',1,'Frontpanel',NULL),(21,'USB3.0','4',1,'Frontpanel','2st interna kontakter'),(22,'USB3.1','1',1,'Frontpanel','1st interna kontaker'),(24,'manufacturer','AMD',8,NULL,NULL),(25,'cores','8',8,NULL,NULL),(27,'threads','16',8,NULL,NULL),(29,'manufacturer','Seagate',9,NULL,NULL),(43,'manufacturer','WD',10,'manufacturer',''),(44,'diskspace','20',10,'manufacturer','TB'),(45,'manufacturer','ASUS',5,'Huvud specifikationer',''),(82,'manufacturer','AMD',31,'Huvud specifikationer',NULL),(83,'model','Ryzen',31,'Huvud specifikationer','5'),(84,'speed','3.7',31,'Huvud specifikationer','Ghz'),(85,'speed_overclock','4.6',31,'Huvud specifikationer','Ghz'),(86,'cores','6',31,'Huvud specifikationer',NULL),(87,'threads','12',31,'Huvud specifikationer',NULL),(88,'l2cache','3',31,'Huvud specifikationer','MB'),(89,'l3cache','32',31,'Huvud specifikationer','MB'),(90,'diesize','7',31,'Huvud specifikationer','nm'),(91,'TDP','65',31,'Huvud specifikationer','W'),(92,'integrated_graphics','false',31,'Huvud specifikationer',NULL),(93,'socket','AM4',31,'Huvud specifikationer',NULL),(94,'included_cooler','true',31,'Huvud specifikationer','Wraith'),(95,'guarantee','3',31,'Huvud specifikationer','år'),(118,'cooling_type','Luft',34,'Huvud specifikationer',NULL),(119,'material','Aluminium/Koppar',34,'Huvud specifikationer',NULL),(120,'coolingcapacity','150',34,'Huvud specifikationer','W'),(121,'fan_size','120',34,'Fläkjtar / Luftkylning','mm'),(122,'rotationspeed','1500',34,'Fläkjtar / Luftkylning','rpm'),(123,'sound','26.8',34,'Fläkjtar / Luftkylning','dB'),(124,'width','121',34,'Mått och vikt','mm'),(125,'depth','87',34,'Mått och vikt','mm'),(126,'weight','575',34,'Mått och vikt','g'),(127,'cooling_type','Luft',35,'Huvud specifikationer',NULL),(128,'material','Koppar/Aluminium/Nickel',35,'Huvud specifikationer',NULL),(129,'coolingcapacity','165',35,'Huvud specifikationer','W'),(130,'fan_size','140',35,'Fläktar / Luftkylning','mm'),(131,'rotationspeed','1500',35,'Fläktar / Luftkylning','rpm'),(132,'sound','24.6',35,'Fläktar / Luftkylning','dB'),(133,'connection','4-pin',35,'Fläktar / Luftkylning','PWM'),(134,'flow','40.2',35,'Fläktar / Luftkylning','m³/h'),(135,'width','150',35,'Mått och vikt','mm'),(136,'depth','161',35,'Mått och vikt','mm'),(137,'weight','1320',35,'Mått och vikt','g'),(138,'guarantee','6',35,'Övrigt','år'),(139,'interface','PCI-Express',36,'Huvud specifikationer',NULL),(140,'sound_processor','SABRE32',36,'Huvud specifikationer',NULL),(141,'guarantee','1',36,'Huvud specifikationer','år'),(142,'channels','6',36,'Huvud specifikationer',NULL),(145,'manufacturer','Seasonic',24,'',NULL),(146,'effect','850',24,'','W'),(147,'formfactor','ATX',24,'','PS2'),(148,'passive','true',24,'',NULL),(149,'sound','20',24,'','dB'),(150,'modular','true',24,'',NULL),(151,'molex','5',24,'',NULL),(152,'sata','14',24,'',NULL),(153,'color','Svart',24,'',NULL),(154,'80plus','80+',24,'','Gold'),(155,'length','170',24,'','mm'),(156,'guarantee','12',24,'','år'),(168,'manufacturer','Intel',7,'Huvud specifikationer',NULL),(169,'cores','16',7,'Huvud specifikationer',NULL),(170,'threads','24',7,'Huvud specifikationer',NULL),(198,'chipset','Z690',37,'Huvud specifikationer',NULL),(199,'overclockingsupport','true',37,'Huvud specifikationer',NULL),(200,'socket','Intel',37,'Huvud specifikationer','1700'),(201,'formfactor','ATX',37,'Huvud specifikationer',NULL),(202,'memory_type','DDR4',37,'Minne',NULL),(203,'memory_speed','3200',37,'Minne','Mhz'),(204,'memory_speed_oc','533',37,'Minne','Mhz'),(205,'memory_slots','4',37,'Minne',NULL),(206,'sata','6',37,'SATA',NULL),(207,'m2','4',37,'M.2',NULL),(208,'soundcard','Realtek-ALC1220-VB2',37,'Ljud',NULL),(209,'manufacturer','Gigabyte',37,'Övrigt',NULL),(210,'chipset','B550',30,'Huvud specifikationer',NULL),(211,'overclockingsupport','true',30,'Huvud specifikationer',NULL),(212,'socket','am4',30,'Huvud specifikationer',NULL),(213,'formfactor','ATX',30,'Huvud specifikationer',NULL),(214,'memory_type','DDR4',30,'Minne',NULL),(215,'manufacturer','ASUS',30,'Övrigt',NULL),(216,'manufacturer','Kingston',12,'Huvud specifikationer',NULL),(217,'memory_type','DDR4',12,'Huvud specifikationer',NULL),(218,'manufacturer','Kingston',13,'Huvud specifikationer',NULL),(219,'memory_type','DDR5',13,'Huvud specifikationer',NULL),(220,'manufacturer','Corsair',11,'Huvud specifikationer',NULL),(221,'memory_type','DDR4',11,'Huvud specifikationer',NULL),(222,'formfactor','M.2',32,'Huvud specifikationer',NULL),(223,'color','Blå',32,'Huvud specifikationer',NULL),(224,'size','1',32,'Huvud specifikationer','TB'),(225,'connection','M.2',32,'Huvud specifikationer',NULL),(226,'guarantee','3',32,'Huvud specifikationer','år'),(227,'read_speed','3500',32,'Huvud specifikationer','MBs'),(228,'lifespan','320',32,'Huvud specifikationer','TBW'),(229,'write_speed','2100',32,'Huvud specifikationer','MBs'),(230,'manufacturer','Kingston',32,'Huvud specifikationer',NULL),(231,'memory_type','V-NAND',33,'Huvud specifikationer',NULL),(232,'controller','Samsung',33,'Huvud specifikationer','MKX'),(233,'formfactor','2.5',33,'Huvud specifikationer','\"'),(234,'size','2',33,'Huvud specifikationer','TB'),(235,'read_speed','660',33,'Huvud specifikationer','MBs'),(236,'write_speed','530',33,'Huvud specifikationer','MBs'),(237,'lifespan','1200',33,'Huvud specifikationer','TBW'),(238,'guarantee','5',33,'Huvud specifikationer','år'),(239,'manufacturer','Samsung',33,'Huvud specifikationer',NULL),(240,'effect','850',23,'Huvud','W'),(241,'formfactor','ATX',23,'Huvud',NULL),(242,'manufacturer','Corsair',23,'Huvud',NULL);
/*!40000 ALTER TABLE `product_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `quickspecs` varchar(100) DEFAULT NULL,
  `description` text,
  `price` int(11) NOT NULL,
  `oldprice` int(11) DEFAULT NULL,
  `instock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoryid` (`categoryid`),
  FULLTEXT KEY `name` (`name`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Cooler Master HAF 700','Fönstersida | LED-belysning','Cooler Master HAF 700 är ett chassi för den som vill ha allt, inbyggd A-RGB kontroller, 5st A-RGB fläktar och möjlighet till dubbla 360mm radiatorer i toppen.\nDu har massiv plats i chassit med plats för hela 15st 120mm och 2st 200mm fläktar, eller varför inte 3st 420mm radiatorer.',5190,NULL,2),(2,1,'Fractal Design North','Stilren | Bra Luftflöde','North omdefinierar speldatorn och introducerar naturliga material och skräddarsydda detaljer för att göra spelandet till ett stilfullt tillägg till vardagsrummet. Chassit har finmönstrad nätventilation och en öppen front med paneler i äkta valnöt eller ek.',1799,NULL,1),(3,1,'Lian Li A4-H2O X3','PCIE 3.0 | 11 liter','I 11 liter passar detta Chassi en 3-slot GPU med en längd upp till 321 mm, en 240 AIO med standardfläktar och kan hantera höga TDP-processorer som 12700k.',949,1290,40),(4,2,'ASUS GeForce RTX 3060 12GB','GPU-frekvens: 1867 Mhz | GDDR6 | Längd: 200mm','GeForce RTX™ 3060 kan du ta dig an de senaste spelen med kraften hos Ampere – andra generationens NVIDIA RTX-arkitektur. Få otrolig prestanda med förbättrade strålspårningskärnor och Tensor-kärnor, nya strömmande multiprocessorer och supersnabbt G6-minne.',4390,4999,49),(5,2,'ASUS GeForce RTX 4090 24GB ROG STRIX','GPU-frekvens: 2230 Mhz  | GDDR6X | Längd: 357.6 mm','GeForce RTX 4090 är det överlägset kraftfullaste grafikkortet genom tiderna. Det är flaggskeppet i den nya, banbrytande Ada Lovelace-arkitekturen och bjuder på aldrig tidigare skådad prestanda, med upp till två gånger så hög prestanda och energieffektivitet som RTX 3090 Ti.',27960,NULL,2),(6,1,'Fractal Design Ridge Svart','Subtilt och snyggt chassi som passar i allas hem','Fractal Design Ridge är en utveckling av det smala formatet och utvecklades i samarbete med spel och underhållningsentusiaster för att på ett subtilt sätt förbättra deras hem och förstärka det småskaliga formfaktor PC-upplevelse.',1990,NULL,0),(7,6,'Intel Core i7 13700K','Antal kärnor: 16st | Antal Trådar: 24st','Intels 13th-gen processorer är nu här, med fler hybridkärnor och ännu högre boost-frekvenser. Intel Thread Director optimerar vilka kärnor som utför vilka uppgifter, för att en optimal prestanda kan uppnås i både enkel- som flertrådad användning. Stöd för PCIe 5.0 samt DDR5 medföljer.',5000,5590,97),(8,6,'AMD Ryzen 7 7700X','Antal kärnor: 8st | Antal Trådar: 16st','Med den nya arkitekturen Zen4, tillverkad på 5nm, bjuds vi 13% högre IPC, enorma klockfrekvensförbättringar, exceptionell energieffektivitet och en toppmodern ny plattform med AM5. I jämförelse med förra generationen får vi upp till 29% högre enkeltrådad och 45% högre flertrådad prestanda, 15% högre spelprestanda och 27% högre prestanda per watt. Tillsammans med DDR5, PCIe 5.0 och AMD Expo är det här det största skiftet sedan Ryzen först släpptes.',4999,NULL,9),(9,3,'Seagate IronWolf 4TB','4TB | 5400rpm | 256MB','Seagate IronWolf är en hårddiskserie anpassad för NAS och RAID-miljöer där det ställs hårda krav på stabilitet och prestanda.',1099,NULL,77),(10,3,'WD Gold 20TB','20TB | 7200rpm | 512MB','Med upp till tio gånger mer arbetskapacitet än en vanlig hårddisk, WD Gold levererar bland de bästa i branschen när det kommer till pålitlighet, kapacitet, strömeffektivitet samt prestanda. Designad för en mängd olika datacenter aktiviteter, WD Gold hårddiskar är perfekta för servrar med hög tillgänglighet och lagringskluster som kräver robusta lagringsenheter med kunder som kräver 24/7 tillgänglighet och premium tjänster.',7000,NULL,2),(11,5,'Corsair 16GB (2x8GB)','16GB | DDR4 | 3200Mhz | Svart','Överklockningsvänliga minnen med en diskret och snygg kylare i låg profil för att matcha alla processorkylare och kompakta byggen.',400,NULL,22),(12,5,'Kingston Fury 16GB (2x8GB)','16GB | DDR4 | 3300Mhz | Svart','Nya Kingston Fury Beast DDR4 är snabba gamingminnen med värmespridare i låg profil för hög kompatibilitet med kylare och andra komponenter.',300,500,50),(13,5,'Kingston 16GB (2x8GB) ','16GB | DDR5 | 4800Mhz | Svart','Kingston FURY Beast DDR5-minne ger dig den senaste avancerade teknologin för nästa generations gamingplattformar.Oöverträffad hastighetsförbättring med dubbla minnesbankar från 8 till 32 och dubbel burst-längd från 8 till 16 gör att du med hjälp av DDR5-minnet kan ta gamingupplevelsen till en helt ny prestandanivå.',999,NULL,3),(23,9,'Corsair RM850e','850M | Passiv | Modulär','De tystgående och modulära nätaggregaten i CORSAIR RMe-serien ger din PC tyst, stabil och 80 PLUS Gold-certifierad strömförsörjning. Med dubbla EPS12V-kablar (8 stift) och flera PCIe-anslutningar (8-stift) har nätaggregaten i RMe-serien alla de anslutningar som behövs för att driva dagens mest krävande PC-byggen. 105 °C-klassificerade industriella kondensatorer levererar enastående prestanda, och de har sju års garanti.',1629,NULL,50),(24,9,'Seasonic Prime GX 850W','Modulär | Gold | 850W','Den högkvalitativa Fluid Dynamic Bearing (FDB) fläkten på 120mm är väldigt tyst och är väldigt stabil i det långa loppet. FDB fläkten kombinerat med Seasonics Hybrid Silent Fan Control garanterar minsta möjliga ljudnivåer under belastning.',2749,NULL,10),(30,7,'ASUS ROG Strix B550-F Gaming','AMD B550 | AM4 | DDR4','B550 är en toppmodern och prisvärd plattform tillhörande AMD Ryzen 3000-seriens processorer.\nAMD B550 är utrustat med stöd för PCI Express 4.0 vilket ger dubbelt så hög bandbredd jämfört mot tidigare generationer.',1790,NULL,5),(31,6,'AMD Ryzen 5 5600X 3.7 GHz','3.7 Ghz | 6 kärnor | 12 trådar','AMD Ryzen 5000-serien levererar hög prestanda för både gaming och kreativt arbete. Med stöd för PCIe 4 kan prestandan i ditt system höjas ytterligare en nivå.',2050,NULL,22),(32,4,'Kingston NV2 M.2 NVMe Gen 4 1TB','M.2 | 1TB | 3 500 MB/sek','Kingston NV2 är en prisvärd uppgradering till din dators lagring, den har M.2 standarden över en PCIe Gen 4 kontroll för hög prestanda och blixtsnabba system.',599,698,2),(33,4,'Samsung 870 EVO SATA SSD 2TB','SATA 6.0 Gbit/s | SATA | 2.5\"','Den senaste modellen av världens bäst säljande SSD-serie är äntligen här. 870 EVO använder Samsungs legendariska SSD-teknik, nu med uppgraderad prestanda, tillförlitlighet och kompabilitet för att passa alla behov.',2099,NULL,50),(34,10,'be quiet! Pure Rock 2','150W | 120mm | 4-pin PWM','Uppfölljaren till omåttligt populära Pure Rock är nu här, nytt med generation 2 är en assymetrisk design för att undvika att krocka med dina minnesstickor som är av högre modell. Värmespridarrören har designats om för att ha direktkontakt med processorn för att snabbare fånga upp värmen från processorn.',299,NULL,100),(35,10,'Noctua NH-D15','165 W | Luft | 140mm','NH-D15 är en av Noctua\'s topptestade flaggskep och kommer med en kraftfull värmespridare samt NF-A15 PWM-fläktar.',1021,NULL,2),(36,8,'Creative Sound BlasterX AE-5 Plus','PCI Express | Virtuellt Ljud','AE-5 Plis är uppdateringen på det prisbelönta ljudkortet från Creative med Xamp men den har nu även fått stöd för Dolby Digital Live/DTS. Ytterligare så har den inbyggt ett Creatives Aurora RGB system och medföljer gör en LED-strip på 30cm som du enkelt kontrollerar via programvaran Sounds Blaster Connect.',1300,NULL,8),(37,7,'Gigabyte Z690 Gaming X DDR4','Z590 | DDR4','Toppmodern Intel-plattform redo för 12th gen processorer.\nObs! BIOS kan behöva uppdateras för att användas med 13th gen CPU.',2799,2899,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `content` text NOT NULL,
  `rating` smallint(6) NOT NULL,
  `productid` int(11) NOT NULL,
  `timeposted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`userid`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `productid` (`productid`),
  KEY `userid` (`userid`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,5,'Funkar bra',4,1,NULL),(2,6,'Funkar ganska bra',3,1,NULL),(4,5,'Funkar inte bra',1,2,NULL),(9,7,'Väldigt bra',5,1,'2023-01-05 13:42:00'),(11,7,'Otroligt nöjd med produkten! Funkar felfritt',4,4,'2023-01-10 18:04:03'),(13,7,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley',5,6,'2023-01-11 16:33:47'),(14,7,'Funkar fin fint',5,11,'2023-01-12 20:46:32');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postnumber` int(11) DEFAULT NULL,
  `postcity` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(38) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `admin` tinyint(1) DEFAULT '0',
  `image` blob,
  `address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,NULL,'Test','test','test@gmail.com','$2b$15$K/ijNHjNPlWouTvrJ.NBpuhQ98SoUpWHSVzWmigVXfX7EM/n7Ufqq',NULL,NULL,NULL,0,0,NULL,NULL),(6,NULL,'test','Test','test123@gmail.com','$2b$15$QDF2xbSU8GRQET77WJ4n3uZTfiheWRSSIcD.MZFI4UYCPifTIykz2',NULL,NULL,NULL,0,0,NULL,NULL),(7,NULL,'LinusAAC','Lindberg','test1@gmail.com','$2b$15$hTkoPCQXUiO9whIpBviroeXlAp6hNrDvenziefMqBoZV7Ek/zm6p2',111111,'Malmö','123456123123',0,1,NULL,'testgatan 6A'),(8,NULL,'Test','test','abc@gmail.com','$2b$15$jguSPEUoMYAs3/a1gK5Jwes7ZUYuoWkY6QxJu6AUKEzlbjPLrP7oK',NULL,NULL,NULL,0,0,NULL,NULL),(9,NULL,'test',NULL,'test2@gmail.com','$2b$15$HwO2az/VLHPlkULauX5kMOjJ58JoPwrdRYZ9ifVoEO/1aZn57rGGG',NULL,NULL,NULL,0,0,NULL,NULL),(10,NULL,'Admin','Admin','admin@gmail.com','$2b$15$gbymaK0RhX9BRmr2uFbRt.BhoMUuylwz.KOmQQadvXXYI3ldCpu9q',42069,'Admingatan','12345678910',1,1,NULL,'Admingatan 6A');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-22 21:10:33
