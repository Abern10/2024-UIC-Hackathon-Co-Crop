const sqlite3 = require('sqlite3');
let sql;

const db = new sqlite3.Database("cocrop.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});


sql = `CREATE TABLE Users (
    Name TEXT NOT NULL,
    User_ID TEXT NOT NULL PRIMARY KEY,
    Zip_Code INT NOT NULL
)`;

db.run(sql, [], (err) => {
  if (err) return console.error(err.message);
});

sql = `CREATE TABLE Products (
    Product_ID INT NOT NULL PRIMARY KEY,
    Product_Name TEXT NOT NULL,
    Price FLOAT NOT NULL,
    Quantity INT NOT NULL,
    User_ID TEXT NOT NULL,
    Zip_Code INT NOT NULL,
    File_Path_4_Images TEXT NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES Users (User_ID)
)`;

db.run(sql, [], (err) => {
  if (err) return console.error(err.message);
});

sql = `INSERT INTO Users (Name, User_ID, Zip_Code) 
        VALUES ("John Deer", "DeerLover", 61016),
        ("Alice Smith", "AliceS", 12345),
        ("Bob Johnson", "BobJ", 98765),
        ("Eva Martinez", "EvaM", 54321),
        ("David Williams", "DaveW", 45678),
        ("Sophia Lee", "SophiaL", 78901),
        ("Michael Davis", "MikeD", 23456),
        ("Emily Brown", "EmilyB", 78909),
        ("Daniel Miller", "DanM", 13579)`;

db.run(sql, [], (err) => {
  if (err) return console.error(err.message);
});

sql = 'SELECT * FROM users';
db.all(sql, [], (err, rows) =>{
  if (err) return console.error(err.message);
  rows.forEach((row) =>{
    console.log(row);
  });
});

sql = `INSERT INTO Users (Name, User_ID, Zip_Code) 
        VALUES ("John Deer", "DeerLover", 61016),
        ("Alice Smith", "AliceS", 12345),
        ("Bob Johnson", "BobJ", 98765),
        ("Eva Martinez", "EvaM", 54321),
        ("David Williams", "DaveW", 45678),
        ("Sophia Lee", "SophiaL", 78901),
        ("Michael Davis", "MikeD", 23456),
        ("Emily Brown", "EmilyB", 78909),
        ("Daniel Miller", "DanM", 13579)`;

db.run(sql, [], (err) => {
  if (err) return console.error(err.message);
});

sql = 'SELECT * FROM Users';
db.all(sql, [], (err, rows) =>{
  if (err) return console.error(err.message);
  rows.forEach((row) =>{
    console.log(row);
  });
});

sql = `INSERT INTO Products (Product_ID, Product_Name, Price, Quantity, User_ID, Zip_Code)
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
        (3008, 'Cucumber', 0.47, 3, 'SophiaL', 78901)`;



db.run(sql, (err) => {
  if (err) console.error(err.message);
});

sql = 'SELECT * FROM Products';
db.all(sql, [], (err, rows) =>{
  if (err) return console.error(err.message);
  rows.forEach((row) =>{
    console.log(row);
  });
});