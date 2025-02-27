const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect('mongodb+srv://speechupapp:iGCGBicyOitvr7BH@cluster0.t69fb.mongodb.net/SPEECHUP')
.then(() => {
    console.log("MONGODB CONNECTED")
})
.catch(() => {
    console.log("MONGODB FAILED TO CONNECT")
})

//create a schema for the documents
const therapistUsersSchema = new mongoose.Schema({

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    profileImage: {
      type: String, // Store the image path (URL or file path)
      default: "/uploads/default-profile.png" // Default profile image
    },
    bio: {
      type: String,
      default: "", // Initialize empty by default
    },
});

//define the collection and specify the schema for the collection
const therapistUsersCollection = new mongoose.model("therapist_users", therapistUsersSchema) //name of the collection, schema of the collection

const patientUsersSchema = new mongoose.Schema({
  
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, // Store the image path (URL or file path)
      default: "/uploads/default-profile.png" // Default profile image
    },
    bio: {
      type: String,
      default: "", // Initialize empty by default
    },
    grades: {
    animalSounds: { type: Number, default: null },
    bookReading: { type: Number, default: null },
    wordSearch: { type: Number, default: null },
    wordFlipbook: { type: Number, default: null },
    matchingGames: { type: Number, default: null },
    tongueTwisters: { type: Number, default: null }
    }
  });
  
  // Define the patient_users collection
  const patientUsersCollection = new mongoose.model("patient_users", patientUsersSchema);

  const appointmentSchema = new mongoose.Schema({
    therapistEmail: { 
      type: String, 
      required: true 
    },
    patientEmail: { 
      type: String, 
      required: true 
    },
    date: { 
      type: String, 
      required: true 
    },
    time: {
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'Approved', 'Rejected'], 
      default: 'Pending' 
    }
});

const appointmentCollection = new mongoose.model('appointments', appointmentSchema);
  
module.exports = {therapistUsersCollection, patientUsersCollection, appointmentCollection};