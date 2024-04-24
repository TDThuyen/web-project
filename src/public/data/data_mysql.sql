use app;

IF OBJECT_ID('customers', 'U') IS NOT NULL
    DROP TABLE customers;
GO

CREATE TABLE customers (
    customer_id INT NOT NULL IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20) NOT NULL,
    address NVARCHAR(255) NULL,
    birthday DATE NOT NULL,
    role INT DEFAULT 1,
    pass_word NVARCHAR(500) NOT NULL,
    user_name NVARCHAR(50) NOT NULL,
    user_img NVARCHAR(50) NULL,
    PRIMARY KEY (customer_id)
);
GO

-- Table structure for table `orders`
IF OBJECT_ID('orders', 'U') IS NOT NULL
    DROP TABLE orders;
GO

CREATE TABLE orders (
    order_id INT NOT NULL IDENTITY(1,1),
    customer_id INT NULL,
    order_date DATE NULL,
    total_amount DECIMAL(10,2) NULL,
    PRIMARY KEY (order_id),
    CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
GO