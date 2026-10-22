
const Reference = require('../models/reference');

// GET ALL REFERENCES
module.exports.getReferences = async function(req, res) {
    try {
        const references = await Reference.find();

        const data = references.map(reference => {
            const obj = reference.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.status(200).json({
            success: true,
            message: "References list retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// GET REFERENCE BY ID
module.exports.getReferenceById = async function(req, res) {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        const data = reference.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(200).json({
            success: true,
            message: "Reference retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ADD NEW REFERENCE
module.exports.addReference = async function(req, res) {
    try {
        const reference = new Reference(req.body);
        const savedReference = await reference.save();

        const data = savedReference.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(201).json({
            success: true,
            message: "Reference added successfully.",
            data: data
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// UPDATE REFERENCE BY ID
module.exports.updateReference = async function(req, res) {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Reference updated successfully."
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// DELETE REFERENCE BY ID
module.exports.deleteReference = async function(req, res) {
    try {
        const reference = await Reference.findByIdAndDelete(
            req.params.id
        );

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Reference deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
