const { NNID } = require('./account-id.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');

let connection;

async function connect() {
	await mongoose.connect(connection_string, options);

	connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'data connection error:'));

	module.exports.connection = connection;
}

function verifyConnected() {
	if (!connection) {
		throw new Error('cant made new database for this.');
	}
}

async function getUserByUsername(username) {
	verifyConnected();

	if (typeof username !== 'string') {
		return null;
	}

	const user = await NNID.findOne({
		usernameLower: username.toLowerCase()
	});

	return user;
}

async function getUserByNNID(nnid) {
	verifyConnected();

	const user = await NNID.findOne({
		nnid
	});

	return user;
}

module.exports = {
	connect,
	connection,
	getUserByUsername,
};