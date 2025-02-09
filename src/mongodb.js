const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/ThesisV1")
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
    }
})

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
    }
  });
  
  // Define the patient_users collection
  const patientUsersCollection = new mongoose.model("patient_users", patientUsersSchema);
  
module.exports = {therapistUsersCollection, patientUsersCollection};