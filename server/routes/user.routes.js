const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const User = require('../models/user.model');

module.exports = (app) => {
    app.post("/api/registerUser", UserController.registerUser);
    app.post("/api/login", UserController.loginUser);
    app.get("/api/users", authenticate, UserController.getAllUsers);
    app.get('/api/userCurrent/:id', UserController.getLogged)
    app.get("/api/logout", UserController.logout);
    app.get("/api/user/:id", UserController.getOneUser)
    app.put("/api/updateUser/:id", UserController.updateUser);

}
