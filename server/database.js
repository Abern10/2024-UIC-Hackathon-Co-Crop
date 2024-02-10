const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set the path to the database file inside the server folder
const dbPath = path.join(__dirname, 'cocrop.db');

// Create a new SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');

    // Create tables and populate with data
    createTablesAndPopulateData();
});

// Function to create tables and populate with data
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
            ('Daniel Miller', 'DanM', 13579);
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
            (3008, 'Cucumber', 0.47, 3, 'SophiaL', 78901);
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

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
        return;
    }
    console.log('Database connection closed.');
});