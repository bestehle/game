const pgp = require('pg-promise')(/* initialization options */);

// console.log(process.env.DB_USER, process.env.DB_PASSWORD);

module.exports = (param) => {
	const cn = {
		host: 'localhost', // server name or IP address;
		port: 5432,
		database: 'welcometo',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	};

	// alternative:
	// var cn = 'postgres://username:password@host:port/database';

	const db = pgp(cn); // database instance;

	return db;
};
