const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_management',
});

// Export functions for executing queries
module.exports = {
  query: async function (sql, params) {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query(sql, params);
      return results;
    } finally {
      connection.release();
    }
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


