const Patient = require("../models/patient.model")


const createPatient = (req,res)=> {
    Patient.create(req.body)
    .then(result=> res.json(result))
    .catch((err) => {res.status(400).json(err)})
   }

   const getAllPatients =(req,res) => {
       Patient.find()
       .then(patient=> 
           res.json(patient))
       .catch(err=> console.log(err))
   }

   const getOnePatient = (req, res) => {
       Patient.findOne({_id:req.params.id})
       .then(thisProd => res.json(thisProd))
       .catch(err => res.json(err))
   }

   const updatePatient = (req, res) => {
       Patient.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})
       .then(result=> res.json(result))
       .catch((err) => {res.status(400).json(err)})
   }

   const deletePatient = (req, res) => {
       Patient.deleteOne({_id:req.params.id})
       .then(deletedPatient => res.json(deletedPatient))
       .catch(err => res.json(err))
   }



module.exports = {
   createPatient,
   getAllPatients,
   getOnePatient,
   updatePatient,
   deletePatient
}