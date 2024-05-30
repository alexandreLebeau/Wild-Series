require("dotenv").config();

const mysql = require("mysql2/promise");

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategorySeeder {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }
  // Define the run method to seed the categories

  async run() {
    const categories = [{ name: "Science-Fiction" }, { name: "Comédie" }];
    const insertPromises = categories.map((category) =>
      this.databaseClient.query("INSERT INTO category (name) VALUES (?)", [
        category.name,
      ])
    );
    await Promise.all(insertPromises);
    return categories;
  }
  // Define a method to close the connection pool

  async close() {
    await this.databaseClient.end();
  }
}

const createData = async () => {
  try {
    const categorySeeder = new CategorySeeder();
    const categories = await categorySeeder.run();
    await categorySeeder.close();
    console.info(categories);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the createData function
createData();
