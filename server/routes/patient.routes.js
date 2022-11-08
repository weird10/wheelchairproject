const { authenticate } = require('../config/jwt.config');
const PatientController = require('../controllers/patient.controllers')

module.exports = (app) => {
    app.get("/api/allPatients", authenticate, PatientController.getAllPatients);
    app.get("/api/patient/:id", authenticate, PatientController.getOnePatient);
    app.get("/api/editPatient/:id", authenticate, PatientController.getOnePatient);
    app.post("/api/createPatient", authenticate, PatientController.createPatient);
    app.put("/api/updatePatient/:id", authenticate, PatientController.updatePatient);
    app.delete("/api/deletePatient/:id", authenticate, PatientController.deletePatient);
}