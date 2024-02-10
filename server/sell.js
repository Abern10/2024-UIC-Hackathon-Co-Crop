const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Set the path to the database file inside the server folder
const dbPath = path.join(__dirname, 'cocrop.db');

if (fs.existsSync(dbPath)){
    fs.unlinkSync(dbPath);
    console.log('db deleted');
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('added to the database.');

    createTablesAndPopulateData();
    submitForm();
});

function submitForm() {
    // Get values from text fields
    let accountName = document.getElementById('account-name').value;
    let price = document.getElementById('price').value;
    let weight = document.getElementById('weight').value;
    let zipCode = document.getElementById('zip-code').value;

    // Call addProduct function with extracted values
    addProduct(accountName, price);
    // You can use the other extracted values (weight, zipCode) as needed.
}

function createTablesAndPopulateData() {
    // Define SQL statements to create tables
    const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS Users (
            Name TEXT NOT NULL,
            User_ID TEXT NOT NULL PRIMARY KEY,
            Zip_Code INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Products (
            Product_ID INT NOT NULL PRIMARY KEY,
            Product_Name TEXT NOT NULL,
            Price FLOAT NOT NULL,
            Quantity INT NOT NULL,
            User_ID TEXT NOT NULL,
            Zip_Code INT NOT NULL,
            FOREIGN KEY (User_ID) REFERENCES Users (User_ID)
        );
    `;

    // Define SQL statement to insert data into Users table
    const insertUsersSQL = `
        INSERT INTO Users (Name, User_ID, Zip_Code)
        VALUES 
            ('John Deer', 'DeerLover', 61016),
            ('Alice Smith', 'AliceS', 12345),
            ('Bob Johnson', 'BobJ', 98765),
            ('Eva Martinez', 'EvaM', 54321),
            ('David Williams', 'DaveW', 45678),
            ('Sophia Lee', 'SophiaL', 78901),
            ('Michael Davis', 'MikeD', 23456),
            ('Emily Brown', 'EmilyB', 78909),
            ('Daniel Miller', 'DanM', 13579),
            ('Emma White', 'EmmaW', 34567),
            ('Matthew Jones', 'MattJ', 87654),
            ('Olivia Martinez', 'OliviaM', 98765),
            ('William Davis', 'WillD', 23456),
            ('Ava Johnson', 'AvaJ', 65432);
    `;

    // Define SQL statement to insert data into Products table
    const insertProductsSQL = `
        INSERT INTO Products (Product_ID, Product_Name, Price, Quantity, User_ID, Zip_Code)
        VALUES 
            (1001, 'Apple', 1.00, 3, 'AliceS', 12345),
            (1002, 'Apple', 1.20, 5, 'BobJ', 98765),
            (1003, 'Apple', 1.25, 2, 'EvaM', 54321),
            (2001, 'Tomato', 0.35, 4, 'DaveW', 45678),
            (2002, 'Tomato', 0.40, 5, 'SophiaL', 78901),
            (2003, 'Tomato', 0.45, 2, 'MikeD', 23456),
            (2004, 'Tomato', 0.38, 3, 'EmilyB', 78909),
            (2005, 'Tomato', 0.42, 5, 'DanM', 13579),
            (3004, 'Cucumber', 0.48, 3, 'AliceS', 12345),
            (3005, 'Cucumber', 0.52, 4, 'BobJ', 98765),
            (3006, 'Cucumber', 0.49, 2, 'EvaM', 54321),
            (3007, 'Cucumber', 0.53, 5, 'DaveW', 45678),
            (3008, 'Cucumber', 0.47, 3, 'SophiaL', 78901),
            (1004, 'Banana', 0.80, 4, 'AliceS', 12345),
            (1005, 'Orange', 1.10, 3, 'BobJ', 98765),
            (1006, 'Grape', 2.50, 2, 'EvaM', 54321),
            (1007, 'Strawberry', 3.20, 5, 'DaveW', 45678),
            (1008, 'Blueberry', 4.00, 3, 'SophiaL', 78901),
            (1009, 'Raspberry', 3.80, 4, 'MikeD', 23456),
            (1010, 'Pineapple', 2.90, 2, 'EmilyB', 78909),
            (1011, 'Mango', 1.60, 5, 'DanM', 13579),
            (1012, 'Watermelon', 5.00, 3, 'AliceS', 12345),
            (1013, 'Kiwi', 1.75, 4, 'BobJ', 98765),
            (1014, 'Peach', 2.20, 2, 'EvaM', 54321),
            (1015, 'Pear', 1.90, 5, 'DaveW', 45678),
            (1016, 'Cherry', 4.50, 3, 'SophiaL', 78901),
            (1017, 'Lemon', 0.90, 4, 'MikeD', 23456),
            (2006, 'Tomato', 0.35, 4, 'EmilyB', 78909),
            (2007, 'Potato', 0.25, 5, 'DanM', 13579),
            (2008, 'Carrot', 0.30, 2, 'AliceS', 12345),
            (2009, 'Onion', 0.45, 5, 'BobJ', 98765),
            (2010, 'Garlic', 0.60, 3, 'EvaM', 54321),
            (2011, 'Lettuce', 1.20, 4, 'DaveW', 45678),
            (2012, 'Spinach', 1.30, 2, 'SophiaL', 78901),
            (2013, 'Broccoli', 1.80, 5, 'MikeD', 23456),
            (2014, 'Cabbage', 1.50, 3, 'EmilyB', 78909),
            (2015, 'Bell pepper', 0.75, 4, 'DanM', 13579),
            (2016, 'Corn', 0.65, 2, 'AliceS', 12345),
            (2017, 'Celery', 1.10, 5, 'BobJ', 98765),
            (2018, 'Zucchini', 0.95, 3, 'EvaM', 54321),
            (2019, 'Eggplant', 1.40, 4, 'DaveW', 45678),
            (2020, 'Cucumber', 0.95, 2, 'SophiaL', 78901),
            (3009, 'Watermelon', 4.50, 1, 'AliceS', 12345),
            (3010, 'Kiwi', 1.80, 3, 'BobJ', 98765),
            (3011, 'Pineapple', 3.25, 2, 'EvaM', 54321),
            (3012, 'Mango', 2.60, 4, 'DaveW', 45678),
            (3013, 'Lemon', 1.10, 5, 'SophiaL', 78901);
    `;

    // Execute SQL statements to create tables and insert data
    db.exec(createTablesSQL, (err) => {
        if (err) {
            console.error('Error creating tables:', err.message);
            return;
        }
        console.log('Tables created successfully.');

        db.exec(insertUsersSQL, (err) => {
            if (err) {
                console.error('Error inserting users data:', err.message);
                return;
            }
            console.log('Users data inserted successfully.');

            db.exec(insertProductsSQL, (err) => {
                if (err) {
                    console.error('Error inserting products data:', err.message);
                    return;
                }
                console.log('Products data inserted successfully.');
            });
        });
    });
}

function addProduct(name, price) {
    // Generate a random product ID
    let product_ID = getRandom5DigitNumber();

    // Assuming you have a User_ID and Zip_Code
    let user_ID = "DeerLover"; // Replace with the actual User_ID
    let zip_Code = "60602"; // Replace with the actual Zip_Code

    const add = `
        INSERT INTO Products (Product_ID, Product_Name, Price, Quantity, User_ID, Zip_Code)
        VALUES 
            (${product_ID}, '${name}', ${price}, 1, '${user_ID}', '${zip_Code}')
    `;


    db.exec(add, (err) => {
        if (err) {
            console.error('Error creating tables:', err.message);
            return;
        }
        console.log('Tables created successfully.');
    });
    // Execute the SQL query here (e.g., using a database connection or an API)
}


function getRandom5DigitNumber() {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
        return;
    }
    console.log('Database connection closed.');
});