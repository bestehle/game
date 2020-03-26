const pgp = require('pg-promise')(/* initialization options */);

module.exports = (param) => {
	const cn = {
		host: 'localhost', // server name or IP address;
		port: 5432,
		database: 'welcometo',
		user: '',
		password: ''
	};

	// alternative:
	// var cn = 'postgres://username:password@host:port/database';

	const db = pgp(cn); // database instance;

	return db;
};
