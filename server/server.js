const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;
const namesArray = [];
const productName = [];
const price = [];
const quanitity = [];
const zip_code = [];


// Set the path to the SQLite database file
const dbPath = path.join(__dirname, 'cocrop.db');

// Connect to the SQLite database using the correct file path
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.set("views", "./views");


// Endpoint to handle search queries
app.post('/search', (req, res) => {
    const searchTerm = req.body.term; // Use req.body to get the search term
    console.log("Search term from server:", searchTerm);
    
    const query = `
        SELECT Users.Name, Products.Product_Name, Products.Price, Products.Quantity, Products.Zip_Code
        FROM Products 
        JOIN Users ON Products.User_ID = Users.User_ID
        WHERE Products.Product_Name LIKE ?
        ORDER BY Products.Price ASC
    `;

    db.all(query, [searchTerm], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
            console.log(row.Name)
            namesArray.push(row.Name);
            productName.push(row.Product_Name);
            price.push(row.Price);
//            quantity.push(row.Quanitity);
            zip_code.push(row.Zip_Code);
            // searchResults.push({
            //     name: row.Name,
            //     product_name: row.Product_Name,
            //     price: row.Price,
            //     quanitity: row.Quantity,
            //     zip_code: row.Zip_Code
            // });
        });
    });

    res.redirect('/buy');
});

app.get('/buy', (req, res) => {
    
    res.render("buy", {namesArray, productName, price, zip_code})

});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});