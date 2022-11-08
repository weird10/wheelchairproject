const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('mongoose');
const SECRET = process.env.SECRET_KEY

const registerUser = async (req, res) => {
    
    try {
        const checkEmail = await User.findOne({email: req.body.email })
        if (checkEmail) {
            res.status(400).json({ errors: { email: { message: 'Email in use' } } })
        } else {
            if (req.body.admin === "12345") {
                    req.body.admin = true
            } else {
                req.body.admin = false
            }
                
                console.log(req.body.admin)
                const newUser = await User.create(req.body)
                const usertoken = jwt.sign({
                    id: newUser._id,
                    email: newUser.email
                }, SECRET)
                console.log(newUser)
                console.log("This is what you requested", req.body)
                res.status(201).cookie('usertoken', usertoken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 90000)
                }).json({
                    successMessage: 'User Logged in'
                })
            } 
        }catch(err) {
            console.log("the error is here")
            res.status(400).json(err)
    }

}

const loginUser = async (req, res) => {
            const user = await User.findOne({email: req.body.email});
            console.log("Logging in" + user)
            try {
                if (!user) {
                    res.status(400).json({ errors: 'Email not found' })
                } else {
                    const validPassword = await bcrypt.compare(req.body.password, user.password)
                    if (!validPassword) {
                        res.status(400).json({ errors: 'Invalid email/password' })
                    } else {
                        const payload = { _id: user._id, email: user.email, firstName: user.firstName, lastName:user.lastName, admin:user.admin }
                        const token = jwt.sign(payload, SECRET)
                        res.cookie('usertoken', token, { expires: new Date(Date.now() + 900000) })
                        .json({ successMessage: 'usertoken: ', user: payload })
                    }
                }
            } catch (err) {
                res.status(400).json({ errors: 'oops something when wrong in login' })
            }
        }
    

        const getLogged = async (req, res) => {
            try {
                const user = jwt.verify(req.cookies.userToken, SECRET);
                const currentUser = await Model.findOne({ _id: user._id });
                res.json(currentUser);
            } catch (error) {
                res.status(400).json({ errors: 'failed to get logged in user' })
            }
        };



            const getAllUsers = (req, res) => {
                User.find()
                    .then(user =>
                        res.json(user))
                    .catch(err => console.log(err))
            }

            const getOneUser = (req, res) => {
                User.findOne({
                        _id: req.params.id
                    })
                    .then(thisUsr => res.json(thisUsr))
                    .catch(err => res.json(err))
            }

            const updateUser = (req, res) => {
                User.updateOne({_id: req.params.id}, req.body, {new: true, runValidators:true})
                    .then(updatedUser => res.json(updatedUser))
                    .catch((err) => {res.status(400).json(err)})
            }

            const deleteUser = (req, res) => {
                User.deleteOne({
                        _id: req.params.id
                    })
                    .then(deletedUser => res.json(deletedUser))
                    .catch(err => res.json(err))
            }
            
            const logout = (req, res) => {
                res.clearCookie('usertoken');
                res.sendStatus(200); 
            }



        
            module.exports = {
                loginUser,
                getLogged,
                logout,
                registerUser,
                getAllUsers,
                getOneUser,
                updateUser,
                deleteUser
            }