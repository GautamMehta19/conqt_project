// queries/getData.js
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
    user: 'candidate',
    password: 'NoTeDeSt^C10.6?SxwY882}',
    database: 'conqtvms_dev',
    port: 3306
});

// Query function
const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Query function using async/await to get rows where role = 'admin'
const getData = async (queryForDb) => {
    try {
        // Construct the SQL query dynamically based on queryForDb object
        let sqlQuery = 'SELECT * FROM PrLineItems'; // Base query
        const values = [];

        // Add conditions based on queryForDb object
        if (queryForDb) {
            const conditions = [];
            for (const [key, value] of Object.entries(queryForDb)) {
                conditions.push(`${key} = ?`);
                values.push(value);
            }
            if (conditions.length > 0) {
                sqlQuery += ' WHERE ' + conditions.join(' AND ');
            }
        }

        const results = await queryDatabase(sqlQuery, values);
        return results;
    } catch (err) {
        throw new Error('Error executing query: ' + err.message);
    }
};

module.exports = {
    getData
};