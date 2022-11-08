const mongoose = require("mongoose");

const WheelchairSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Brand is required!!!"],
        enum: ['Invacare','Drive','Free Wheelchair Mission']
    },
    type: {
        type: String,
        required: [true, "Please specify the type of wheelchair."],
        enum: ['Transporter','Recliner','Pediatric','Standard','Sports','Active']
    },
    foldable: {
        type: String,
        required: [true, "Please specify if the wheelchair is foldable."],
        enum: ['Yes','No']
    },
    tyres: {
        type: String,
        required: [true, "Please specify the wheelchair tyre type."],
        enum: ['inflatable','massive']
    },
    color: {
        type: String,
        required: [true, "Color is required!!!"],
        minlength: [3, "Color must be 3 characters or longer"]
    },
    width: {
        type: Number ,
        required: [true,"Width is required!"]
    },
    depth: {
        type: Number,
        required: [true,"Depth is required!"]
    },
    image: {
        type: String,
        required: [false]
    }


}, { timestamps: true })

const Wheelchair = mongoose.model('Wheelchair',WheelchairSchema)
module.exports = Wheelchair;