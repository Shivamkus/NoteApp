const mongoose = require('mongoose');
const conn = async(req, res) =>{
    try {
        await mongoose
    .connect("mongodb+srv://kushwahshivam065:u4f3ccNUtj37d7cU@cluster0.vzwo2bz.mongodb.net")
    // .connect("mongodb://localhost:27017/NoteApp")

    .then(() =>{
        console.log('connect to database');
    });
    } catch (error) {
        res.status(400).json({
            massage:"Not connected db"
        });
    }
};
conn();