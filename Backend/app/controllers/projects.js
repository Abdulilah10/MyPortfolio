
const Project = require('../models/project');

// GET ALL PROJECTS
module.exports.getProjects = async function(req, res) {
    try {
        const projects = await Project.find();

        const data = projects.map(project => {
            const obj = project.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.status(200).json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// GET PROJECT BY ID
module.exports.getProjectById = async function(req, res) {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        const data = project.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(200).json({
            success: true,
            message: "Project retrieved successfully.",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ADD NEW PROJECT
module.exports.addProject = async function(req, res) {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();

        const data = savedProject.toObject();
        data.id = data._id.toString();
        delete data._id;
        delete data.__v;

        res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: data
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// UPDATE PROJECT BY ID
module.exports.updateProject = async function(req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully."
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


// DELETE PROJECT BY ID
module.exports.deleteProject = async function(req, res) {
    try {
        const project = await Project.findByIdAndDelete(
            req.params.id
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
