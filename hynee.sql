USE master
CREATE DATABASE HYNEE
go
USE HYNEE

CREATE TABLE USERS
(
	user_phone VARCHAR(10) PRIMARY KEY, 
	user_fullname NVARCHAR(30) NOT NULL,
	user_password VARCHAR(60) NOT NULL,
	user_role BIT NOT NULL,
	user_gmail VARCHAR(50),
	user_image VARCHAR(255),
	user_create_date Date DEFAULT GETDATE(),
	user_status BIT
)

CREATE TABLE CATEGORY
(
	category_id VARCHAR(10) PRIMARY KEY,
	category_name NVARCHAR(50) NOT NULL
)

CREATE TABLE DISCOUNT
(
	discount_id UNIQUEIDENTIFIER PRIMARY KEY,
	discount_percent INT CHECK(discount_percent > 0 AND discount_percent <= 100) NOT NULL,
	discount_begin DATE DEFAULT GETDATE(),
	discount_end DATE DEFAULT GETDATE(),
	discount_image VARCHAR(255) NULL
)

CREATE TABLE PRODUCT
(
	product_id UNIQUEIDENTIFIER PRIMARY KEY,
	product_code VARCHAR(20) NOT NULL,
	product_name NVARCHAR(110) NOT NULL,
	product_description NVARCHAR(max) NULL,
	product_quantity INT CHECK(product_quantity >= 0) DEFAULT 0,
	product_size VARCHAR(2) NOT NULL,
	product_color VARCHAR(10) NOT NULL,
	product_price INT CHECK(product_price > 0) NOT NULL,
	product_status BIT DEFAULT 1,
	category_id VARCHAR(10) REFERENCES CATEGORY(category_id) ON DELETE NO ACTION ON UPDATE CASCADE NOT NULL,
	discount_id UNIQUEIDENTIFIER REFERENCES DISCOUNT(discount_id) ON DELETE SET NULL ON UPDATE CASCADE NULL,
)

CREATE TABLE INVOICE
(
	invoice_id UNIQUEIDENTIFIER PRIMARY KEY,
	invoice_note NVARCHAR(255) NULL,
	invoice_address NVARCHAR(255) NOT NULL,
	invoice_date DATETIME DEFAULT GETDATE(),
	invoice_status BIT DEFAULT 0,
	invoice_shipping_status BIT DEFAULT 0,
	user_phone VARCHAR(10) REFERENCES USERS(user_phone) ON DELETE NO ACTION ON UPDATE CASCADE NOT NULL
)

