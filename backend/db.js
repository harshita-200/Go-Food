const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://GoFood:Harshita29*@cluster0.ed3w166.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Mongoose connected');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1); // Exit the process with failure
    }
};

// Function to fetch data
const fetchData = async () => {
    try {
        const collection = mongoose.connection.db.collection('collection1');
        const data = await collection.find({}).toArray();
        global.collection1 = data;
        
        const foodCategory = mongoose.connection.db.collection('foodCategory');
        const catData = await foodCategory.find({}).toArray();
        global.foodCateg = catData;

        console.log('Data fetched successfully');
    } catch (err) {
        console.error('Error fetching data', err);
    }
};

// Initialize the database and fetch data
const initialize = async () => {
    await connectDB();
    await fetchData();
};

initialize();

// Do not close the connection here; keep it open for other operations
module.exports = connectDB;
