const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


// REGISTER

const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    userModel.findUserByEmail(email)
        .then(existingUser => {

            if (existingUser) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {

            if (!hashedPassword) {
                return;
            }

            return userModel.createUser(
                name,
                email,
                hashedPassword
            );
        })
        .then(result => {

            if (!result) {
                return;
            }

            res.status(201).json({
                message: "Registration successful",
                userId: result.insertId
            });
        })
        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: "Registration failed"
            });
        });
};


// LOGIN

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    userModel.findUserByEmail(email)
        .then(user => {

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            return bcrypt.compare(password, user.password)
                .then(isPasswordValid => {

                    if (!isPasswordValid) {
                        return res.status(401).json({
                            message: "Invalid email or password"
                        });
                    }

                    const token = jwt.sign(
                        {
                            id: user.id,
                            role: user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                    res.status(200).json({
                        message: "Login successful",
                        token: token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    });
                });
        })
        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: "Login failed"
            });
        });
};


module.exports = {
    registerUser,
    loginUser
};