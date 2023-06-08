DROP TABLE IF EXISTS Waitlist;
DROP TABLE IF EXISTS Invoice;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Car;
DROP TABLE IF EXISTS Employee;

CREATE TABLE Customer (
	id int NOT NULL AUTO_INCREMENT UNIQUE,
	first_name varchar(255) NOT NULL, 
	last_name varchar(255) NOT NULL,
	street varchar(255) NOT NULL,
	zip varchar(11) NOT NULL,
	state varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	phone varchar(20) default NULL,
	email varchar(255) default NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE Car (
	id int NOT NULL AUTO_INCREMENT UNIQUE,
	price decimal(10,2) NOT NULL,
	brand varchar(255) NOT NULL, 
	model varchar(255) NOT NULL, 
	year int NOT NULL,
	color varchar(255) NOT NULL, 
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE Employee (
	id int NOT NULL AUTO_INCREMENT UNIQUE,
	first_name varchar(255) NOT NULL, 
	last_name varchar(255) NOT NULL,
	sales int NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE Invoice (
	id int NOT NULL AUTO_INCREMENT UNIQUE,
	date_sale varchar(255) NOT NULL,
	c_id int,
	car_id int,
	e_id int,
	FOREIGN KEY(c_id) REFERENCES Customer(id),
	FOREIGN KEY(car_id) REFERENCES Car(id),
	FOREIGN KEY(e_id) REFERENCES Employee(id),
    PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE Waitlist (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
	c_id int, 
	car_id int, 
	date_added varchar(255) NOT NULL,
	FOREIGN KEY(c_id) REFERENCES Customer(id),
	FOREIGN KEY(car_id) REFERENCES Car(id),
	PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO Customer (id, first_name, last_name, street, zip, state, city, phone, email)
VALUES
("1", "Zachery", "Grey", "100 Sing St", "97330", "Oregon", "Corvallis", "541-696-7474", "Zachgrey@gmail.com"),
("2", "Kelly", "Johnson", "674 Hayes St", "97330", "Oregon", "Corvallis", "123-456-6789", "kjohnson@gmail.com" ),
("3", "Taylor", "Beecher", "2860 Apple St", "97330", "Oregon", "Corvallis", "345-799-1298", "Taylor112@yahoo.com"),
("4", "Lauren", "Son", "808 Beaver Ave", "97330", "Oregon", "Corvallis", "503-786-9113", "laurenson@gmail.com");

INSERT INTO Car(id, price, brand, model, year, color)
VALUES
(1, 43509.00, 'Acura', 'A5', 2022, 'White'),
(2, 30478.00, 'Subaru', 'CrossTrek', 2023, 'Black'),
(3, 45000.00, 'Audi', 'A4', 2023, 'Black'),
(4, 52424.00, 'Lexus', 'NX', 2024, 'Black'),
(5, 647130.00, 'Lamborghini', 'Revuelto', 2018, 'Red'),
(6, 390960.00, 'Rolls-Royce', 'Cullinan', 2022, 'Silver'),
(7, 316525.00, 'Bentley', 'Mulsanne', 2017, 'Apple Green'),
(8, 133960.00, 'Porsche', '911', 2023, 'Silbermetallic'),
(9, 90690.00, 'Porsche', 'Cayenne', 2023, 'Moonlight Blue');

INSERT INTO Employee (id, first_name, last_name, sales)
VALUES
("1", "Eric", "Harrison", "13"),
("2", "Harry", "Freedman", "13"),
("3", "Selina", "Bryant", "20"),
( "4", "Rylie", "Solace", "34"),
("5", "Weiyu", "Jackson","18");

INSERT INTO Invoice (id, date_sale, c_id, car_id, e_id)
VALUES
("1", "2022-09-22", (SELECT id FROM Customer WHERE id = "3"), (SELECT id FROM Car WHERE id = "1"), (SELECT id FROM Employee WHERE id = "3")),
("2", "2023-08-09", (SELECT id FROM Customer WHERE id = "3"), (SELECT id FROM Car WHERE id = "2"), (SELECT id FROM Employee WHERE id = "2")),
("3", "2023-08-09", (SELECT id FROM Customer WHERE id = "1"), (SELECT id FROM Car WHERE id = "1"), (SELECT id FROM Employee WHERE id = "4"));

INSERT INTO Waitlist (id, c_id, car_id, date_added)
VALUES
(1, (SELECT id FROM Customer WHERE id = 1), (SELECT id FROM Car WHERE id = 1), '2022-06-03 22:49:54'),
(2, (SELECT id FROM Customer WHERE id = 2), (SELECT id FROM Car WHERE id = 2), '2023-06-07 12:30:05'),
(3, (SELECT id FROM Customer WHERE id = 4), (SELECT id FROM Car WHERE id = 3), '2023-04-28 15:40:42');

