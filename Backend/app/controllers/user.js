
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Remove password and convert _id to id
function formatUser(user) {
    const data = user.toObject();

    data.id = data._id.toString();
    delete data._id;
    delete data.__v;
    delete data.password;

    return data;
}

// GET ALL USERS
module.exports.getUsers = async function(req, res) {
    try {
        const users = await User.find();

        const data = users.map(user => formatUser(user));

        res.status(200).json({
            success: true,
            message: "Users list retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// GET USER BY ID
module.exports.getUserById = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully.",
            data: formatUser(user)
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ADD NEW USER
module.exports.addUser = async function(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All user fields are required."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            created: new Date(),
            updated: new Date()
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: formatUser(savedUser)
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// UPDATE USER BY ID
module.exports.updateUser = async function(req, res) {
    try {
        const updates = {};

        const allowedFields = [
            'firstname',
            'lastname',
            'email'
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (req.body.password !== undefined) {
            if (typeof req.body.password !== 'string' ||
                req.body.password.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid password."
                });
            }

            updates.password = await bcrypt.hash(
                req.body.password, 10
            );
        }

        updates.updated = new Date();

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully."
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// DELETE USER BY ID
module.exports.deleteUser = async function(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