CREATE TABLE INVOICE_DETAIL
(
	invoice_id UNIQUEIDENTIFIER REFERENCES INVOICE(invoice_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	product_id UNIQUEIDENTIFIER REFERENCES PRODUCT(product_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	invoice_DT_price INT CHECK(invoice_DT_price > 0) DEFAULT 1,
	invoice_DT_quantity INT CHECK (invoice_DT_quantity > 0) NOT NULL
)

CREATE TABLE FEEDBACK 
(
	product_id UNIQUEIDENTIFIER REFERENCES PRODUCT(product_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	user_phone VARCHAR(10) REFERENCES USERS(user_phone) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	feedback_content NVARCHAR(255) NOT NULL,
	feedback_date DATE DEFAULT GETDATE(),
	feedback_star TINYINT CHECK(feedback_star > 0 AND feedback_star <=5) NOT NULL,
	PRIMARY KEY(product_id,user_phone)
)

CREATE TABLE IMAGE
(
	image_id VARCHAR(255) PRIMARY KEY,
	product_id UNIQUEIDENTIFIER REFERENCES PRODUCT(product_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
)

CREATE TABLE DETAIL
(
	detail_id UNIQUEIDENTIFIER PRIMARY KEY,
	detail_name NVARCHAR(20) NOT NULL,
	detail_value NVARCHAR(30) NOT NULL,
)

CREATE TABLE DETAIL_PRODUCT
(
product_id UNIQUEIDENTIFIER REFERENCES PRODUCT(product_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
detail_id UNIQUEIDENTIFIER REFERENCES DETAIL(detail_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
PRIMARY KEY(product_id,detail_id)
)

GO

/*CREATE OR ALTER PROCEDURE CalculateRevenue
    @DateFilter DATE,
    @IntervalType VARCHAR(10) -- "day", "week", "month", "year"
AS
BEGIN
    SET NOCOUNT ON;

    IF @IntervalType = 'day'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            @DateFilter AS DateFilter,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE CONVERT(DATE, i.invoice_date) = @DateFilter;
    END
    ELSE IF @IntervalType = 'week'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            DATEPART(WEEK, @DateFilter) AS WeekNumber,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE DATEPART(WEEK, i.invoice_date) = DATEPART(WEEK, @DateFilter)
            AND DATEPART(YEAR, i.invoice_date) = DATEPART(YEAR, @DateFilter);
    END
    ELSE IF @IntervalType = 'month'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            DATEPART(MONTH, @DateFilter) AS MonthNumber,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE DATEPART(MONTH, i.invoice_date) = DATEPART(MONTH, @DateFilter)
            AND DATEPART(YEAR, i.invoice_date) = DATEPART(YEAR, @DateFilter);
    END
    ELSE IF @IntervalType = 'year'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            DATEPART(YEAR, @DateFilter) AS YearNumber,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE DATEPART(YEAR, i.invoice_date) = DATEPART(YEAR, @DateFilter);
    END
END;*/

CREATE OR ALTER PROCEDURE CalculateRevenue
    @DateFilter DATE,
    @IntervalType VARCHAR(10) -- "day", "month_year", "year"
AS
BEGIN
    SET NOCOUNT ON;

    IF @IntervalType = 'day'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            @DateFilter AS DateFilter,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE CONVERT(DATE, i.invoice_date) = @DateFilter;
    END
    ELSE IF @IntervalType = 'month_year'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            DATEPART(MONTH, @DateFilter) AS MonthNumber,
            DATEPART(YEAR, @DateFilter) AS YearNumber,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE DATEPART(MONTH, CONVERT(DATE, i.invoice_date)) = DATEPART(MONTH, @DateFilter)
            AND DATEPART(YEAR, CONVERT(DATE, i.invoice_date)) = DATEPART(YEAR, @DateFilter);
    END
    ELSE IF @IntervalType = 'year'
    BEGIN
        SELECT
            @IntervalType AS IntervalType,
            DATEPART(YEAR, @DateFilter) AS YearNumber,
            SUM(id.invoice_DT_price * id.invoice_DT_quantity) AS TotalRevenue
        FROM INVOICE i
        INNER JOIN INVOICE_DETAIL id ON i.invoice_id = id.invoice_id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        WHERE DATEPART(YEAR, CONVERT(DATE, i.invoice_date)) = DATEPART(YEAR, @DateFilter);
    END
END;
GO

CREATE OR ALTER PROCEDURE GetBestSellingProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10
        p.product_id,
        p.product_name,
        SUM(id.invoice_DT_quantity) AS TotalQuantitySold
    FROM INVOICE_DETAIL id
    INNER JOIN PRODUCT p ON id.product_id = p.product_id
    GROUP BY p.product_id, p.product_name
    ORDER BY TotalQuantitySold DESC;
END;

GO

CREATE OR ALTER PROCEDURE GetBestSellingProductsByInterval
    @StartDate DATE,
    @EndDate DATE,
    @IntervalType VARCHAR(10) -- "day", "week", "month", "year"
AS
BEGIN
    SET NOCOUNT ON;

    IF @IntervalType = 'day'
    BEGIN
        SELECT TOP 10
            p.product_id,
            p.product_name,
            SUM(id.invoice_DT_quantity) AS TotalQuantitySold
        FROM INVOICE_DETAIL id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        INNER JOIN INVOICE i ON id.invoice_id = i.invoice_id
        WHERE CONVERT(date,i.invoice_date) >= @StartDate AND CONVERT(date,i.invoice_date) <= @EndDate
        GROUP BY p.product_id, p.product_name
        ORDER BY TotalQuantitySold DESC;
    END
    ELSE IF @IntervalType = 'week'
    BEGIN
        SELECT TOP 10
            p.product_id,
            p.product_name,
            SUM(id.invoice_DT_quantity) AS TotalQuantitySold
        FROM INVOICE_DETAIL id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        INNER JOIN INVOICE i ON id.invoice_id = i.invoice_id
        WHERE DATEPART(WEEK, i.invoice_date) = DATEPART(WEEK, @StartDate)
            AND DATEPART(YEAR, i.invoice_date) = DATEPART(YEAR, @StartDate)
        GROUP BY p.product_id, p.product_name
        ORDER BY TotalQuantitySold DESC;
    END
    ELSE IF @IntervalType = 'month'
    BEGIN
        SELECT TOP 10
            p.product_id,
            p.product_name,
            SUM(id.invoice_DT_quantity) AS TotalQuantitySold
        FROM INVOICE_DETAIL id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        INNER JOIN INVOICE i ON id.invoice_id = i.invoice_id
        WHERE DATEPART(MONTH, CONVERT(date,i.invoice_date)) = DATEPART(MONTH, @StartDate)
            AND DATEPART(YEAR, CONVERT(date,i.invoice_date)) = DATEPART(YEAR, @StartDate)
        GROUP BY p.product_id, p.product_name
        ORDER BY TotalQuantitySold DESC;
    END
    ELSE IF @IntervalType = 'year'
    BEGIN
        SELECT TOP 10
            p.product_id,
            p.product_name,
            SUM(id.invoice_DT_quantity) AS TotalQuantitySold
        FROM INVOICE_DETAIL id
        INNER JOIN PRODUCT p ON id.product_id = p.product_id
        INNER JOIN INVOICE i ON id.invoice_id = i.invoice_id
        WHERE DATEPART(YEAR, CONVERT(date,i.invoice_date)) = DATEPART(YEAR, @StartDate)
        GROUP BY p.product_id, p.product_name
        ORDER BY TotalQuantitySold DESC;
    END
END;

-- Lấy danh sách 10 sản phẩm bán chạy nhất trong tuần
DECLARE @StartDate DATE = '2023-08-10'; -- Thay đổi ngày bắt đầu
DECLARE @EndDate DATE = '2024-08-13'; -- Thay đổi ngày kết thúc
DECLARE @IntervalType VARCHAR(10) = 'year'; -- Chọn "day", "month_year", "year"

EXEC CalculateRevenue @EndDate,@IntervalType
