const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Patient's first name is required!"],
        minlength: [3, "First name needs to be at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Patient's last name is required!"],
        minlength: [3, "Last name needs to be at least 3 characters!"]
    },
    age: {
        type: Number,
        required: [true, "Please specify patient's age."]
    },
    condition: {
        type: String,
        required: [true, "Please specify the patient's condition."],
        enum: ['Cerebal Palsy','Stroke','Loss of Limb']
    },
    width: {
        type: Number ,
        required: [true,"Patient's width measurement is required!"]
    },
    depth: {
        type: Number,
        required: [true,"Patient's depth measurement is required!"]
    },
    submitter: {
        type: String
    },
    assignedWheelchair: {
        type: String
    },
}, { timestamps: true })

const Patient = mongoose.model('Patient',PatientSchema)
module.exports = Patient;