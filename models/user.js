const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/users-db';

// Connect to the MongoDB database
mongoose.connect(dbURI);

// Get the default connection
const dbConnection = mongoose.connection;

// Event listeners for connection events
dbConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

dbConnection.once('open', () => {
    console.log('Connected to Database!');
});

// Define the users schema
const Schema = mongoose.Schema;

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    });
});


const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User model
const User = mongoose.model('users', usersSchema);

// Export the User model
module.exports = User;
