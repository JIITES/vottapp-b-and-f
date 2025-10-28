// const mongoose = require('mongoose');
// require('dotenv').config();


// Connect to MongoDB you have to create your own link
// const MongodbURL=process.env.mongodbURL;
  
//mandatory Set up to connection 
// mongoose.connect(MongodbURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology: true 

// })

// //get the default connection
// //Mongoose maintains a default connection object representing the MongoDB connection 
// const db= mongoose.connection;

// //Define event Listners for database connection  
//     db.on('connected',()=>{
//         console.log('Mongoose connected to Mongodb server');
//     })

//     db.on('error',()=>{
//         console.error('Mongoose connection error:');
//     });

//     db.on('disconnected',()=>{
//         console.log('Mongoose disconnected from MongoDB server');
//     });

// // Export the db connection for use in other files
// module.exports = db;



const mongoose = require('mongoose');
require('dotenv').config();

const uri =process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI not found in environment variables");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch(err => console.error(" MongoDB connection error:", err.message));


const db= mongoose.Connection;
    module.exports = db;
