const { authenticate } = require('../config/jwt.config');
const WheelchairController = require('../controllers/wheelchair.controllers')

module.exports = (app) => {
    app.get("/api/allWheelchairs", authenticate, WheelchairController.getAllWheelchairs);
    app.get("/api/wheelchair/:id", authenticate, WheelchairController.getOneWheelchair);
    app.get("/api/edit/:id", authenticate, WheelchairController.getOneWheelchair);
    app.post("/api/createWheelchair", authenticate, WheelchairController.createWheelchair);
    app.put("/api/update/:id", authenticate, WheelchairController.updateWheelchair);
    app.delete("/api/delete/:id", authenticate, WheelchairController.deleteWheelchair);
}