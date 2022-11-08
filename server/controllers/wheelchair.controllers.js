const Wheelchair = require("../models/wheelchair.model")


const createWheelchair = (req,res)=> {
    Wheelchair.create(req.body)
    .then(result=> res.json(result))
    .catch((err) => {res.status(400).json(err)})
   }

   const getAllWheelchairs =(req,res) => {
       Wheelchair.find()
       .then(wheelchair=> 
           res.json(wheelchair))
       .catch(err=> console.log(err))
   }

   const getOneWheelchair = (req, res) => {
       Wheelchair.findOne({_id:req.params.id})
       .then(thisProd => res.json(thisProd))
       .catch(err => res.json(err))
   }

   const updateWheelchair = (req, res) => {
       Wheelchair.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})
       .then(result=> res.json(result))
       .catch((err) => {res.status(400).json(err)})
   }

   const deleteWheelchair = (req, res) => {
       Wheelchair.deleteOne({_id:req.params.id})
       .then(deletedWheelchair => res.json(deletedWheelchair))
       .catch(err => res.json(err))
   }



module.exports = {
   createWheelchair,
   getAllWheelchairs,
   getOneWheelchair,
   updateWheelchair,
   deleteWheelchair
}