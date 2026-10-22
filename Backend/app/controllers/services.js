
const Service = require('../models/service');

// GET ALL SERVICES
module.exports.getServices = async function(req, res) {
    try {
        const services = await Service.find();

        const data = services.map(service => {
            const obj = service.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.status(200).json({
            success: true,
            message: "Services list retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// GET SERVICE BY ID
module.exports.getServiceById = async function(req, res) {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        const data = service.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ADD NEW SERVICE
module.exports.addService = async function(req, res) {
    try {
        const service = new Service(req.body);
        const savedService = await service.save();

        const data = savedService.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: data
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// UPDATE SERVICE BY ID
module.exports.updateService = async function(req, res) {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service updated successfully."
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// DELETE SERVICE BY ID
module.exports.deleteService = async function(req, res) {
    try {
        const service = await Service.findByIdAndDelete(
            req.params.id
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
