const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


            const UserSchema = new mongoose.Schema({
                firstName: {
                    type: String,
                    required: [true, "First name is required!!!"],
                    minlength: [3, "First Name needs to be at least 3 characters!"]
                },
                lastName: {
                    type: String,
                    required: [true, "Last name is required!!!"],
                    minlength: [3, "Last Name needs to be at least 3 characters!"]
                },
                email: {
                    type: String,
                    required: [true, "Email is required!!!"],
                    validate: {
                        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                        message: "Please enter a valid email"
                      }
                },
                password: {
                    type: String,
                    required: [true, "Password is required!!!"],
                    minlength: [8, "Password must be 8 characters or longer"]
                },
                admin: {
                  type: Boolean,
                  default: false
              },
            }, { timestamps: true })
            
            

            UserSchema.virtual('confirmPassword')
            .get( () => this._confirmPassword )
            .set( value => this._confirmPassword = value );

            UserSchema.pre('validate', function(next) {
                  if (this.password !== this.confirmPassword) {
                this.invalidate('confirmPassword', 'Passwords do not match!');
            }
              next();
            });

            UserSchema.pre('save', async function(next) {
              try {
                const hashedPassword = await bcrypt.hash(this.password,10)
                console.log('Hashed Password:', hashedPassword)
                this.password = hashedPassword
                next()
              }catch{
                console.log('Error in Save', error)
              }
            })

          
        const User = mongoose.model('User',UserSchema)
        module.exports = User;