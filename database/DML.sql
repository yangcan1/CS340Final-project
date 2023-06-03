-- add a new customer 
INSERT INTO customer (id, first_name, last_name, street, zip, state, city, phone, email)
VALUES (:cid_input, :cfirst_input, :clast_input, :street_input, :zip_input, :state_input, :city_input, :phone_input, :email_input)

-- delete a customer 
DELETE FROM customer
WHERE id = :cid_input

-- select a customer profile 
SELECT id, first_name, last_name, street, zip, state, city, phone, email
FROM customer
WHERE id = :cid_input

-- update a customer's profile 
UPDATE customer
SET first_name = :cfirst_input, last_name = :clast_input, street = :state_input, zip = :zip_input, state = :state_input, city = :city_input, phone = :phone_input, email = :email_input
WHERE id = :cid_input

-- add a new car
INSERT INTO car (id, price, brand, model, year, color)
VALUES (:carid_input, :price_input, :brand_input, :model_input, :year_input, :color_input)

-- delete a car 
DELETE FROM car
WHERE id = :carid_input

-- select a car
SELECT id, price, brand, model, year, color
FROM car
WHERE id = :carid_input

--update a car
UPDATE car
SET id = :carid_input, price = :price_input, brand = :brand_input, model = :model_input, year = :year_input, color = :color_input
WHERE id = :carid_input

-- add a new waitlist 
INSERT INTO waitlist (c_id, car_id, date_add)
VALUES (:cid_input, :carid_input, :date_input)

-- delete a waitlist
DELETE FROM waitlist 
WHERE c_id = :cid_input AND car_id = :carid_input

--select waitlist
SELECT c_id, car_id, date_add
FROM waitlist
WHERE c_id = :cid_input AND car_id = :carid_input

INNER JOIN waitlist ON waitlist.c_id = customer.id
--update a waitlist
UPDATE waitlist
SET c_id = :cid_input, car_id = :carid_input, date_add = :date_input
WHERE c_id = :cid_input AND car_id = :carid_input

-- add a new employee
INSERT INTO (id, first_name, last_name, sales)
VALUES (:eid_input, :efirst_input, :elast_input, :sales_input)

-- delete an employee
DELETE FROM employee
WHERE id = :eid_input

-- select an employee
SELECT id, first_name, last_name, sales
FROM employee
WHERE id = :eid_input

-- update an employee
UPDATE employee
SET id = :eid_input, first_name = :efirst_input, last_name = :elast_input, sales = :sales_input
WHERE id = :eid_input 

-- add a new invoice
INSERT INTO invoice (id, date_sale, c_id, car_id, e_id)
VALUES (:iid_input, :date_sale_input, :cid_input, :carid_input, eid_input)

--delete an invoice
DELETE FROM invoice
WHERE id = :iid_input

-- select an invoice
SELECT id, date_sale, c_id, car_id, e_id
FROM invoice
WHERE id = :iid_input

-- update an invoice
UPDATE invoice
SET id = :iid_input, date_sale = :date_sale_input, c_id = :cid_input, car_id = :carid_input, e_id = : eid_input
WHERE id = :iid_input

-- display Tables 
SELECT * FROM waitlist;
SELECT * FROM invoice;
SELECT * FROM customer;
SELECT * FROM car;
SELECT * FROM employee;