const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('cocrop.db');

// Endpoint to handle search queries
app.get('/search', (req, res) => {
  const searchTerm = req.query.term; // Assuming the search query is sent as a query parameter named "term"
  
  // Execute the SQL query
  const query = `
    SELECT Users.Name, Products.Product_Name, Products.Price, Products.Quantity, Products.Zip_Code
    FROM Products 
    JOIN Users ON Products.User_ID = Users.User_ID
    WHERE Products.Product_Name LIKE ?
    ORDER BY Products.Price ASC
  `;
  
  db.all(query, [`%${searchTerm}%`], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Send the response back to the client
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});