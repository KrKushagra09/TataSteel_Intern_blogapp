

const mongoose = require('mongoose')
const password = process.env.Apgc3jjRuIwYwWdv
const DB_URI='mongodb+srv://kumarkushagra09:Apgc3jjRuIwYwWdv@cluster0.ffhcsra.mongodb.net/?retryWrites=true&w=majority';
const connectDB = async () => {
    try {
        await mongoose.createConnection(DB_URI);
        mongoose.set('strictQuery', false)
        mongoose.createConnection('mongodb://localhost:27017/blogApp') 
        console.log('Mongo connected')
    } catch(error) {
        console.log('error while connecting'+ error.message)
        process.exit()
    }
};

module.exports = connectDB;