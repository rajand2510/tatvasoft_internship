CREATE TABLE customer (
   customer_id serial PRIMARY KEY,
   first_name character varying(100) NOT NULL,
   last_name character varying(100) NOT NULL,
   email character varying(255) UNIQUE NOT NULL,
   created_date timestamp with time zone NOT NULL DEFAULT now(),
   updated_date timestamp with time zone
);


DROP TABLE IF EXISTS customer;


SELECT * from customer;


ALTER TABLE customer RENAME TO users;

SELECT * from users;

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(customer_id),
    order_date timestamp with time zone NOT NULL DEFAULT now(),
    order_number CHARACTER VARYING(50) NOT NULL,
    order_amount DECIMAL(10,2) NOT NULL
);




INSERT INTO users(first_name, last_name, email, created_date, updated_date) VALUES
  ('Rajan', 'Dalvadi', 'rajandalvadi@gmail.com', NOW(), NULL),
  ('Harsh', 'Dhimmar', 'harsh@gmail.com', NOW(), NULL),
  ('Kaushal', 'Kaushal', 'Kaushal@gmail.com', NOW(), NULL),
  ('mahendra', 'banna', 'mahendra@gmail.com', NOW(), NULL),
  ('aryan', 'Terry', 'aryan@gmail.com', NOW(), NULL),
  ('Shrikant', 'patel', 'Shrikant@gmail.com', NOW(), NULL),
  ('ravi', 'Patel', 'ravi@gmail.com', NOW(), NULL);

INSERT INTO orders (customer_id, order_date, order_number, order_amount) VALUES
  (1, '2024-01-01', 'ORD001', 50.00),
  (2, '2024-01-01', 'ORD002', 35.75),
  (3, '2024-01-01', 'ORD003', 100.00),
  (4, '2024-01-01', 'ORD004', 30.25),
  (5, '2024-01-01', 'ORD005', 90.75),
  (6, '2024-01-01', 'ORD006', 25.50),
  (7, '2024-01-01', 'ORD007', 60.00)

select customer_id from users;

SELECT firstname FROM customers;

SELECT
   first_name,
   last_name,
   email
FROM
   users;



SELECT
	first_name,
	last_name
FROM
	users
WHERE
	first_name = 'ravi';




SELECT
	customer_id,
	first_name,
	last_name
FROM
	users
WHERE
	first_name = 'Rajan' AND last_name = 'Dalvadi';




SELECT
	customer_id,
	first_name,
	last_name
FROM
	users
WHERE first_name IN ('Kaushal','Harsh');



SELECT
	first_name,
    last_name
FROM
	users
WHERE
	first_name LIKE '%nt%';


SELECT
	first_name,
    last_name
FROM
	users
WHERE
	first_name ILIKE '%EN%';



SELECT * FROM orders as o
INNER JOIN users as c
ON o.customer_id = c.customer_id


SELECT
    customer_id,
	first_name,
	last_name,
	email
FROM
	users
WHERE
	EXISTS (
		SELECT
			1
		FROM
			orders
		WHERE
			orders.customer_id = users.customer_id
	);